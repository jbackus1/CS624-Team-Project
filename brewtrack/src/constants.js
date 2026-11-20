export const ORDER_STATUSES = ['New', 'Preparing', 'Ready', 'Completed'];

export const PRODUCT_CATEGORIES = ['Coffee', 'Tea', 'Bakery', 'Other'];

// AsyncStorage keys (only touched by src/storage/storage.js)
export const STORAGE_KEYS = {
  products: 'brewtrack:products',
  orders: 'brewtrack:orders',
  seeded: 'brewtrack:seeded',
};
