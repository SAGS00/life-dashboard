import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DollarSign, Plus, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { Expense } from '../types';
import { getToday, getMonthName } from '../utils/dates';
import { Cell, Pie, PieChart as RechartsPie, ResponsiveContainer, Tooltip } from 'recharts';

type FinanceTrackerProps = {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
};

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health & Fitness',
  'Education',
  'Other',
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export function FinanceTracker({ expenses, onAddExpense }: FinanceTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: categories[0],
    description: '',
    type: 'expense' as const,
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses.filter(e => {
    const date = new Date(e.date);
    return date.getMonth() === currentMonth && 
           date.getFullYear() === currentYear &&
           e.type === 'expense';
  });

  const monthlyIncome = expenses.filter(e => {
    const date = new Date(e.date);
    return date.getMonth() === currentMonth && 
           date.getFullYear() === currentYear &&
           e.type === 'income';
  });

  const totalExpenses = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = monthlyIncome.reduce((sum, e) => sum + e.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const categoryData = categories.map(cat => {
    const total = monthlyExpenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: cat, value: total };
  }).filter(d => d.value > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.amount && parseFloat(newExpense.amount) > 0) {
      onAddExpense({
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: getToday(),
        type: newExpense.type,
      });
      setNewExpense({ amount: '', category: categories[0], description: '', type: 'expense' });
      setIsOpen(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          <h2 className="text-xl">Finance Tracker</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newExpense.type}
                  onValueChange={(value: 'income' | 'expense') => 
                    setNewExpense({ ...newExpense, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              <Button type="submit" className="w-full">Add Transaction</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Income</span>
          </div>
          <p className="text-2xl">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-1">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm">Expenses</span>
          </div>
          <p className="text-2xl">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg ${netBalance >= 0 ? 'bg-blue-50 dark:bg-blue-950' : 'bg-orange-50 dark:bg-orange-950'}`}>
          <div className={`flex items-center gap-2 mb-1 ${netBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
            <PieChart className="h-4 w-4" />
            <span className="text-sm">Net</span>
          </div>
          <p className="text-2xl">${Math.abs(netBalance).toFixed(2)}</p>
        </div>
      </div>

      {categoryData.length > 0 && (
        <div className="h-64">
          <h3 className="text-sm mb-2">{getMonthName(new Date())} Spending by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
      )}

      {monthlyExpenses.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm">Recent Transactions</h3>
          {monthlyExpenses.slice(0, 5).map((expense) => (
            <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <p>{expense.description || expense.category}</p>
                <p className="text-sm text-muted-foreground">{expense.category}</p>
              </div>
              <p className="text-red-600 dark:text-red-400">-${expense.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
