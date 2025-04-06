import { Ref } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { cn } from '@/shared/lib/tw-utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface DateRangePickerProps {
  ref?: Ref<HTMLButtonElement>;
  placeholder?: string;
  value?: DateRange;
  onChange?: (date?: DateRange) => void;
  className?: string;
}

export default function DateRangePicker({
  ref,
  placeholder = '날짜 선택',
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y', { locale: ko })} - {format(value.to, 'LLL dd, y', { locale: ko })}
                </>
              ) : (
                format(value.from, 'LLL dd, y', { locale: ko })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            locale={ko}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
