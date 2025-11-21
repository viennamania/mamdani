import React, { useState } from 'react';
import { cn, Input, InputProps } from 'rizzui';
import { PiCalendarBlank, PiCaretDownBold } from 'react-icons/pi';
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/esm/locale';
import { month } from 'date-arithmetic';



import './MyDatePickerStyles.css';



const calendarContainerClasses = {
  
  ///base: '[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md',

  
  
  base: '[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md ',


  //base2: '[&.react-datepicker]:w-80 [&.react-datepicker]:max-w-[400px] [&.react-datepicker]:z-50',
  
  /// &.react-datepicker__month-container]

          // font size change
          //'[&.react-datepicker__month-container>div]:text-xs',




  // change width of month cell

  // month cell size larger

  


    
  monthContainer: {

  





   
    // larger month ontainer

    
    // change font size of month container

    // font size change


   
    ////padding: '[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3',






    ///padding: '[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3 [&.react-datepicker>div]:w-[300px] [&.react-datepicker>div]:max-w-[400px] [&.react-datepicker>div]:h-[300px] ',





  /// &.react-datepicker__month-container]


  // .react-datepicker__month-container>div

    
  // larger month cell
  // change color to red of month cell

   
  


  
  
  ///cell: '[&.react-datepicker__month-container>div]:w-16 [&.react-datepicker__month-container>div]:h-16 [&.react-datepicker__month-container>div]:flex [&.react-datepicker__month-container>div]:items-center [&.react-datepicker__month-container>div]:justify-center [&.react-datepicker__month-container>div]:rounded-md [&.react-datepicker__month-container>div]:hover:bg-gray-100 [&.react-datepicker__month-container>div]:cursor-pointer',

  ///cell: '[&.react-datepicker__month-container>div]:w-10 [&.react-datepicker__month-container>div]:h-10 [&.react-datepicker__month-container>div]:flex [&.react-datepicker__month-container>div]:items-center [&.react-datepicker__month-container>div]:justify-center [&.react-datepicker__month-container>div]:rounded-md [&.react-datepicker__month-container>div]:hover:bg-gray-100 [&.react-datepicker__month-container>div]:cursor-pointer',



    // cell size larger
    grid: '[&.react-datepicker__month-container]:grid [&.react-datepicker__month-container]:grid-cols-2 [&.react-datepicker__month-container]:gap-2 [&.react-datepicker__month-container]:w-full',

     




    ////////text: '   [&.react-datepicker>div]:text-center [&.react-datepicker>div]:text-gray-700 [&.react-datepicker>div]:font-bold [&.react-datepicker>div]:text-lg',


    text: '  [&.react-datepicker>div]:text-center [&.react-datepicker>div]:text-gray-700 [&.react-datepicker>div]:font-bold [&.react-datepicker>div]:text-xs',



    //cell: '[&.react-datepicker__month-container>div]:w-[100px]  [&.react-datepicker__month-container>div]:flex [&.react-datepicker__month-container>div]:items-center [&.react-datepicker__month-container>div]:justify-center [&.react-datepicker__month-container>div]:rounded-md [&.react-datepicker__month-container>div]:hover:bg-gray-100 [&.react-datepicker__month-container>div]:cursor-pointer',
   


    // resize month cell
    //cell: '[&.react-datepicker__month-container>div]:w-[100px] [&.react-datepicker__month-container>div]:h-[100px] [&.react-datepicker__month-container>div]:flex [&.react-datepicker__month-container>div]:items-center [&.react-datepicker__month-container>div]:justify-center [&.react-datepicker__month-container>div]:rounded-md [&.react-datepicker__month-container>div]:hover:bg-gray-100 [&.react-datepicker__month-container>div]:cursor-pointer',


    /*
    .react-datepicker__month .react-datepicker__month-text {
      padding: 10px; 
    }
    */

    /*
    change padding of react-datepicker__month-text class

    .react-datepicker .react-datepicker__month-text {
      padding-left: 0px;
      padding-right: 0px;
    */

    //cell: '[&.react-datepicker__month-text>div]:p-[100px]',

    //cell: '[&.react-datepicker__month-wrapper>div]:pl-0 [&.react-datepicker__month-wrapper>div]:pr-0',
    
    //cell: '[&.react-datepicker__month-text>div]:pl-0 [&.react-datepicker__month-text>div]:pr-0',

  



    // month cell padding change

    //////cell: '[&.react-datepicker__month-container>div]:p-2 [&.react-datepicker__month-container>div]:flex [&.react-datepicker__month-container>div]:items-center [&.react-datepicker__month-container>div]:justify-center [&.react-datepicker__month-container>div]:rounded-md [&.react-datepicker__month-container>div]:hover:bg-gray-800 [&.react-datepicker__month-container>div]:cursor-pointer',

    //cell: '[&.react-datepicker>div]:p-2',

    //cell: '[&.react-datepicker>div]:p-2 [&.react-datepicker>div]:w-[300px] [&.react-datepicker>div]:h-[300px] [&.react-datepicker>div]:max-w-[400px] [&.react-datepicker>div]:max-h-[400px] [&.react-datepicker>div]:flex [&.react-datepicker>div]:items-center [&.react-datepicker>div]:justify-center [&.react-datepicker>div]:rounded-md [&.react-datepicker>div]:hover:bg-gray-800 [&.react-datepicker>div]:cursor-pointer',


    // change calendar month cell size




  },





};




