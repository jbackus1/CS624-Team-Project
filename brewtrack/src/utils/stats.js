import { ORDER_STATUSES } from '../constants';

export function getDashboardStats(orders, period, now = new Date()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (period === 'week') {
    start.setDate(start.getDate() - 6);
  }

  const filteredOrders = period === 'all' ? orders : orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    return createdAt >= start && createdAt <= now;
  });

  const statusCounts = Object.fromEntries(ORDER_STATUSES.map((status) => [status, 0]));
  const quantities = new Map();
  let revenue = 0;
  let completedCount = 0;

  for (const order of filteredOrders) {
    if (Object.hasOwn(statusCounts, order.status)) {
      statusCounts[order.status] += 1;
    }

    if (order.status !== 'Completed') continue;

    completedCount += 1;
    revenue += order.total;

    for (const item of order.items) {
      quantities.set(item.name, (quantities.get(item.name) ?? 0) + item.qty);
    }
  }

  const bestsellers = [...quantities]
    .sort(([firstName, firstQuantity], [secondName, secondQuantity]) =>
      secondQuantity - firstQuantity || firstName.localeCompare(secondName),
    )
    .slice(0, 5);

  return {
    totalOrders: filteredOrders.length,
    revenue,
    averageOrderValue: completedCount ? revenue / completedCount : 0,
    statusCounts,
    bestsellers,
  };
}
