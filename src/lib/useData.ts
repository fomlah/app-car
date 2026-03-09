'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Company {
  id: number;
  name: string;
  nameAr: string;
  logo: string | null;
  color: string;
  commission: number;
}

interface Income {
  id: number;
  date: string;
  company: string;
  amount: number;
  notes: string | null;
  createdAt: string;
}

interface Expense {
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
      const res = await fetch('/api/incomes');
      if (res.ok) {
        const data = await res.json();
        setIncomes(data);
      }
    } catch (err) {
      console.error('Failed to fetch incomes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addIncomes = async (entries: { date: string; company: string; amount: number; notes: string }[]) => {
    const res = await fetch('/api/incomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entries),
    });
    if (res.ok) await refresh();
    return res.ok;
  };

  const deleteIncome = async (id: number) => {
    const res = await fetch('/api/incomes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await refresh();
    return res.ok;
  };

  const updateIncome = async (id: number, data: { date?: string; company?: string; amount?: number; notes?: string }) => {
    const res = await fetch('/api/incomes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (res.ok) await refresh();
    return res.ok;
  };

  return { incomes, loading, refresh, addIncomes, deleteIncome, updateIncome };
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/expenses');
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addExpense = async (entry: { date: string; category: string; customCategory?: string; amount: number; notes: string }) => {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (res.ok) await refresh();
    return res.ok;
  };

  const deleteExpense = async (id: number) => {
    const res = await fetch('/api/expenses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await refresh();
    return res.ok;
  };

  const updateExpense = async (id: number, data: { date?: string; category?: string; customCategory?: string; amount?: number; notes?: string }) => {
    const res = await fetch('/api/expenses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (res.ok) await refresh();
    return res.ok;
  };

  return { expenses, loading, refresh, addExpense, deleteExpense, updateExpense };
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/companies');
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
      }
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { companies, loading, refresh };
}
