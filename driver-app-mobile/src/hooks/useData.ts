import { useState, useEffect, useCallback } from 'react';
import { incomeAPI, expenseAPI, companiesAPI } from '../services/api';

export interface Income {
  id: number;
  date: string;
  company: string;
  amount: number;
  notes: string | null;
  createdAt: string;
}

export interface Expense {
  id: number;
  date: string;
  category: string;
  customCategory: string | null;
  amount: number;
  notes: string | null;
  createdAt: string;
}

export function useIncomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await incomeAPI.getAll();
      setIncomes(data);
    } catch (err) {
      console.error('Failed to fetch incomes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addIncome = async (entry: { date: string; company: string; amount: number; notes: string }) => {
    try {
      await incomeAPI.add([entry]);
      await refresh();
      return true;
    } catch { return false; }
  };

  const addIncomes = async (entries: { date: string; company: string; amount: number; notes: string }[]) => {
    try {
      await incomeAPI.add(entries);
      await refresh();
      return true;
    } catch { return false; }
  };

  const updateIncome = async (id: number, data: { date?: string; company?: string; amount?: number; notes?: string }) => {
    try {
      await incomeAPI.update(id, data);
      await refresh();
      return true;
    } catch { return false; }
  };

  const deleteIncome = async (id: number) => {
    try {
      await incomeAPI.delete(id);
      await refresh();
      return true;
    } catch { return false; }
  };

  return { incomes, loading, refresh, addIncome, addIncomes, updateIncome, deleteIncome };
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await expenseAPI.getAll();
      setExpenses(data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addExpense = async (entry: { date: string; category: string; customCategory?: string; amount: number; notes: string }) => {
    try {
      await expenseAPI.add(entry);
      await refresh();
      return true;
    } catch { return false; }
  };

  const updateExpense = async (id: number, data: { date?: string; category?: string; customCategory?: string; amount?: number; notes?: string }) => {
    try {
      await expenseAPI.update(id, data);
      await refresh();
      return true;
    } catch { return false; }
  };

  const deleteExpense = async (id: number) => {
    try {
      await expenseAPI.delete(id);
      await refresh();
      return true;
    } catch { return false; }
  };

  return { expenses, loading, refresh, addExpense, updateExpense, deleteExpense };
}

export interface Company {
  id: string;
  name: string;
  nameAr?: string | null;
  color?: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await companiesAPI.getAll();
      setCompanies(data);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { companies, loading, refresh };
}