const prevNextButtonClasses = {
  base: '[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7',
  border:
    '[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md',
  size: '[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]',
  children: {
    position: '[&.react-datepicker>button>span]:top-0',
    border:
      '[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400',
    size: '[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]',
  },
};

const timeOnlyClasses = {
  base: '[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28',
};

export interface DatePickerProps<selectsRange extends boolean | undefined>
  extends Omit<ReactDatePickerProps, 'selectsRange' | 'onChange'> {
  /** Pass function in onChange prop to handle selecting value */
  onChange(
    date: selectsRange extends false | undefined
      ? Date | null
      : [Date | null, Date | null],
    event: React.SyntheticEvent<any> | undefined
  ): void;
  /** Whether range selecting is enabled */
  selectsRange?: selectsRange;
  /** Pass input props to style input */
  inputProps?: InputProps;
}

export const DatePicker = ({
  customInput,
  showPopperArrow = false,
  /////dateFormat = 'd MMMM yyyy',
  dateFormat = 'yyyy-MM-dd',
  selectsRange = false,
  onCalendarOpen,
  onCalendarClose,
  inputProps,
  calendarClassName,
  ...props
}: DatePickerProps<boolean>) => {


  /* locale */
  const locale = ko;


  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const handleCalenderOpen = () => setIsCalenderOpen(true);

  const handleCalenderClose = () => {
    setIsCalenderOpen(false);
  }


  return (


    <div className={cn('[&_.react-datepicker-wrapper]:w-full')}>

      <ReactDatePicker

        open={isCalenderOpen}
        
        onInputClick={() => {

          ///console.log("onInputClick");

          // close datepicker
          if (isCalenderOpen) {


            ///setIsCalenderOpen(false);

            ///handleCalenderClose();

          }
          
        }}

        locale={locale}

        customInput={
          customInput || (
            <Input
              prefix={
                <PiCalendarBlank className="h-5 w-5 text-gray-500" />
              }
              suffix={
                <PiCaretDownBold
                  className={cn(
                    'h-4 w-4 text-gray-500 transition',
                    isCalenderOpen && 'rotate-180'
                    
                  )}

                  onClick={() => {

                    setIsCalenderOpen(!isCalenderOpen);

                  }}
                />
              }

              {...inputProps}
            />
          )
        }
        
        showPopperArrow={showPopperArrow}
        
        dateFormat={dateFormat}
        
        selectsRange={selectsRange}

        onCalendarOpen={onCalendarOpen || handleCalenderOpen}
        onCalendarClose={onCalendarClose || handleCalenderClose}

       
        
        calendarClassName={cn(


          calendarContainerClasses.base,


          ///calendarContainerClasses.monthContainer.padding,


          ///[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3'

       
          calendarContainerClasses.monthContainer.text,




          ///calendarContainerClasses.monthContainer.cell,





          

          ///calendarContainerClasses.monthContainer.cell,

          ///calendarContainerClasses.monthContainer.text,


          //calendarContainerClasses.monthContainer.grid,

          // month cell size larger

          //'[&.react-datepicker__month-container]:grid [&.react-datepicker__month-container]:grid-cols-2 [&.react-datepicker__month-container]:gap-2 [&.react-datepicker__month-container]:w-full',


          ///'[&.react-datepicker__month-container>div]:grid [&.react-datepicker__month-container>div]:grid-cols-7 [&.react-datepicker__month-container>div]:gap-1 [&.react-datepicker__month-container>div]:w-full',



          prevNextButtonClasses.base,
          prevNextButtonClasses.border,
          prevNextButtonClasses.size,
          prevNextButtonClasses.children.position,
          prevNextButtonClasses.children.border,
          prevNextButtonClasses.children.size,
          timeOnlyClasses.base,

          calendarClassName

        )}


        ///className="custom-datepicker"




        {...props}
      />
    </div>
  );
};
