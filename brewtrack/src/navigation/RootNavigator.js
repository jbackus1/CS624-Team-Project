import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { useApp } from '../context/AppContext';
import { Loading } from '../components/ui';

import OrdersScreen from '../screens/orders/OrdersScreen';
import OrderFormScreen from '../screens/orders/OrderFormScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import ProductFormScreen from '../screens/products/ProductFormScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

/*
 * Navigation map
 *
 *  Bottom tabs
 *   ├─ Orders tab     (stack)  OrdersList -> OrderForm
 *   ├─ Products tab   (stack)  ProductsList -> ProductForm
 *   └─ Dashboard tab  (stack)  Dashboard
 *
 * Add new screens to the stack of the tab they belong to.
 * Navigate with:  navigation.navigate('OrderForm', { orderId })
 */

const Tab = createBottomTabNavigator();
const OrdersStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();

const stackOptions = {
  headerStyle: { backgroundColor: colors.espresso },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' },
  contentStyle: { backgroundColor: colors.cream },
};

function OrdersNavigator() {
  return (
    <OrdersStack.Navigator screenOptions={stackOptions}>
      <OrdersStack.Screen name="OrdersList" component={OrdersScreen} options={{ title: 'Orders' }} />
      <OrdersStack.Screen name="OrderForm" component={OrderFormScreen} options={{ title: 'New Order' }} />
    </OrdersStack.Navigator>
  );
}

function ProductsNavigator() {
  return (
    <ProductsStack.Navigator screenOptions={stackOptions}>
      <ProductsStack.Screen name="ProductsList" component={ProductsScreen} options={{ title: 'Products' }} />
      <ProductsStack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: 'Product' }} />
    </ProductsStack.Navigator>
  );
}

function DashboardNavigator() {
  return (
    <DashboardStack.Navigator screenOptions={stackOptions}>
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Sales Dashboard' }} />
    </DashboardStack.Navigator>
  );
}

const tabIcons = {
  OrdersTab: ['receipt', 'receipt-outline'],
  ProductsTab: ['cafe', 'cafe-outline'],
  DashboardTab: ['stats-chart', 'stats-chart-outline'],
};

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.cream, primary: colors.caramel },
};

export default function RootNavigator() {
  const { loading } = useApp();
  if (loading) return <Loading />;

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.caramel,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: { backgroundColor: colors.foam, borderTopColor: colors.border },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          tabBarIcon: ({ focused, color, size }) => {
            const [on, off] = tabIcons[route.name];
            return <Ionicons name={focused ? on : off} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="OrdersTab" component={OrdersNavigator} options={{ title: 'Orders' }} />
        <Tab.Screen name="ProductsTab" component={ProductsNavigator} options={{ title: 'Products' }} />
        <Tab.Screen name="DashboardTab" component={DashboardNavigator} options={{ title: 'Dashboard' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
