import { Ref } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/shared/lib/tw-utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface DatePickerProps {
  ref?: Ref<HTMLButtonElement>;
  placeholder?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
}

export function DatePicker({ ref, placeholder = '날짜 선택', value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant={'outline'}
          className={cn('w-[240px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP', { locale: ko }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={ko}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
