import type { ContentStatus } from '../../types';

interface StatusBadgeProps {
  status: ContentStatus;
}

const statusConfig: Record<ContentStatus, { label: string; color: string; bg: string }> = {
  draft: {
    label: 'Чернетка',
    color: '#6b7280',
    bg: 'rgba(107, 114, 128, 0.15)',
  },
  published: {
    label: 'Опубліковано',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.15)',
  },
  archived: {
    label: 'Архів',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
};

export default StatusBadge;
