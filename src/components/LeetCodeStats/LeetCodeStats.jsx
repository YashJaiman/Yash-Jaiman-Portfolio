import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  FaAward,
  FaCalendarAlt,
  FaCheck,
  FaCode,
  FaExclamationTriangle,
  FaFire,
  FaRedoAlt,
  FaTrophy,
} from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const USERNAME = 'YashJaiman';
const CACHE_KEY = `leetcode_stats_${USERNAME}_v4`;
const CACHE_TTL = 30 * 60 * 1000;
const PRIMARY_STATS_URL = `https://leetcode-stats-api.herokuapp.com/${USERNAME}`;
const BACKUP_PROFILE_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}`;
const BACKUP_SOLVED_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/solved`;
const CONTEST_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/contest`;
const BADGES_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/badges`;
const CALENDAR_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`;

const emptyStats = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  totalQuestions: 0,
  totalEasy: 0,
  totalMedium: 0,
  totalHard: 0,
  ranking: null,
  contestRating: 0,
  contestGlobalRank: 0,
  contestTopPercentage: 0,
  contestAttend: 0,
  badges: [],
  submissionCalendar: {},
  currentStreak: 0,
  maxStreak: 0,
  activeDays: 0,
};

const cardMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const safeNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const formatNumber = (value) => safeNumber(value).toLocaleString('en-US');

const getDayKey = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
};

const parseCalendar = (calendar) => {
  try {
    const source = typeof calendar === 'string' ? JSON.parse(calendar) : calendar || {};
    if (!source || typeof source !== 'object' || Array.isArray(source)) return {};

    return Object.entries(source).reduce((acc, [timestamp, count]) => {
      const numericTimestamp = Number(timestamp);
      const numericCount = safeNumber(count);
      if (Number.isFinite(numericTimestamp) && numericTimestamp > 0 && numericCount >= 0) {
        acc[String(Math.floor(numericTimestamp))] = numericCount;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
};

const calculateStreaks = (calendar) => {
  try {
    const parsedCalendar = parseCalendar(calendar);
    const activeDays = new Set();

    Object.entries(parsedCalendar || {}).forEach(([timestamp, count]) => {
      const dayCount = safeNumber(count);
      const date = new Date(safeNumber(timestamp) * 1000);
      const dayKey = getDayKey(date);
      if (dayCount > 0 && dayKey) activeDays.add(dayKey);
    });

    const sortedDays = Array.from(activeDays).sort();
    if (sortedDays.length === 0) {
      return { currentStreak: 0, maxStreak: 0, activeDays: 0 };
    }

    let maxStreak = 1;
    let rollingStreak = 1;

    for (let index = 1; index < sortedDays.length; index += 1) {
      const previous = new Date(`${sortedDays[index - 1]}T00:00:00`);
      const current = new Date(`${sortedDays[index]}T00:00:00`);
      const diffDays = Math.round((current - previous) / 86400000);
      rollingStreak = diffDays === 1 ? rollingStreak + 1 : 1;
      maxStreak = Math.max(maxStreak, rollingStreak);
    }

    let currentStreak = 0;
    const today = new Date();
    const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (!activeDays.has(getDayKey(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
    }

    while (activeDays.has(getDayKey(cursor))) {
      currentStreak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return {
      currentStreak,
      maxStreak: Math.max(maxStreak, currentStreak),
      activeDays: sortedDays.length,
    };
  } catch {
    return { currentStreak: 0, maxStreak: 0, activeDays: 0 };
  }
};

const fetchJson = async (url, signal, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  const abort = () => controller.abort();

  signal?.addEventListener('abort', abort, { once: true });

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`${url} failed with HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
};

const readCache = () => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    if (!cache?.timestamp || Date.now() - cache.timestamp > CACHE_TTL) return null;
    return cache.data || null;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // Ignore storage failures; the live UI can still render fetched data.
  }
};

