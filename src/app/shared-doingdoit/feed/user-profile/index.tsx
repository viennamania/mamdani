'use client';

import { Title } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import RatingFilter from './rating-filter';
import PriceFilter from './price-filter';
import GenderSpecificFilter from './gender-specific-filter';
import { useFilterControls } from '@/hooks/use-filter-control';
import {
  initialState,
  categoriesData,
  brandsData,
  colorsData,
} from './filter-utils';
import FilterWithSearch from '@/components/filter-with-search';
import { PiXBold } from 'react-icons/pi';
import hasSearchedParams from '@/utils/has-searched-params';


import ProfileHeader from '@/app/shared-doingdoit/profile/profile-header';
import ProfileDetails from '@/app/shared-doingdoit/profile/user-details';



export type ProfileDetailsTypes = {
  id: string;
};



export default function UserProfile({
  id,
}: React.PropsWithChildren<ProfileDetailsTypes>) {

//export default function UserProfile() {


  const { state, applyFilter, clearFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  const { closeDrawer } = useDrawer();


  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
        <Title as="h5" className="font-semibold">
          회원정보
        </Title>
        <ActionIcon
          variant="outline"
          onClick={() => closeDrawer()}
          className="border-0 p-0"
        >
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <div className="custom-scrollbar h-[calc(100vh-136px)] space-y-9 overflow-y-auto px-5 py-6">



        {/*
        <GenderSpecificFilter state={state} applyFilter={applyFilter} />
        <FilterWithSearch
          title="Category"
          name="categories"
          data={categoriesData}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <FilterWithSearch
          title="Brand"
          name="brands"
          data={brandsData}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <FilterWithSearch
          title="Color"
          name="colors"
          data={colorsData}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <PriceFilter state={state} applyFilter={applyFilter} />
        <RatingFilter state={state} applyFilter={applyFilter} />
        */}

      <div className="@container">
        <ProfileHeader id={id}/>
        <ProfileDetails id={id}/>
      </div>

      </div>



    </>
  );
}
