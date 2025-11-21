'use client';

/*
import StorageReport from '@/app/shared/file/dashboard/storage-report';
import FileStats from '@/app/shared/file/dashboard/file-stats';
import StorageSummary from '@/app/shared/file/dashboard/storage-summary';
import RecentFiles from '@/app/shared/file/dashboard/recent-files';
import QuickAccess from '@/app/shared/file/dashboard/quick-access';
import ActivityReport from '@/app/shared/file/dashboard/activity-report';
import Members from '@/app/shared/file/dashboard/members';
import FileListTable from '@/app/shared/file/dashboard/file-list/table';
import UpgradeStorage from '@/app/shared/file/dashboard/upgrade-storage';
import RecentActivities from '@/app/shared/file/dashboard/recent-activities';
import { allFilesData } from '@/data/all-files';
*/

import cn from '@/utils/class-names';
import { Title } from '@/components/ui/text';

import MetricCardsWithIcon from './stat-cards';

import UserMetrics from './user-metrics';
import PageViewMetrics from './pageview-metrics';




function SectionBlock({
  title,
  titleClassName,
  children,
  className,
}: React.PropsWithChildren<{
  title?: string;
  titleClassName?: string;
  className?: string;
}>) {

  return (
    <section className={className}>
      <header className="mb-2.5 lg:mb-3">
        <Title
          as="h5"
          className={cn(
            'mb-2 text-sm font-normal text-gray-700 sm:text-base',
            titleClassName
          )}
        >
          {title}
        </Title>
      </header>

      {children}
    </section>
  );

}




export default function Dashboard() {



  

  return (
    <div className="mt-2 @container ">

      <SectionBlock title={''}  >
        <MetricCardsWithIcon
          className="@2xl:grid-cols-2 @6xl:grid-cols-3 4xl:gap-8 "
        />
      </SectionBlock>

      <UserMetrics className=" mt-10 @4xl:col-span-2 @7xl:col-span-12" />

      <PageViewMetrics className="mt-10 @4xl:col-span-2 @7xl:col-span-12" />


      
      {/*

      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12" />

        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <TopTrafficSource className="@7xl:col-span-4" />

        <UserMetrics className="@4xl:col-span-2 @7xl:col-span-12" />

        <ConversionRates className="@7xl:col-span-6 @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <GoalAccomplished className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-6 @7xl:col-start-auto @7xl:row-start-auto @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <PageMetrics className="@4xl:col-span-2 @4xl:row-start-5 @7xl:col-span-12 @7xl:row-start-auto @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <AccountRetention className="@7xl:col-span-12 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <WebsiteMetrics className="@4xl:col-span-2 @7xl:col-span-12" />
      </div>

      */}
       
    </div>
  );
}