const normalizeBadges = (badgesData) => {
  const badges = Array.isArray(badgesData?.badges)
    ? badgesData.badges
    : Array.isArray(badgesData)
      ? badgesData
      : [];

  return (badges || []).filter(Boolean).map((badge, index) => ({
    id: badge?.id || badge?.name || badge?.displayName || `badge-${index}`,
    name: badge?.displayName || badge?.name || badge?.shortName || 'LeetCode Badge',
    icon: badge?.icon || badge?.medal?.config?.iconGif || badge?.medal?.config?.icon || '',
    creationDate: badge?.creationDate || badge?.creationDateTime || '',
  }));
};

const normalizeStats = ({ primaryData, backupData, solvedData, contestData, badgesData, calendarData }) => {
  const primaryCalendar = primaryData?.submissionCalendar;
  const backupCalendar = backupData?.submissionCalendar;
  const endpointCalendar = calendarData?.submissionCalendar || calendarData?.calendar || calendarData;
  const submissionCalendar = parseCalendar(primaryCalendar || backupCalendar || endpointCalendar || {});
  const streaks = calculateStreaks(submissionCalendar);

  const easySolved = safeNumber(primaryData?.easySolved ?? solvedData?.easySolved ?? backupData?.easySolved);
  const mediumSolved = safeNumber(primaryData?.mediumSolved ?? solvedData?.mediumSolved ?? backupData?.mediumSolved);
  const hardSolved = safeNumber(primaryData?.hardSolved ?? solvedData?.hardSolved ?? backupData?.hardSolved);
  const totalSolved = safeNumber(
    primaryData?.totalSolved ?? solvedData?.solvedProblem ?? solvedData?.totalSolved ?? backupData?.totalSolved,
    easySolved + mediumSolved + hardSolved
  );

  const contest = contestData?.contest || contestData?.contestData || contestData || {};

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalQuestions: safeNumber(primaryData?.totalQuestions ?? solvedData?.totalQuestions ?? backupData?.totalQuestions),
    totalEasy: safeNumber(primaryData?.totalEasy ?? solvedData?.totalEasy ?? backupData?.totalEasy),
    totalMedium: safeNumber(primaryData?.totalMedium ?? solvedData?.totalMedium ?? backupData?.totalMedium),
    totalHard: safeNumber(primaryData?.totalHard ?? solvedData?.totalHard ?? backupData?.totalHard),
    ranking: safeNumber(primaryData?.ranking ?? backupData?.ranking, null),
    contestRating: Math.round(safeNumber(contest?.contestRating ?? contest?.rating)),
    contestGlobalRank: safeNumber(contest?.contestGlobalRanking ?? contest?.globalRanking ?? contest?.ranking),
    contestTopPercentage: safeNumber(contest?.contestTopPercentage ?? contest?.topPercentage),
    contestAttend: safeNumber(contest?.contestAttend ?? contest?.attendedContestsCount),
    badges: normalizeBadges(badgesData),
    submissionCalendar,
    ...streaks,
  };
};

const buildHeatmap = (calendar) => {
  try {
    const parsedCalendar = parseCalendar(calendar);
    const countByDay = Object.entries(parsedCalendar || {}).reduce((acc, [timestamp, count]) => {
      const date = new Date(safeNumber(timestamp) * 1000);
      const key = getDayKey(date);
      if (key) acc[key] = (acc[key] || 0) + safeNumber(count);
      return acc;
    }, {});

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    start.setDate(start.getDate() - 167);

    const cells = Array.from({ length: 168 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = getDayKey(date);
      const count = safeNumber(countByDay[key]);

      return {
        key: key || `empty-${index}`,
        date,
        label: Number.isNaN(date.getTime())
          ? 'Unknown date'
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count,
      };
    });

    return cells.reduce((weeks, cell, index) => {
      const weekIndex = Math.floor(index / 7);
      if (!weeks[weekIndex]) weeks[weekIndex] = [];
      weeks[weekIndex].push(cell);
      return weeks;
    }, []);
  } catch {
    return Array.from({ length: 24 }, (_, weekIndex) =>
      Array.from({ length: 7 }, (_, dayIndex) => ({
        key: `fallback-${weekIndex}-${dayIndex}`,
        date: null,
        label: 'Unavailable',
        count: 0,
      }))
    );
  }
};

