
import React from 'react';
import { type Expense } from '../types';
import { CATEGORY_CONFIG } from '../constants';
import { TrashIcon, CalendarDaysIcon } from './icons';

interface ExpenseListProps {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
}

const ExpenseItem: React.FC<{ expense: Expense; onDelete: (id: string) => void; }> = ({ expense, onDelete }) => {
    const { icon: Icon, color } = CATEGORY_CONFIG[expense.category];

    return (
        <li className="flex items-center space-x-4 p-3 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{expense.description}</p>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2">
                   <p>{expense.category}</p>
                   <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                   <p>{new Date(expense.date).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="font-bold text-lg text-slate-900 dark:text-white">${expense.amount.toFixed(2)}</p>
            </div>
            <button
                onClick={() => onDelete(expense.id)}
                className="ml-2 p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors"
                aria-label="Delete expense"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </li>
    )
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, deleteExpense }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Recent Transactions</h2>
      {expenses.length === 0 ? (
        <div className="text-center py-10">
            <CalendarDaysIcon className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-slate-500 dark:text-slate-400">No expenses this month.</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">Add a new transaction to get started.</p>
        </div>

      ) : (
        <ul className="divide-y divide-slate-200 dark:divide-slate-700 -mx-3">
          {expenses
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((expense) => (
               <ExpenseItem key={expense.id} expense={expense} onDelete={deleteExpense} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
