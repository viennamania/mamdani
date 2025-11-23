import { Metadata } from 'next';

import logoImg from '@public/logo.svg';

import { LAYOUT_OPTIONS } from '@/config/enums';

import logoIconImg from '@public/logo-short.svg';

import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: '원클릭',
  description: `원클릭`,
  logo: logoImg,
  icon: logoIconImg,
  
  mode: MODE.LIGHT,

  ///layout: LAYOUT_OPTIONS.HYDROGEN,
  layout: LAYOUT_OPTIONS.HELIUM,

  //layout: LAYOUT_OPTIONS.BERYLLIUM,


  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - 원클릭` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - 원클릭` : title,
      description,
      url: 'https://cryptoss.beauty',
      siteName: '원클릭', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://cryptoss.beauty/logo.webp',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
