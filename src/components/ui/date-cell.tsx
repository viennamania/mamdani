import cn from '@/utils/class-names';
import { formatDate } from '@/utils/format-date';

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
}


export default function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  
  //dateFormat = 'MMMM D, YYYY',
  dateFormat = 'YYYY-MM-DD',

  //timeFormat = 'h:mm A',
  timeFormat = 'HH:mm:ss',
  
}: DateCellProps) {

  
  /*
  return (

    <div className={cn(className, 'grid gap-1')}>

      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('font-medium text-gray-700', dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>
      <time
        dateTime={formatDate(date, 'HH:mm:ss')}
        className={cn('text-[13px] text-gray-500', timeClassName)}
      >
        {formatDate(date, timeFormat)}
      </time>

    </div>

  );
  */


  
  return (

    <div className={cn(className, '  flex flex-wrap items-center justify-center gap-2')}>

      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('', dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>
      <time
        dateTime={formatDate(date, 'HH:mm:ss')}
        className={cn('', timeClassName)}
      >
        {formatDate(date, timeFormat)}
      </time>

    </div>

  );
  


}


