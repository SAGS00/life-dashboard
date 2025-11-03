import { getDailyQuote } from '../utils/quotes';
import { Card } from './ui/card';
import { Sparkles } from 'lucide-react';

export function QuoteWidget() {
  const quote = getDailyQuote();

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800">
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
        <p className="italic text-purple-900 dark:text-purple-100">
          "{quote}"
        </p>
      </div>
    </Card>
  );
}
