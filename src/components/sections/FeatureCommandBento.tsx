'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { CgLayoutGrid } from 'react-icons/cg';
import {
  LuArrowRight,
  LuCalendarClock,
  LuCheck,
  LuCircleDot,
  LuGitPullRequest,
  LuKanban,
  LuLayoutGrid,
  LuList,
  LuMessageSquare,
  LuMessageSquareText,
  LuRefreshCw,
  LuSearch,
} from 'react-icons/lu';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

/* ---------------------------------- types ---------------------------------- */

type StageTabId = 'boards' | 'threads' | 'timeline' | 'imports';

interface StageItem {
  id: StageTabId;
  tab: string;
  title: string;
  description: string;
  icon: IconType;
  Demo: ComponentType;
}

interface CodeLine {
  n: number;
  tokens: ReactNode;
  highlight?: boolean;
}

interface BoardCard {
  title: string;
  chip: { label: string; tone: string } | null;
  assignee?: string;
  done?: boolean;
}

interface BoardColumn {
  name: string;
  cards: BoardCard[];
}

type LauncherTag = '#issue' | '#pr' | '@me';

interface LauncherItem {
  id: string;
  title: string;
  meta: string;
  icon: IconType;
  tags: readonly LauncherTag[];
}

type ViewMode = 'board' | 'list' | 'grid';

interface ViewOption {
  id: ViewMode;
  label: string;
  icon: IconType;
}

/* -------------------------------- constants -------------------------------- */

const BOARD_COLUMNS: readonly BoardColumn[] = [
  {
    name: 'To do',
    cards: [
      {
        title: 'Design empty states',
        chip: { label: 'Design', tone: 'bg-amber-50 text-amber-700' },
      },
      { title: 'Audit onboarding copy', chip: null },
    ],
  },
  {
    name: 'In progress',
    cards: [
      {
        title: 'Ship auth flow',
        chip: { label: 'Auth', tone: 'bg-indigo-50 text-indigo-600' },
        assignee: 'JD',
      },
    ],
  },
  {
    name: 'Done',
    cards: [{ title: 'Fix login redirect', chip: null, done: true }],
  },
];

const THREAD_CODE: readonly CodeLine[] = [
  {
    n: 40,
    tokens: (
      <>
        {'  '}
        <span className="text-indigo-300">const</span>
        {' user = useCurrentUser()'}
      </>
    ),
  },
  {
    n: 41,
    highlight: true,
    tokens: (
      <>
        {'  '}
        <span className="text-indigo-300">const</span>
        {' name = user.profile.displayName'}
      </>
    ),
  },
  {
    n: 42,
    tokens: (
      <>
        {'  '}
        <span className="text-indigo-300">return</span>
        {' greet(name)'}
      </>
    ),
  },
];

const IMPORT_SOURCES = [
  { name: 'Trello', detail: '3 boards · 64 cards' },
  { name: 'Asana', detail: '2 projects · 41 tasks' },
  { name: 'Spreadsheet', detail: 'tasks.csv · 23 rows' },
] as const;

const ROADMAP_PATH =
  'M 38 80 C 80 80 84 26 122 26 C 165 26 170 92 211 92 C 250 92 255 40 288 40';

const ROADMAP_NODES = [
  { label: 'Design', x: 38, y: 80, left: '12%' },
  { label: 'Build', x: 122, y: 26, left: '38%' },
  { label: 'Review', x: 211, y: 92, left: '66%' },
  { label: 'Launch', x: 288, y: 40, left: '90%' },
] as const;

const LAUNCHER_TAGS: readonly LauncherTag[] = ['#issue', '#pr', '@me'];

const LAUNCHER_ITEMS: readonly LauncherItem[] = [
  {
    id: 'flaky-auth',
    title: 'Fix flaky auth test',
    meta: '#1042',
    icon: LuCircleDot,
    tags: ['#issue', '@me'],
  },
  {
    id: 'kbd-shortcuts',
    title: 'feat: keyboard shortcuts',
    meta: 'PR #318',
    icon: LuGitPullRequest,
    tags: ['#pr'],
  },
  {
    id: 'rename-timeline',
    title: 'Rename Timeline to Roadmap',
    meta: '#1039',
    icon: LuCircleDot,
    tags: ['#issue', '@me'],
  },
];

