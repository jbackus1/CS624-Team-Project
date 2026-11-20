// Shared design tokens. Use these instead of hard-coding colors/sizes so the
// whole app stays visually consistent.

export const colors = {
  espresso: '#3E2723', // primary / headers
  roast: '#6D4C41', // secondary text, icons
  caramel: '#C8843A', // accent / buttons
  cream: '#FAF5EE', // screen background
  foam: '#FFFFFF', // cards
  border: '#E6DCCF',
  text: '#2B1D17',
  textMuted: '#8A7769',
  danger: '#B3261E',
  success: '#2E7D32',
};

// Order status -> pill colors
export const statusColors = {
  New: { bg: '#FDECC8', fg: '#8A5A00' },
  Preparing: { bg: '#DCEBFA', fg: '#1A4F8B' },
  Ready: { bg: '#DDF2DF', fg: '#1E6B2B' },
  Completed: { bg: '#E7E2DC', fg: '#5B4F46' },
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const radius = { sm: 8, md: 14, lg: 22, pill: 999 };

export const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};
