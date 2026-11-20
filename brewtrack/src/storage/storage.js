import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

// Thin wrapper around AsyncStorage. Everything is stored as JSON.
// Screens should NOT call this directly -- use the actions from useApp()
// (src/context/AppContext.js), which call these for you.

export async function loadJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Failed to load ${key}`, e);
    return fallback;
  }
}

export async function saveJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save ${key}`, e);
  }
}

export const loadProducts = () => loadJSON(STORAGE_KEYS.products, null);
export const saveProducts = (products) => saveJSON(STORAGE_KEYS.products, products);
export const loadOrders = () => loadJSON(STORAGE_KEYS.orders, null);
export const saveOrders = (orders) => saveJSON(STORAGE_KEYS.orders, orders);

// Dev helper: wipe everything (handy while testing).
export async function clearAll() {
  await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
}
