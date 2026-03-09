import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import AddIncomeScreen from '../screens/AddIncomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import GoalsScreen from '../screens/GoalsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import FuelCalculatorScreen from '../screens/FuelCalculatorScreen';
import WorkSessionsScreen from '../screens/WorkSessionsScreen';
import VehicleScreen from '../screens/VehicleScreen';
import PredictionsScreen from '../screens/PredictionsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import ShareAchievementScreen from '../screens/ShareAchievementScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function EmptyScreen() {
  return <View />;
}

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          position: 'absolute',
          elevation: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="الرئيسية"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="التقارير"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="إضافة"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={[styles.addButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="add" size={28} color="#000" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddIncome');
          },
        })}
      />
      <Tab.Screen
        name="الميزانية"
        component={GoalsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="حسابي"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AddIncome" component={AddIncomeScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Fuel" component={FuelCalculatorScreen} />
      <Stack.Screen name="WorkSessions" component={WorkSessionsScreen} />
      <Stack.Screen name="Vehicle" component={VehicleScreen} />
      <Stack.Screen name="Predictions" component={PredictionsScreen} />
      <Stack.Screen name="Alerts" component={AlertsScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="ShareAchievement" component={ShareAchievementScreen} />
      <Stack.Screen name="Admin" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}

function PlaceholderScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 48, right: 16, padding: 8 }}
      >
        <Ionicons name="arrow-forward" size={24} color={colors.foreground} />
      </TouchableOpacity>
      <Ionicons name="construct-outline" size={48} color={colors.muted} />
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <View style={{ backgroundColor: colors.accent, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <View>
              <View style={{ height: 4, width: 80, backgroundColor: colors.muted, borderRadius: 2, marginBottom: 4, opacity: 0.5 }} />
              <View style={{ height: 4, width: 60, backgroundColor: colors.muted, borderRadius: 2, opacity: 0.3 }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const [onboardingLoading, setOnboardingLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarding_done')
      .then((val) => setOnboardingDone(val === '1'))
      .catch(() => setOnboardingDone(false))
      .finally(() => setOnboardingLoading(false));
  }, []);

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_done', '1');
    } catch {
      // ignore
    }
    setOnboardingDone(true);
  };

  if (loading || onboardingLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="car-sport" size={48} color="#20df6c" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingDone ? (
        <RootStack.Screen name="Onboarding">
          {() => <OnboardingScreen onDone={finishOnboarding} />}
        </RootStack.Screen>
      ) : user ? (
        <RootStack.Screen name="App" component={AppStack} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, backgroundColor: '#112117', justifyContent: 'center', alignItems: 'center',
  },
  addButton: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#20df6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
