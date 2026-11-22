# BrewTrack

BrewTrack is a React Native and Expo app for small coffee shops and bakeries. It brings menu management, order tracking, and sales reporting into one app. Product and order records are stored on the device with AsyncStorage.

CS624 Full Stack Development – Mobile Application · City University of Seattle

## Features and contributors

| Contributor | Module | What it covers |
| --- | --- | --- |
| Xavier Backus | Product Management | Manage menu items, prices, and availability. |
| Qian Zhou | Order Management | Create orders, calculate totals, and track orders through New, Preparing, Ready, and Completed. |
| Sunidhi Hegde | Sales Dashboard | Filter orders by Today, 7 Days, or All and view total orders, order counts by status, revenue, average order value, and the top five bestsellers. See [dashboard PR #2](https://github.com/jbackus1/CS624-Team-Project/pull/2). |

Revenue, average order value, and bestsellers are calculated from completed orders in the selected date range. Total orders and status counts include every order in that range.

## Run the app

The app source is in [brewtrack/](brewtrack/). From the repository root, run:

```bash
cd brewtrack
npm install
npm start
```

