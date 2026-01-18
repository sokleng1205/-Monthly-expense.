
import React, { useState } from 'react';
import { type Expense, ExpenseCategory } from '../types';
import { CATEGORY_CONFIG } from '../constants';
import { PlusCircleIcon } from './icons';

interface ExpenseFormProps {
  addExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.Food);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) {
      setError('Please fill in all fields.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    addExpense({
      description,
      amount: parsedAmount,
      category,
      date: new Date().toISOString(),
    });

    setDescription('');
    setAmount('');
    setCategory(ExpenseCategory.Food);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Add New Expense</h2>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-slate-200"
            placeholder="e.g., Coffee"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-slate-200"
            placeholder="e.g., 4.50"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-800 dark:text-slate-200"
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
