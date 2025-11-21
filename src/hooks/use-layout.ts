'use client';

import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { set } from 'lodash';

// localStorage


// 1. set initial atom for isomorphic layout
const isomorphicLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('isomorphic-layout')
    : LAYOUT_OPTIONS.HYDROGEN
);

const isomorphicLayoutAtomWithPersistence = atom(
  (get) => get(isomorphicLayoutAtom),
  (get, set, newStorage: any) => {
    set(isomorphicLayoutAtom, newStorage);

    typeof window !== 'undefined' &&
      localStorage.setItem('isomorphic-layout', newStorage);

  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(isomorphicLayoutAtomWithPersistence);


  ///setLayout(LAYOUT_OPTIONS.HYDROGEN);
  //setLayout(LAYOUT_OPTIONS.BERYLLIUM);

  setLayout(LAYOUT_OPTIONS.HELIUM);

  //setLayout(LAYOUT_OPTIONS.LITHIUM);

  
  return {
    
    layout: layout === null ? LAYOUT_OPTIONS.HYDROGEN : layout,

    setLayout,
  };
}
