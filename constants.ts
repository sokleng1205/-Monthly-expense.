
import { ExpenseCategory } from './types';
import { UtensilsIcon, CarIcon, HomeIcon, ZapIcon, FilmIcon, HeartPulseIcon, ShoppingCartIcon, TagIcon } from './components/icons';
import React from 'react';

export const CATEGORY_CONFIG: Record<ExpenseCategory, { icon: React.FC<{className?: string}>, color: string }> = {
    [ExpenseCategory.Food]: { icon: UtensilsIcon, color: 'bg-emerald-500' },
    [ExpenseCategory.Transport]: { icon: CarIcon, color: 'bg-blue-500' },
    [ExpenseCategory.Housing]: { icon: HomeIcon, color: 'bg-orange-500' },
    [ExpenseCategory.Utilities]: { icon: ZapIcon, color: 'bg-yellow-500' },
    [ExpenseCategory.Entertainment]: { icon: FilmIcon, color: 'bg-purple-500' },
    [ExpenseCategory.Health]: { icon: HeartPulseIcon, color: 'bg-red-500' },
    [ExpenseCategory.Shopping]: { icon: ShoppingCartIcon, color: 'bg-pink-500' },
    [ExpenseCategory.Other]: { icon: TagIcon, color: 'bg-slate-500' },
};

export const CATEGORY_CHART_COLORS: Record<ExpenseCategory, string> = {
    [ExpenseCategory.Food]: '#10b981',
    [ExpenseCategory.Transport]: '#3b82f6',
    [ExpenseCategory.Housing]: '#f97316',
    [ExpenseCategory.Utilities]: '#eab308',
    [ExpenseCategory.Entertainment]: '#a855f7',
    [ExpenseCategory.Health]: '#ef4444',
    [ExpenseCategory.Shopping]: '#ec4899',
    [ExpenseCategory.Other]: '#64748b',
};
