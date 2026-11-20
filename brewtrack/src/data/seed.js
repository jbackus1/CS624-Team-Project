// Starter data, loaded on the very first launch so the app is never empty
// during development and demos.

export const seedProducts = [
  { id: 'p1', name: 'Latte', category: 'Coffee', price: 4.5, available: true },
  { id: 'p2', name: 'Cappuccino', category: 'Coffee', price: 4.25, available: true },
  { id: 'p3', name: 'Americano', category: 'Coffee', price: 3.25, available: true },
  { id: 'p4', name: 'Cold Brew', category: 'Coffee', price: 4.75, available: true },
  { id: 'p5', name: 'Chai Latte', category: 'Tea', price: 4.5, available: true },
  { id: 'p6', name: 'Green Tea', category: 'Tea', price: 3.0, available: true },
  { id: 'p7', name: 'Butter Croissant', category: 'Bakery', price: 3.5, available: true },
  { id: 'p8', name: 'Blueberry Muffin', category: 'Bakery', price: 3.75, available: true },
];

const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

export const seedOrders = [
  {
    id: 'o1',
    status: 'Completed',
    createdAt: hoursAgo(26),
    note: '',
    items: [
      { productId: 'p1', name: 'Latte', price: 4.5, qty: 2 },
      { productId: 'p7', name: 'Butter Croissant', price: 3.5, qty: 1 },
    ],
    total: 12.5,
  },
  {
    id: 'o2',
    status: 'Preparing',
    createdAt: hoursAgo(1),
    note: 'Oat milk',
    items: [{ productId: 'p5', name: 'Chai Latte', price: 4.5, qty: 1 }],
    total: 4.5,
  },
  {
    id: 'o3',
    status: 'New',
    createdAt: hoursAgo(0.2),
    note: '',
    items: [
      { productId: 'p3', name: 'Americano', price: 3.25, qty: 1 },
      { productId: 'p8', name: 'Blueberry Muffin', price: 3.75, qty: 2 },
    ],
    total: 10.75,
  },
];
