import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { seedOrders, seedProducts } from '../data/seed';
import { loadOrders, loadProducts, saveOrders, saveProducts } from '../storage/storage';
import { calcTotal, makeId } from '../utils/format';

/*
 * Global app state: products + orders.
 * - State lives in a reducer.
 * - Every change is saved to AsyncStorage automatically (see the effects below).
 * - Screens read data and call actions via the useApp() hook:
 *
 *     const { products, orders, addProduct, ... , loading } = useApp();
 *
 * Product shape: { id, name, category, price, available }
 * Order shape:   { id, status, createdAt, note, total,
 *                  items: [{ productId, name, price, qty }] }
 *
 * Order items store a COPY of the name and price, so editing or deleting a
 * product later never changes past orders or revenue.
 */

const AppContext = createContext(null);

const initialState = { products: [], orders: [], loading: true };

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, products: action.products, orders: action.orders, loading: false };

    // ----- Products -----
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id ? { ...p, ...action.changes } : p
        ),
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter((p) => p.id !== action.id) };

    // ----- Orders -----
    case 'ADD_ORDER':
      return { ...state, orders: [action.order, ...state.orders] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.id ? { ...o, ...action.changes } : o
        ),
      };
    case 'DELETE_ORDER':
      return { ...state, orders: state.orders.filter((o) => o.id !== action.id) };

    // ----- Dev -----
    case 'RESET':
      return { ...state, products: action.products, orders: action.orders };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hydrated = useRef(false);

  // Load saved data on launch. First launch (nothing saved) -> use seed data.
  useEffect(() => {
    (async () => {
      const [savedProducts, savedOrders] = await Promise.all([loadProducts(), loadOrders()]);
      dispatch({
        type: 'HYDRATE',
        products: savedProducts ?? seedProducts,
        orders: savedOrders ?? seedOrders,
      });
      hydrated.current = true;
    })();
  }, []);

  // Persist on every change (but not before the initial load finishes).
  useEffect(() => {
    if (hydrated.current) saveProducts(state.products);
  }, [state.products]);
  useEffect(() => {
    if (hydrated.current) saveOrders(state.orders);
  }, [state.orders]);

  // ---------- Actions ----------
  const addProduct = useCallback((data) => {
    const product = { id: makeId('p'), available: true, ...data };
    dispatch({ type: 'ADD_PRODUCT', product });
    return product;
  }, []);
  const updateProduct = useCallback(
    (id, changes) => dispatch({ type: 'UPDATE_PRODUCT', id, changes }),
    []
  );
  const deleteProduct = useCallback((id) => dispatch({ type: 'DELETE_PRODUCT', id }), []);

  // items: [{ productId, name, price, qty }]
  const addOrder = useCallback(({ items, note = '' }) => {
    const order = {
      id: makeId('o'),
      status: 'New',
      createdAt: new Date().toISOString(),
      note,
      items,
      total: calcTotal(items),
    };
    dispatch({ type: 'ADD_ORDER', order });
    return order;
  }, []);
  const updateOrder = useCallback(
    (id, changes) => dispatch({ type: 'UPDATE_ORDER', id, changes }),
    []
  );
  const updateOrderStatus = useCallback(
    (id, status) => dispatch({ type: 'UPDATE_ORDER', id, changes: { status } }),
    []
  );
  const deleteOrder = useCallback((id) => dispatch({ type: 'DELETE_ORDER', id }), []);

  // Dev helper: restore the starter data.
  const resetToSeed = useCallback(
    () => dispatch({ type: 'RESET', products: seedProducts, orders: seedOrders }),
    []
  );

  const value = useMemo(
    () => ({
      products: state.products,
      orders: state.orders,
      loading: state.loading,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrder,
      updateOrderStatus,
      deleteOrder,
      resetToSeed,
    }),
    [
      state,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrder,
      updateOrderStatus,
      deleteOrder,
      resetToSeed,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
