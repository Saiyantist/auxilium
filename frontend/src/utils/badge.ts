import { cn } from '@/lib/utils';
import { toTitleCase } from './string';

type BadgeCategory = 'priority' | 'severity' | 'status' | 'ticket_type';

const badgeStyles: Record<BadgeCategory, Record<string, string>> = {
  priority: {
    low: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    urgent: 'bg-red-100 text-red-700 border-red-200',
  },
  severity: {
    minor: 'bg-blue-100 text-blue-700 border-blue-200',
    major: 'bg-orange-100 text-orange-700 border-orange-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
  },
  status: {
    open: 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    on_hold: 'bg-slate-100 text-slate-700 border-slate-200',
    resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    closed: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  ticket_type: {
    issue: 'bg-slate-100 text-slate-700 border-slate-200',
    question: 'bg-blue-100 text-blue-700 border-blue-200',
    task: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
};

export const getBadgeProps = (category: BadgeCategory, value: unknown) => {
  const normalized = typeof value === 'string' ? value.toLowerCase() : '';
  const baseClass =
    badgeStyles[category][normalized] ??
    'bg-gray-100 text-gray-800 border-gray-200';

  return {
    label: toTitleCase(value),
    variant: 'outline' as const,
    className: cn(baseClass),
  };
};
