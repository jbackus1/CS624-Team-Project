# BrewTrack ☕

**A Mobile Product and Order Management App for Small Coffee Shops**

CS624 Full Stack Development – Mobile Application · Prof. Mike Prasad · City University of Seattle
Team: Xavier Backus, Qian Zhou, Sunudji Hegde

> Status: **foundation only.** Navigation, theme, data layer and stub screens are in place.
> Each member implements their own feature (see "Team ownership"). Replace the placeholder
> sections below as you go — the grader reads this file.

---

## 1. Key features

| Feature | Owner | Description |
|---|---|---|
| Product management | Xavier | Add, edit, delete, search and toggle availability of menu items |
| Order management | Qian | Create orders, update status (New → Preparing → Ready → Completed), delete orders |
| Sales dashboard | Sunudji | Total orders, revenue, average order, bestsellers, date filter |

_TODO: update this table with what was actually built._

## 2. How the app works

- **Navigation:** React Navigation. Bottom tabs (Orders, Products, Dashboard); each tab has its own native stack.
- **State:** `src/context/AppContext.js` holds products and orders in a reducer and exposes them with the `useApp()` hook.
- **Persistence:** every change is saved to **AsyncStorage** automatically (`src/storage/storage.js`). First launch loads starter data from `src/data/seed.js`.
- **CRUD:** create / read / update / delete for both products and orders.
- **Order history safety:** each order item stores a copy of the product name and price, so editing or deleting a product never changes past revenue.

_TODO: add screenshots in a `/screenshots` folder and link them here._

## 3. Project structure

```
App.js                      entry: providers + navigator
src/
  theme.js                  colors, spacing, shadows (use these, don't hard-code)
  constants.js              statuses, categories, storage keys
  context/AppContext.js     global state + actions (useApp)
  storage/storage.js        AsyncStorage helpers
  data/seed.js              starter products/orders
  navigation/RootNavigator.js
  components/ui.js          Card, PrimaryButton, StatusPill, EmptyState, FAB
  utils/format.js           currency/date helpers, calcTotal, makeId
  screens/
    products/               Xavier
    orders/                 Qian
    dashboard/              Sunudji
```

## 4. Run it

**In GitHub Codespaces (recommended for this course):**

```bash
npm install
npm run tunnel        # = expo start --tunnel
```

Scan the QR code with **Expo Go** on your phone. The tunnel is needed because a Codespace
is not on your phone's Wi-Fi network.

**On your own computer:** `npm install` then `npm start`, and scan the QR code (phone and computer on the same Wi-Fi).

Reset the data: call `resetToSeed()` from `useApp()` (e.g. from a temporary button), or clear the app's data in Expo Go.

## 5. Team workflow (Git)

1. `main` is protected by convention: **nobody commits straight to `main`.**
2. Each person works on a branch: `feature/products`, `feature/orders`, `feature/dashboard`.
3. Commit often with clear messages (the instructor and TA review commit history).
4. Open a Pull Request and have a teammate review before merging.
5. Only edit files outside your feature folder (e.g. `ui.js`, `AppContext.js`, `theme.js`) after telling the team — these are shared.

## 6. What we learned

_TODO (each member writes a short paragraph):_

- **Xavier:**
- **Qian:**
- **Sunudji:**

## 7. References

- Halder, S., & Chakraborty, S. P. (2026). Adoption and impact of POS systems in Kolkata's retail sector. _Advances in Social Science, Education and Humanities Research_, 91–113. https://doi.org/10.2991/978-2-38476-559-1_7
- Nielsen, J. (2026, August 20). _10 Usability heuristics for user interface design_. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/
- React Native. (2026, August 12). _Getting started_. https://reactnative.dev/docs/getting-started
