import { FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { CgLayoutGrid } from 'react-icons/cg';
import {
  LuCalendarClock,
  LuMessageSquareText,
  LuInbox,
  LuMessagesSquare,
  LuRocket,
} from 'react-icons/lu';
import { FiRefreshCw } from 'react-icons/fi';

export const navContent = {
  name: 'Novi',
  links: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
  ],
  signIn: { label: 'Sign in', href: '#' },
  cta: { label: 'Try for FREE', href: '#' },
};

export const heroContent = {
  headline: 'Run your team without the tab switching',
  subheading:
    'Novi brings tasks, docs, and conversations into one calm workspace built for small, fast-moving teams.',
  primaryCta: 'Try for FREE',
  secondaryCta: 'See how it works',
};

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export const featureSectionContent = {
  heading: 'Everything your team needs',
  subheading: 'Novi brings the essentials together: less coordinating, more building.',
};

export const features: Feature[] = [
  {
    icon: CgLayoutGrid,
    title: 'Boards that move at your speed',
    description: 'Plan sprints and track tasks without hunting through spreadsheets.',
  },
  {
    icon: LuMessageSquareText,
    title: 'Threads, not another inbox',
    description: 'Keep project conversations attached to the work itself.',
  },
  {
    icon: LuCalendarClock,
    title: 'One timeline for the whole team',
    description: 'See every deadline and milestone in one shared view.',
  },
  {
    icon: FiRefreshCw,
    title: 'Works the way you already do',
    description: 'Import from Trello, Asana, or a spreadsheet in minutes.',
  },
];

export interface HowItWorksStep {
  icon: IconType;
  title: string;
  description: string;
}

export const howItWorksContent = {
  heading: 'From idea to shipped, in one flow',
  subheading:
    'No context switching between steps: one workspace that moves with the work.',
  steps: [
    {
      icon: LuInbox,
      title: 'Capture',
      description: 'Collect tasks and ideas in one board, not six different tools.',
    },
    {
      icon: LuMessagesSquare,
      title: 'Discuss',
      description:
        'Keep conversations attached to the work itself, not a separate inbox.',
    },
    {
      icon: LuRocket,
      title: 'Ship',
      description:
        'Share one timeline across the team, so nothing falls through the cracks.',
    },
  ] satisfies HowItWorksStep[],
};

export const ctaContent = {
  heading: 'Give your team one workspace',
  cta: 'Try for FREE',
  disclaimer: 'No credit card required. Cancel anytime.',
};

export interface FooterLinkGroup {
  heading: string;
  links: { label: string; href: string }[];
}

export const footerContent = {
  name: 'Novi',
  tagline: "The workspace for teams who'd rather build than coordinate.",
  linkGroups: [
    {
      heading: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Changelog', href: '#' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'API Docs', href: '#' },
        { label: 'Community', href: '#' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
        { label: 'Security', href: '#' },
      ],
    },
  ] satisfies FooterLinkGroup[],
  socials: [
    { icon: FaXTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
  ] as { icon: IconType; href: string; label: string }[],
};