const getHeatmapClass = (count) => {
  if (count <= 0) return 'bg-white/[0.045] border border-white/[0.035]';
  if (count <= 2) return 'bg-violet-500/35 shadow-[0_0_10px_rgba(139,92,246,0.25)]';
  if (count <= 5) return 'bg-violet-400/75 shadow-[0_0_14px_rgba(167,139,250,0.38)]';
  if (count <= 8) return 'bg-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.45)]';
  return 'bg-cyan-200 shadow-[0_0_22px_rgba(165,243,252,0.7)]';
};

const LeetCodeLogo = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M16.1 17.9l-2.7 2.6a1.2 1.2 0 0 1-1.7 0l-8-7.7a1.2 1.2 0 0 1 0-1.7l8-7.8a1.2 1.2 0 0 1 1.7 0l2.7 2.6a1.1 1.1 0 0 1 0 1.6l-6.1 5.9a.4.4 0 0 0 0 .6l6.1 5.9a1.1 1.1 0 0 1 0 1.6z" fill="#FFA116" />
    <path d="M13 11h8" stroke="#F7F7F7" strokeWidth="2.1" strokeLinecap="round" />
  </svg>
);

const StatCard = ({ accent, icon, label, value, footer, children }) => (
  <motion.article
    variants={cardMotion}
    className="group relative min-h-[240px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070817]/70 p-6 shadow-2xl backdrop-blur-2xl"
  >
    <div className={`absolute inset-x-8 -top-24 h-48 rounded-full blur-3xl ${accent}`} />
    <div className="relative z-10 flex h-full flex-col justify-between gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gray-400">{label}</p>
          <div className="mt-3 text-4xl font-black text-white">
            {typeof value === 'number' ? <CountUp end={value} duration={1.1} separator="," /> : value}
          </div>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-200">
          {icon}
        </div>
      </div>
      {children}
      <p className="text-sm font-medium text-gray-400">{footer}</p>
    </div>
  </motion.article>
);

const clampPercent = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.min(number, 100);
};

