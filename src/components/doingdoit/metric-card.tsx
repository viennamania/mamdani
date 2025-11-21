'use client';

import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';

const metricCardClasses = {
  base: 'border border-gray-200 bg-gray-0 p-5 dark:bg-gray-50 lg:p-6',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type MetricCardTypes = {
  title: string;
  subtitle1: string;
  subtitle2: string;
  metric: React.ReactNode;
  metric1: React.ReactNode;
  metric2: React.ReactNode;
  metric3: React.ReactNode;
  metric4: React.ReactNode;
  icon?: React.ReactNode;
  iconClassName?: string;
  contentClassName?: string;
  chart?: React.ReactNode;
  info?: React.ReactNode;
  rounded?: keyof typeof metricCardClasses.rounded;
  titleClassName?: string;
  metricClassName?: string;
  chartClassName?: string;
  className?: string;
};

export default function MetricCard({
  title,
  subtitle1,
  subtitle2,
  metric,
  metric1,
  metric2,
  metric3,
  metric4,
  icon,
  chart,
  info,
  rounded = 'DEFAULT',
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  metricClassName,
  chartClassName,
  children,
}: React.PropsWithChildren<MetricCardTypes>) {
  
  return (
    <div
      className={cn(
        metricCardClasses.base,
        metricCardClasses.rounded[rounded],
        className
      )}
    >
      <div className="flex  flex-col items-center justify-between  ">

        <div className="flex flex-row items-center justify-start w-full ">

          {icon ? (
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-lg bg-gray-100',
                iconClassName
              )}
            >
              {icon}
            </div>
          ) : null}

          <div className={cn(icon && 'ps-3', contentClassName)}>
            <Text className={cn(' text-gray-900', titleClassName)}>
              {title}
            </Text>
          </div>
          
        </div>

        <div className='flex flex-col items-center justify-center gap-3'>
          
          <div className='flex flex-col items-between justify-center gap-1'>
        


                {/*
            <table className='table-auto w-2/3  border '>

              <thead
              className=' border-b border-gray-200  '
              >
                <tr>
                  <th className='w-1/3'></th>
                  <th className='w-1/3'>{subtitle1}</th>
                  <th className='w-1/3'>{subtitle2}</th>
                </tr>
              </thead>
              <tbody className='  '  >

                <tr
                  className=' border-b border-gray-200'
                >
                  <td className='text-gray-900'>오늘</td>
                  <td className='text-gray-900'>{metric1}</td>
                  <td className='text-gray-900'>{metric2}</td>
                </tr>
                <tr
                  className=' border-b border-gray-200'
                >
                  <td className='text-gray-900'>누적</td>
                  <td className='text-gray-900'>{metric3}</td>
                  <td className='text-gray-900'>{metric4}</td>
                </tr>
              </tbody>  
            </table>
                */}




            
            <div className='mt-5 grid grid-cols-3 gap-10   '>
              
              <span className='text-gray-900'></span>
              <span className='text-gray-900 text-center '>{subtitle1}</span>
              <span className='text-gray-900 text-center'>{subtitle2}</span>

            </div>
            {/* under line */}
            <div className='mt-1 grid grid-cols-3 gap-10  '>
              <div className=''></div>
              <div className='border-b border-gray-200'></div>
              <div className='border-b border-gray-200'></div>
            </div>


            <div className='mt-5 grid grid-cols-3 gap-10  '>

              <div className='flex flex-col items-center justify-center gap-1 '>
                오늘
              </div>

              <div className='flex flex-row items-center justify-end gap-1'>
                
                <Text
                  className={cn(
                    ' font-lexend text-2xl font-semibold text-gray-900 dark:text-gray-700 2xl:xl:text-3xl',
                    metricClassName
                  )}
                >
                  {metric1}
                </Text>
              </div>

              <div className='flex flex-row items-center justify-end gap-1'>
                
                <Text
                  className={cn(
                    'font-lexend text-2xl font-semibold text-gray-900 dark:text-gray-700 2xl:xl:text-3xl',
                    metricClassName
                  )}
                >
                  {metric2}
                </Text>
              </div>
              
            </div>

            <div className='mt-5 grid grid-cols-3 gap-10   '>

              <div className='flex flex-col items-center justify-center gap-1'>
                누적
              </div>

              <div className='flex flex-row items-center justify-end gap-1'>
                
                <Text
                  className={cn(
                    'font-lexend text-2xl font-semibold text-gray-900 dark:text-gray-700 2xl:xl:text-3xl',
                    metricClassName
                  )}
                >
                  {metric3}
                </Text>
              </div>

              <div className='flex flex-row items-center justify-end gap-1'>
               
                <Text
                  className={cn(
                    'font-lexend text-2xl font-semibold text-gray-900 dark:text-gray-700 2xl:xl:text-3xl',
                    metricClassName
                  )}
                >
                  {metric4}
                </Text>
              </div>

            </div>

            {info ? info : null}


          </div>
        </div>

        {/*
        {chart ? (
          <div className={cn('h-12 w-20', chartClassName)}>{chart}</div>
        ) : null}
        */}

      </div>

        
      {children}
        

    </div>
  );
}
