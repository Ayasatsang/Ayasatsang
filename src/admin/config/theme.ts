// Admin Panel Theme Configuration (Webflow-inspired Dark Theme)

export const adminTheme = {
  colors: {
    // Backgrounds
    bg: '#1e1e1e',
    bgSecondary: '#252525',
    bgTertiary: '#2d2d2d',
    bgHover: '#333333',

    // Borders
    border: '#3d3d3d',
    borderLight: '#4d4d4d',

    // Text
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    textMuted: '#6b6b6b',

    // Accent
    accent: '#6366f1',
    accentHover: '#818cf8',
    accentLight: 'rgba(99, 102, 241, 0.1)',

    // Status colors
    statusPublished: '#22c55e',
    statusPublishedBg: 'rgba(34, 197, 94, 0.1)',
    statusDraft: '#6b7280',
    statusDraftBg: 'rgba(107, 114, 128, 0.1)',
    statusArchived: '#f59e0b',
    statusArchivedBg: 'rgba(245, 158, 11, 0.1)',

    // Semantic
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Layout dimensions
  layout: {
    sidebarWidth: '240px',
    itemsListWidth: '400px',
    topBarHeight: '56px',
  },

  // Border radius
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },

  // Transitions
  transition: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
};

// CSS Variables for admin theme
export const adminCssVariables = `
  /* Admin Theme Variables */
  --admin-bg: ${adminTheme.colors.bg};
  --admin-bg-secondary: ${adminTheme.colors.bgSecondary};
  --admin-bg-tertiary: ${adminTheme.colors.bgTertiary};
  --admin-bg-hover: ${adminTheme.colors.bgHover};
  --admin-border: ${adminTheme.colors.border};
  --admin-border-light: ${adminTheme.colors.borderLight};
  --admin-text: ${adminTheme.colors.text};
  --admin-text-secondary: ${adminTheme.colors.textSecondary};
  --admin-text-muted: ${adminTheme.colors.textMuted};
  --admin-accent: ${adminTheme.colors.accent};
  --admin-accent-hover: ${adminTheme.colors.accentHover};
  --admin-accent-light: ${adminTheme.colors.accentLight};
  --admin-status-published: ${adminTheme.colors.statusPublished};
  --admin-status-published-bg: ${adminTheme.colors.statusPublishedBg};
  --admin-status-draft: ${adminTheme.colors.statusDraft};
  --admin-status-draft-bg: ${adminTheme.colors.statusDraftBg};
  --admin-status-archived: ${adminTheme.colors.statusArchived};
  --admin-status-archived-bg: ${adminTheme.colors.statusArchivedBg};
  --admin-success: ${adminTheme.colors.success};
  --admin-warning: ${adminTheme.colors.warning};
  --admin-error: ${adminTheme.colors.error};
  --admin-info: ${adminTheme.colors.info};
  --admin-sidebar-width: ${adminTheme.layout.sidebarWidth};
  --admin-items-list-width: ${adminTheme.layout.itemsListWidth};
  --admin-topbar-height: ${adminTheme.layout.topBarHeight};
`;
