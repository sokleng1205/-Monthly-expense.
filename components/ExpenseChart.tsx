
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { type Expense, ExpenseCategory } from '../types';
import { CATEGORY_CHART_COLORS } from '../constants';
import { ChartPieIcon } from './icons';

interface ExpenseChartProps {
  expenses: Expense[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
        <p className="font-bold text-slate-800 dark:text-slate-100">{`${payload[0].name}`}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{`Amount: $${payload[0].value.toFixed(2)}`}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{`Percentage: ${(payload[0].percent * 100).toFixed(0)}%`}</p>
      </div>
    );
  }
  return null;
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    const dataByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    return Object.entries(dataByCategory).map(([name, value]) => ({
      name: name as ExpenseCategory,
      value,
    }));
  }, [expenses]);

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Spending by Category</h2>
      <div style={{ width: '100%', height: 300 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
                cornerRadius={8}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_CHART_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ChartPieIcon className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-slate-500 dark:text-slate-400">No data to display.</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">Your spending chart will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
