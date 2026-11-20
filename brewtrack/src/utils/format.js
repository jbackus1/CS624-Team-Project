export const formatCurrency = (n) => `$${Number(n || 0).toFixed(2)}`;

export const formatDateTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

// Simple unique id (good enough for local data).
export const makeId = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// Sum of price * qty for an order's items array.
export const calcTotal = (items) =>
  items.reduce((sum, it) => sum + it.price * it.qty, 0);