const ProgressRow = ({ label, solved, total, totalSolved, gradient, glow }) => {
  const hasCatalogTotal = total > 0;
  const percent = clampPercent(hasCatalogTotal
    ? (solved / total) * 100
    : totalSolved > 0
      ? (solved / totalSolved) * 100
      : 0);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
        <span>{label}</span>
        <span className="text-gray-300">
          {hasCatalogTotal ? `${formatNumber(solved)} / ${formatNumber(total)}` : `${formatNumber(solved)} solved`}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.09] shadow-inner shadow-black/30">
        <motion.div
          className={`h-full min-w-[3px] rounded-full bg-gradient-to-r ${gradient} ${glow}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const LeetCodeStats = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [stats, setStats] = useState(emptyStats);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [selectedCell, setSelectedCell] = useState(null);
  const [brokenBadges, setBrokenBadges] = useState({});

  const heatmapWeeks = useMemo(() => buildHeatmap(stats?.submissionCalendar || {}), [stats?.submissionCalendar]);
  const badges = Array.isArray(stats?.badges) ? stats.badges : [];
  const solvedPercentage = stats?.totalQuestions > 0 ? Math.min((stats?.totalSolved / stats?.totalQuestions) * 100, 100) : 0;

  const fetchLeetCodeData = useCallback(async ({ manual = false } = {}) => {
    const controller = new AbortController();

    try {
      if (manual) setIsRefreshing(true);
      setErrorMessage('');

      const cached = !manual ? readCache() : null;
      if (cached) {
        setStats({ ...emptyStats, ...cached, badges: cached?.badges || [], submissionCalendar: cached?.submissionCalendar || {} });
        setLastUpdated(cached?.fetchedAt || '');
        setIsLoading(false);
      }

      const primaryPromise = fetchJson(PRIMARY_STATS_URL, controller.signal).catch(() => null);

      const [primaryData, backupData, solvedData, contestData, badgesData, calendarData] = await Promise.all([
        primaryPromise,
        fetchJson(BACKUP_PROFILE_URL, controller.signal).catch(() => null),
        fetchJson(BACKUP_SOLVED_URL, controller.signal).catch(() => null),
        fetchJson(CONTEST_URL, controller.signal).catch(() => null),
        fetchJson(BADGES_URL, controller.signal).catch(() => null),
        fetchJson(CALENDAR_URL, controller.signal).catch(() => null),
      ]);

      if (!primaryData && !backupData && !solvedData) {
        throw new Error('LeetCode statistics are temporarily unavailable.');
      }

      const normalized = normalizeStats({ primaryData, backupData, solvedData, contestData, badgesData, calendarData });
      const nextStats = { ...emptyStats, ...normalized, fetchedAt: new Date().toISOString() };

      setStats(nextStats);
      setLastUpdated(nextStats.fetchedAt);
      writeCache(nextStats);
    } catch (error) {
      setErrorMessage(error?.message || 'LeetCode data could not be loaded right now.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchLeetCodeData();
  }, [fetchLeetCodeData]);

  const handleRefresh = () => {
    fetchLeetCodeData({ manual: true });
  };

  const badgeLimit = badges.slice(0, 6);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'visible'}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
      className="relative z-10 mx-auto min-h-[600px] w-full max-w-7xl px-4 md:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px]" />
      <motion.div variants={cardMotion} className="mb-12 text-center">
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-cyan-200">
          <LeetCodeLogo className="h-5 w-5" />
          Live LeetCode
        </div>
        <h2 className="text-4xl font-black tracking-normal text-white md:text-6xl">
          Problem Solving Dashboard
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
          Real-time competitive programming progress for @{USERNAME}, rendered defensively so the section always stays visible.
        </p>
      </motion.div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mb-8 flex flex-col gap-4 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5 text-amber-100 shadow-[0_0_40px_rgba(251,191,36,0.08)] md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="shrink-0 text-amber-300" />
              <span className="text-sm font-semibold">{errorMessage} Showing a resilient fallback until the API responds.</span>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/20 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/15"
            >
              <FaRedoAlt className={isRefreshing ? 'animate-spin' : ''} />
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <motion.div variants={cardMotion} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="min-h-[240px] animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6">
              <div className="h-4 w-24 rounded-full bg-white/10" />
              <div className="mt-8 h-12 w-32 rounded-2xl bg-white/10" />
              <div className="mt-10 h-24 rounded-3xl bg-white/[0.07]" />
            </div>
          ))}
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <StatCard
              accent="bg-cyan-400/20"
              icon={<FaCode size={22} />}
              label="Solved"
              value={stats?.totalSolved || 0}
              footer={stats?.totalQuestions ? `${Math.round(solvedPercentage)}% of tracked LeetCode catalog` : 'Solved counts loaded from the live LeetCode backup API'}
            >
              <div className="space-y-4">
                <ProgressRow
                  label="Easy"
                  solved={stats?.easySolved || 0}
                  total={stats?.totalEasy || 0}
                  totalSolved={stats?.totalSolved || 0}
                  gradient="from-emerald-300 via-cyan-300 to-cyan-400"
                  glow="shadow-[0_0_18px_rgba(45,212,191,0.65)]"
                />
                <ProgressRow
                  label="Medium"
                  solved={stats?.mediumSolved || 0}
                  total={stats?.totalMedium || 0}
                  totalSolved={stats?.totalSolved || 0}
                  gradient="from-yellow-300 via-amber-400 to-orange-500"
                  glow="shadow-[0_0_18px_rgba(251,191,36,0.6)]"
                />
                <ProgressRow
                  label="Hard"
                  solved={stats?.hardSolved || 0}
                  total={stats?.totalHard || 0}
                  totalSolved={stats?.totalSolved || 0}
                  gradient="from-pink-400 via-rose-500 to-red-500"
                  glow="shadow-[0_0_18px_rgba(244,63,94,0.58)]"
                />
              </div>
            </StatCard>

            <StatCard
              accent="bg-violet-500/20"
              icon={<FaTrophy size={22} />}
              label="Contest Rating"
              value={stats?.contestRating || 0}
              footer={stats?.contestAttend ? `${formatNumber(stats?.contestAttend)} contests attended` : 'Contest data loaded from backup API when available'}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">Rank</p>
                  <p className="mt-2 text-xl font-black text-white">{stats?.contestGlobalRank ? `#${formatNumber(stats.contestGlobalRank)}` : 'N/A'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">Top</p>
                  <p className="mt-2 text-xl font-black text-white">{stats?.contestTopPercentage ? `${stats.contestTopPercentage}%` : 'N/A'}</p>
                </div>
              </div>
            </StatCard>

            <StatCard
              accent="bg-amber-400/20"
              icon={<FaFire size={22} />}
              label="Current Streak"
              value={stats?.currentStreak || 0}
              footer={`${formatNumber(stats?.activeDays || 0)} active days in submission history`}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">Best</p>
                  <p className="mt-2 text-xl font-black text-white">{formatNumber(stats?.maxStreak || 0)} days</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">Rank</p>
                  <p className="mt-2 text-xl font-black text-white">{stats?.ranking ? `#${formatNumber(stats.ranking)}` : 'N/A'}</p>
                </div>
              </div>
            </StatCard>
          </div>

          <motion.div
            variants={cardMotion}
            className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070817]/70 p-5 shadow-2xl backdrop-blur-2xl md:p-8"
          >
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3 text-white">
                  <FaCalendarAlt className="text-cyan-300" />
                  <h3 className="text-2xl font-black">Submission Heatmap</h3>
                </div>
                <p className="mt-2 text-sm text-gray-400">Last 24 weeks of accepted submission activity.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {lastUpdated && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-bold text-emerald-200">
                    <FaCheck /> Updated {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-100 transition hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaRedoAlt className={isRefreshing ? 'animate-spin' : ''} />
                  Refresh
                </button>
              </div>
            </div>

          <div className="relative overflow-x-auto pb-4 scrollbar-thin">
              <div className="flex min-w-[620px] gap-1.5">
                {(heatmapWeeks || []).map((week, weekIndex) => (
                  <div key={`week-${weekIndex}`} className="flex flex-col gap-1.5">
                    {(week || []).map((cell) => (
                      <button
                        key={cell?.key || `${weekIndex}-${cell?.label}`}
                        type="button"
                        onClick={() => setSelectedCell(cell)}
                        title={`${cell?.count || 0} submissions on ${cell?.label || 'Unknown date'}`}
                        className={`h-3.5 w-3.5 rounded-[4px] transition duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-cyan-200 ${getHeatmapClass(cell?.count || 0)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
              <div className="text-sm font-semibold text-gray-400">
                {selectedCell ? `${selectedCell?.count || 0} submissions on ${selectedCell?.label || 'Unknown date'}` : 'Select a square to inspect a day'}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                Less
                {[0, 2, 5, 8, 10].map((count) => (
                  <span key={count} className={`h-3.5 w-3.5 rounded-[4px] ${getHeatmapClass(count)}`} />
                ))}
                More
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardMotion} className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#070817]/70 p-5 shadow-2xl backdrop-blur-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <FaAward className="text-amber-300" />
                <h3 className="text-2xl font-black">Badges</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-300">
                {formatNumber(badges.length)} earned
              </span>
            </div>

            {badgeLimit.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {(badgeLimit || []).map((badge) => (
                  <div key={badge?.id || badge?.name} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.06]">
                      {badge?.icon && !brokenBadges[badge?.id] ? (
                        <img
                          src={badge.icon}
                          alt={badge?.name || 'LeetCode badge'}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 object-contain"
                          onError={() => setBrokenBadges((current) => ({ ...current, [badge?.id]: true }))}
                        />
                      ) : (
                        <FaAward className="text-3xl text-amber-300" />
                      )}
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm font-black text-white">{badge?.name || 'LeetCode Badge'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-sm font-semibold text-gray-400">
                Badge data is unavailable from the API right now, but the rest of the dashboard remains active.
              </div>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default LeetCodeStats;
