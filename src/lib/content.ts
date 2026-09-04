import type { LucideIcon } from 'lucide-react';
import { LayoutGrid, MessageSquareText, CalendarClock, RefreshCw } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const featureSectionContent = {
  heading: 'Everything your team needs, nothing it doesn\u2019t',
  subheading:
    'Novi brings the essentials together so your team spends less time coordinating and more time building.',
};

export const features: Feature[] = [
  {
    icon: LayoutGrid,
    title: 'Boards that move at your speed',
    description: 'Plan sprints and track tasks without hunting through spreadsheets.',
  },
  {
    icon: MessageSquareText,
    title: 'Threads, not another inbox',
    description: 'Keep project conversations attached to the work itself.',
  },
  {
    icon: CalendarClock,
    title: 'One timeline for the whole team',
    description: 'Every deadline and milestone in one shared view.',
  },
  {
    icon: RefreshCw,
    title: 'Works the way you already do',
    description: 'Import from Trello, Asana, or a spreadsheet in minutes.',
  },
];