const VIEW_OPTIONS: readonly ViewOption[] = [
  { id: 'board', label: 'Board', icon: LuKanban },
  { id: 'list', label: 'List', icon: LuList },
  { id: 'grid', label: 'Grid', icon: LuLayoutGrid },
];

const VIEW_LAYOUT: Record<ViewMode, string> = {
  board: 'grid grid-cols-3 gap-2',
  list: 'flex flex-col gap-1.5',
  grid: 'grid grid-cols-2 gap-2',
};

const VIEW_TILE: Record<ViewMode, string> = {
  board: 'h-16',
  list: 'h-6',
  grid: 'aspect-square',
};

const VIEW_TILES = [0, 1, 2, 3, 4, 5] as const;

const taskCard =
  'rounded-md border border-neutral-200 bg-white p-2.5 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md';

/* ------------------------------- stage views ------------------------------- */

const BoardsView = () => (
  <div className="grid grid-cols-3 gap-2 sm:gap-3">
    {BOARD_COLUMNS.map((column) => (
      <div key={column.name} className="space-y-2 rounded-lg bg-neutral-100 p-2">
        <p className="px-0.5 text-[11px] font-medium text-neutral-400">{column.name}</p>
        {column.cards.map((card) => (
          <div key={card.title} className={taskCard}>
            {card.chip && (
              <span
                className={`mb-1.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium ${card.chip.tone}`}
              >
                {card.chip.label}
              </span>
            )}
            <p
              className={`truncate text-xs font-medium ${
                card.done
                  ? 'text-neutral-400 line-through decoration-neutral-300'
                  : 'text-neutral-700'
              }`}
            >
              {card.title}
            </p>
            {card.assignee && (
              <div className="mt-1.5 flex justify-end">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-semibold text-indigo-700">
                  {card.assignee}
                </span>
              </div>
            )}
            {card.done && (
              <span className="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                <LuCheck className="h-2.5 w-2.5" aria-hidden />
                Done
              </span>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const CodeBlock = ({ lines }: { lines: readonly CodeLine[] }) => (
  <div className="rounded-lg bg-neutral-900 p-3 font-mono text-[11px] leading-relaxed sm:text-xs">
    {lines.map((line) => (
      <div
        key={line.n}
        className={`flex gap-3 ${
          line.highlight ? '-mx-3 border-l-2 border-indigo-400 bg-indigo-500/10 px-3' : ''
        }`}
      >
        <span className="text-neutral-600 select-none">{line.n}</span>
        <code className="text-neutral-100">{line.tokens}</code>
      </div>
    ))}
  </div>
);

const ThreadsView = () => (
  <div className="flex flex-col gap-3">
    <CodeBlock lines={THREAD_CODE} />
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[10px] font-semibold text-amber-700">
          RS
        </span>
        <span className="text-xs font-semibold text-neutral-800">Riya S.</span>
        <span className="text-[10px] text-neutral-400">· on line 41</span>
      </div>
      <p className="text-xs leading-relaxed text-neutral-600">
        <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px] text-neutral-700">
          user.profile
        </code>{' '}
        can be null on first render — guard it before reading{' '}
        <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px] text-neutral-700">
          displayName
        </code>
        .
      </p>
      <button
        type="button"
        className="mt-1 inline-flex items-center gap-1 self-start rounded-md border border-neutral-200 px-2 py-1 text-[11px] font-medium text-neutral-600 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
      >
        Reply in thread
        <LuArrowRight className="h-3 w-3" aria-hidden />
      </button>
    </div>
  </div>
);

const TimelineView = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative pb-6">
      <svg
        viewBox="0 0 320 120"
        className="w-full"
        role="img"
        aria-label="Project roadmap from Design through Build and Review to Launch"
      >
        <path
          d={ROADMAP_PATH}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <motion.path
          d={ROADMAP_PATH}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
          animate={prefersReducedMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        {ROADMAP_NODES.map((node) => (
          <g key={node.label}>
            {!prefersReducedMotion && (
              <circle
                cx={node.x}
                cy={node.y}
                r="9"
                fill="#6366f1"
                opacity="0.18"
                className="animate-pulse"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill="#4f46e5"
              stroke="#fff"
              strokeWidth="2.5"
            />
          </g>
        ))}
      </svg>
      {ROADMAP_NODES.map((node) => (
        <span
          key={node.label}
          style={{ left: node.left }}
          className="absolute bottom-0 -translate-x-1/2 text-[10px] font-medium text-neutral-500"
        >
          {node.label}
        </span>
      ))}
    </div>
  );
};

const ImportsView = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {IMPORT_SOURCES.map((source, index) => (
            <motion.div
              key={source.name}
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.3 }}
              className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-neutral-700">
                  {source.name}
                </p>
                <p className="truncate text-[10px] text-neutral-400">{source.detail}</p>
              </div>
              <LuCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden />
            </motion.div>
          ))}
        </div>
        <LuArrowRight className="h-4 w-4 shrink-0 text-neutral-300" aria-hidden />
        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            N
          </span>
          <span className="text-[10px] font-medium text-neutral-400">Novi</span>
        </div>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-2.5">
        <div className="flex items-center justify-between text-[10px] font-medium text-neutral-500">
          <span>Importing 128 tasks</span>
          <span className="text-emerald-600">100%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <motion.div
            initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="h-full w-full origin-left rounded-full bg-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

const STAGE_ITEMS: readonly StageItem[] = [
  {
    id: 'boards',
    tab: 'Boards',
    title: 'Boards that move at your speed',
    description: 'Plan sprints and track tasks without hunting through spreadsheets.',
    icon: CgLayoutGrid,
    Demo: BoardsView,
  },
  {
    id: 'threads',
    tab: 'Threads',
    title: 'Threads, not another inbox',
    description: 'Keep project conversations attached to the work itself.',
    icon: LuMessageSquareText,
    Demo: ThreadsView,
  },
  {
    id: 'timeline',
    tab: 'Timeline',
    title: 'One timeline for the whole team',
    description: 'See every deadline and milestone in one shared view.',
    icon: LuCalendarClock,
    Demo: TimelineView,
  },
  {
    id: 'imports',
    tab: 'Imports',
    title: 'Works the way you already do',
    description: 'Import from Trello, Asana, or a spreadsheet in minutes.',
    icon: LuRefreshCw,
    Demo: ImportsView,
  },
];

/* --------------------------------- stage ---------------------------------- */

const DemoFrame = ({
  label,
  children,
  className = '',
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white ${className}`}
  >
    <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
      <span className="h-3 w-3 rounded-full bg-red-400" />
      <span className="h-3 w-3 rounded-full bg-yellow-400" />
      <span className="h-3 w-3 rounded-full bg-green-400" />
      <span className="ml-2 text-xs font-medium text-neutral-400">{label}</span>
    </div>
    <div className="min-h-0 flex-1 overflow-auto bg-neutral-50 p-4 sm:p-5">
      {children}
    </div>
  </div>
);

const StagePanelBody = ({ item }: { item: StageItem }) => {
  const Demo = item.Demo;

  return (
    <div className="grid h-full grid-cols-2 items-center gap-6 lg:gap-10">
      <div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <item.icon className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-neutral-900">{item.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-neutral-600">
          {item.description}
        </p>
      </div>
      <DemoFrame label={`${item.id} · novi`} className="h-full">
        <Demo />
      </DemoFrame>
    </div>
  );
};

const AUTOPLAY_INTERVAL_MS = 3000;

const StageDesktop = () => {
  const uid = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState<StageTabId>('boards');
  const [isPaused, setIsPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = STAGE_ITEMS.findIndex((item) => item.id === activeTab);
  const activeItem = STAGE_ITEMS[activeIndex];
  const autoplay = !prefersReducedMotion && !isPaused;

  // Cycle through the tabs on a fixed loop; any tab change (auto or manual)
  // resets the timer via the `activeTab` dependency.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => {
      setActiveTab((current) => {
        const i = STAGE_ITEMS.findIndex((item) => item.id === current);
        return STAGE_ITEMS[(i + 1) % STAGE_ITEMS.length].id;
      });
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, activeTab]);

  const selectTabAt = (index: number) => {
    const next = (index + STAGE_ITEMS.length) % STAGE_ITEMS.length;
    setActiveTab(STAGE_ITEMS[next].id);
    tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        selectTabAt(activeIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        selectTabAt(activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        selectTabAt(0);
        break;
      case 'End':
        event.preventDefault();
        selectTabAt(STAGE_ITEMS.length - 1);
        break;
    }
  };

  return (
    <div
      className="hidden md:block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        role="tablist"
        aria-label="Command center capabilities"
        aria-orientation="horizontal"
        className="grid grid-cols-4 gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1"
      >
        {STAGE_ITEMS.map((item, index) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(item.id)}
              onKeyDown={onTabKeyDown}
              className="relative flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              {isActive && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-indigo-600"
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 ${
                  isActive ? 'text-white' : 'text-neutral-600'
                }`}
              >
                <item.icon className="h-4 w-4" aria-hidden />
                {item.tab}
              </span>
              {isActive && !prefersReducedMotion && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 bottom-1.5 z-10 h-0.5 overflow-hidden rounded-full bg-white/25"
                >
                  <motion.span
                    key={activeTab}
                    className="block h-full w-full origin-left rounded-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: autoplay ? 1 : 0 }}
                    transition={
                      autoplay
                        ? { duration: AUTOPLAY_INTERVAL_MS / 1000, ease: 'linear' }
                        : { duration: 0.3, ease: 'easeOut' }
                    }
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${activeTab}`}
        tabIndex={0}
        className="mt-4 h-[380px] overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none lg:h-[400px] lg:p-6"
      >
        {prefersReducedMotion ? (
          <StagePanelBody item={activeItem} />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <StagePanelBody item={activeItem} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const StageMobile = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-10 md:hidden">
      {STAGE_ITEMS.map((item) => {
        const Demo = item.Demo;
        const body = (
          <>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <item.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </div>
            </div>
            <DemoFrame label={`${item.id} · novi`}>
              <Demo />
            </DemoFrame>
          </>
        );

        if (prefersReducedMotion) {
          return (
            <div key={item.id} className="flex flex-col gap-4">
              {body}
            </div>
          );
        }

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            {body}
          </motion.div>
        );
      })}
    </div>
  );
};

const CommandStage = () => (
  <div className="mb-8 rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50/70 p-4 shadow-xl shadow-indigo-500/5 sm:p-6 lg:p-8">
    <StageDesktop />
    <StageMobile />
  </div>
);

/* ------------------------------- bento cards ------------------------------- */

interface BentoCardProps {
  icon: IconType;
  title: string;
  description: string;
  children: ReactNode;
}

const BentoCard = ({ icon: Icon, title, description, children }: BentoCardProps) => (
  <div className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5">
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{description}</p>
      </div>
    </div>
    <div className="mt-4 flex-1">{children}</div>
  </div>
);

const LauncherCard = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ReadonlySet<LauncherTag>>(new Set());

  const toggleTag = (tag: LauncherTag) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const normalized = query.trim().toLowerCase();
  const visibleItems = LAUNCHER_ITEMS.filter((item) => {
    const matchesQuery =
      normalized === '' || item.title.toLowerCase().includes(normalized);
    const matchesTags = selected.size === 0 || item.tags.some((tag) => selected.has(tag));
    return matchesQuery && matchesTags;
  });

  return (
    <BentoCard
      icon={LuSearch}
      title="Command launcher"
      description="Jump to any issue or PR without leaving the keyboard."
    >
      <label className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 focus-within:border-indigo-500/50">
        <LuSearch className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search or jump to…"
          aria-label="Filter results"
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
        />
        <kbd className="shrink-0 rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
          ⌘K
        </kbd>
      </label>

      <div
        className="mt-3 flex flex-wrap gap-1.5"
        role="group"
        aria-label="Filter by tag"
      >
        {LAUNCHER_TAGS.map((tag) => {
          const isOn = selected.has(tag);
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isOn}
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                isOn
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-neutral-200 text-neutral-600 hover:border-indigo-500/50 hover:text-indigo-600'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-3 space-y-1.5">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-2"
            >
              <item.icon className="h-3.5 w-3.5 shrink-0 text-indigo-500" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-xs font-medium text-neutral-700">
                {item.title}
              </span>
              <span className="shrink-0 text-[10px] text-neutral-400">{item.meta}</span>
            </motion.li>
          ))}
          {visibleItems.length === 0 && (
            <motion.li
              key="empty"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-dashed border-neutral-200 px-2.5 py-3 text-center text-[11px] text-neutral-400"
            >
              No matches
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </BentoCard>
  );
};

const ThreadResolverCard = () => {
  const [resolved, setResolved] = useState(false);

  return (
    <BentoCard
      icon={LuMessageSquare}
      title="Thread resolver"
      description="Close the loop on a discussion the moment it’s settled."
    >
      <div
        className={`rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-opacity ${
          resolved ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-semibold text-indigo-700">
            AM
          </span>
          <span className="text-xs font-semibold text-neutral-800">Alex M.</span>
          <span className="text-[10px] text-neutral-400">· 3h ago</span>
        </div>
        <p
          className={`mt-2 text-xs leading-relaxed ${
            resolved ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          Can we ship the empty-state illustration in this release, or push it to next
          sprint?
        </p>
      </div>

      <div className="mt-3">
        <button
          type="button"
          aria-pressed={resolved}
          onClick={() => setResolved((value) => !value)}
          className={
            resolved
              ? 'inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none'
              : 'inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none'
          }
        >
          {resolved ? (
            <>
              <LuCheck className="h-3.5 w-3.5" aria-hidden />
              Resolved
            </>
          ) : (
            'Resolve thread'
          )}
        </button>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {resolved ? 'Thread resolved' : ''}
      </span>
    </BentoCard>
  );
};

const ViewSwitcherCard = () => {
  const [mode, setMode] = useState<ViewMode>('board');

  return (
    <BentoCard
      icon={LuLayoutGrid}
      title="View switcher"
      description="Reshape the same data into the layout that fits the task."
    >
      <div
        className="flex gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-1"
        role="group"
        aria-label="Preview layout"
      >
        {VIEW_OPTIONS.map((option) => {
          const isActive = option.id === mode;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setMode(option.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-neutral-600 hover:text-indigo-600'
              }`}
            >
              <option.icon className="h-3.5 w-3.5" aria-hidden />
              {option.label}
            </button>
          );
        })}
      </div>

      <div
        className={`mt-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 ${VIEW_LAYOUT[mode]}`}
      >
        {VIEW_TILES.map((tile) => (
          <motion.div
            key={tile}
            layout
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className={`rounded-md border border-indigo-200 bg-indigo-100 ${VIEW_TILE[mode]}`}
          />
        ))}
      </div>
    </BentoCard>
  );
};

/* --------------------------------- section -------------------------------- */

export const FeatureCommandBento = () => {
  return (
    <section
      id="command-center"
      className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Everything your team needs
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
          Engineered to eliminate context switching, automate workflows, and accelerate
          developer velocity.
        </p>
      </div>

      <CommandStage />

      {/* <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
        <LauncherCard />
        <ThreadResolverCard />
        <ViewSwitcherCard />
      </div> */}
    </section>
  );
};
