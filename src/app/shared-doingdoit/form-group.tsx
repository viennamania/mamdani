import cn from '@/utils/class-names';

interface FormGroupProps {
  title: React.ReactNode;
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function FormGroup({
  title,
  className,
  description,
  children,
}: FormGroupProps) {
  return (
    <div className={cn('grid gap-0   @3xl:grid-cols-12    ', className)}>

      
        <div className="col-span-full @4xl:col-span-2 bg-gray-100 p-5  flex h-full   ">

          {/*
          <h4 className="text-base font-medium   ">{title}</h4>
          */}
          {/* text align center */}
          
          <div className="text-base font-medium ">{title}</div>

          {description && <p className="mt-2">{description}</p>}

        </div>


      {children && (
        <div className="col-span-full grid gap-4 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-7  p-5  ">
          {children}
        </div>
      )}

    </div>
  );
}
