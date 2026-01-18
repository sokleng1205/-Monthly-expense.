
import React, { useState, useMemo, useCallback } from 'react';
import { type Expense, type ExpenseCategory } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseChart from './components/ExpenseChart';
import { WalletIcon } from './components/icons';

const App: React.FC = () => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setExpenses(prevExpenses => [...prevExpenses, { ...expense, id: crypto.randomUUID() }]);
  }, [setExpenses]);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, [setExpenses]);

  const monthlyExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  }, [expenses, currentMonth, currentYear]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <header className="bg-white dark:bg-slate-800/50 shadow-sm sticky top-0 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <WalletIcon className="h-8 w-8 text-sky-500" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Expense Tracker
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExpenseSummary expenses={monthlyExpenses} />
            <ExpenseChart expenses={monthlyExpenses} />
          </div>
          <div className="space-y-8">
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={monthlyExpenses} deleteExpense={deleteExpense} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
