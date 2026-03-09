import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Storage: SecureStore for native, AsyncStorage for web
const isWeb = Platform.OS === 'web';

async function getToken(): Promise<string | null> {
  try {
    if (isWeb) {
      return await AsyncStorage.getItem('token');
    }
    return await SecureStore.getItemAsync('token');
  } catch {
    return null;
  }
}

async function setToken(token: string): Promise<void> {
  if (isWeb) {
    await AsyncStorage.setItem('token', token);
  } else {
    await SecureStore.setItemAsync('token', token);
  }
}

async function removeToken(): Promise<void> {
  if (isWeb) {
    await AsyncStorage.removeItem('token');
  } else {
    await SecureStore.deleteItemAsync('token');
  }
}

// API URL configuration
// You can override this without code changes using EXPO_PUBLIC_API_URL.
// Examples:
// - Web: http://localhost:3000
// - Android Emulator: http://10.0.2.2:3000
// - Physical device on same Wi‑Fi: http://192.168.1.X:3000
const ENV_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL =
  ENV_BASE_URL && ENV_BASE_URL.length > 0
    ? ENV_BASE_URL
    : isWeb
      ? 'http://localhost:3000'
      : 'http://10.0.2.2:3000';

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function apiRequest<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = await getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  config.signal = controller.signal;

  const res = await fetch(`${BASE_URL}/api${endpoint}`, config);
  clearTimeout(timeoutId);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'حدث خطأ في السيرفر');
  }

  return data;
}

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await apiRequest<{ success: boolean; user: any; token?: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.token) {
      await setToken(data.token);
    }
    return data;
  },

  register: async (name: string, email: string, password: string) => {
    const data = await apiRequest<{ success: boolean; user: any; token?: string }>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    if (data.token) {
      await setToken(data.token);
    }
    return data;
  },

  me: async () => {
    return apiRequest<{ user: any }>('/auth/me');
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch { }
    await removeToken();
  },

  updateProfile: async (body: any) => {
    return apiRequest('/auth/profile', { method: 'PUT', body });
  },

  resetPassword: async (email: string) => {
    return apiRequest('/auth/reset-password', { method: 'POST', body: { email } });
  },
};

// Income APIs
export const incomeAPI = {
  getAll: () => apiRequest<any[]>('/incomes'),
  add: (entries: { date: string; company: string; amount: number; notes: string }[]) =>
    apiRequest('/incomes', { method: 'POST', body: entries }),
  update: (id: number, data: { date?: string; company?: string; amount?: number; notes?: string }) =>
    apiRequest('/incomes', { method: 'PUT', body: { id, ...data } }),
  delete: (id: number) =>
    apiRequest('/incomes', { method: 'DELETE', body: { id } }),
};

// Expense APIs
export const expenseAPI = {
  getAll: () => apiRequest<any[]>('/expenses'),
  add: (entry: { date: string; category: string; customCategory?: string; amount: number; notes: string }) =>
    apiRequest('/expenses', { method: 'POST', body: entry }),
  update: (id: number, data: { date?: string; category?: string; customCategory?: string; amount?: number; notes?: string }) =>
    apiRequest('/expenses', { method: 'PUT', body: { id, ...data } }),
  delete: (id: number) =>
    apiRequest('/expenses', { method: 'DELETE', body: { id } }),
};

// Companies API
export const companiesAPI = {
  getAll: () => apiRequest<any[]>('/companies'),
};

// Goals APIs
export const goalsAPI = {
  getAll: () => apiRequest<any[]>('/goals'),
  save: (month: string, targetAmount: number) =>
    apiRequest('/goals', { method: 'POST', body: { month, targetAmount } }),
  delete: (id: number) =>
    apiRequest('/goals', { method: 'DELETE', body: { id } }),
};

// Notifications APIs
export const notificationsAPI = {
  getAll: () => apiRequest<any[]>('/notifications'),
  markRead: (id: number) =>
    apiRequest('/notifications', { method: 'PUT', body: { id } }),
};

// Work Sessions APIs
export const workSessionsAPI = {
  getAll: () => apiRequest<any[]>('/work-sessions'),
  create: (data: { date: string; startTime: string; endTime?: string; company: string; notes?: string }) =>
    apiRequest('/work-sessions', { method: 'POST', body: data }),
  update: (id: number, data: any) =>
    apiRequest('/work-sessions', { method: 'PUT', body: { id, ...data } }),
  delete: (id: number) =>
    apiRequest('/work-sessions', { method: 'DELETE', body: { id } }),
};

// Vehicles APIs
export const vehiclesAPI = {
  getAll: () => apiRequest<any[]>('/vehicles'),
  create: (data: any) => apiRequest('/vehicles', { method: 'POST', body: data }),
  update: (id: number, data: any) => apiRequest('/vehicles', { method: 'PUT', body: { id, ...data } }),
  delete: (id: number) => apiRequest('/vehicles', { method: 'DELETE', body: { id } }),
};

// Maintenance APIs
export const maintenanceAPI = {
  getAll: () => apiRequest<any[]>('/maintenance'),
  update: (id: number, data: any) => apiRequest('/maintenance', { method: 'PUT', body: { id, ...data } }),
};

// Ads APIs
export const adsAPI = {
  getAll: () => apiRequest<any[]>('/ads'),
};

export { getToken, setToken, removeToken, BASE_URL };
