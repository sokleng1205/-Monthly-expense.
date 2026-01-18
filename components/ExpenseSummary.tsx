
import React, { useMemo } from 'react';
import { type Expense } from '../types';
import { CreditCardIcon } from './icons';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return (
    <div className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-lg text-sky-100">Total Expenses (This Month)</p>
                <p className="text-4xl font-bold tracking-tight">
                    ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
            <CreditCardIcon className="h-12 w-12 text-sky-200 opacity-75"/>
        </div>
    </div>
  );
};

export default ExpenseSummary;
