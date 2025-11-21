
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';


import Head from 'next/head';

import Script from 'next/script';



export type NextPageWithLayout<P = {}> = NextPage<P> & {
    authorization?: boolean;
    getLayout?: (page: ReactElement) => ReactNode;
};



type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};



declare global {
    interface Window {
        Kakao: any;
    }
}




function MyApp({ Component, pageProps }: AppPropsWithLayout) {


    const pageid = pageProps?.pageid;

    console.log('pageid', pageid);


    const title = 'Doingdoit';
    const description = 'Doingdoit';
    const image = 'https://doingdoit.com/logo.png';



    //could remove this if you don't need to page level layout
    const getLayout = Component.getLayout ?? ((page) => page);



    return (
        <>

            <Head>


                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover" />
              
                {/*
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                */}
                
                {/*
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1 maximum-scale=1"
                />
                */}
                
                
                <meta property="og:type" content="website"></meta>

                <meta property="og:site_name" content={title}></meta>
                <meta name="twitter:card" content="summary_large_image"></meta>

                <meta property="og:image:width" content="1400"></meta>
                <meta property="og:image:height" content="1400"></meta>

                <meta property="og:title" content={title}></meta>
                <meta property="og:description" content={description}></meta>
                <meta property="og:image" content={image}></meta>

                <meta name="twitter:image" content={image}></meta>

                <title>{title}</title>
            </Head>
            
            
            
            {getLayout(<Component {...pageProps} />)}


            
        </>
    );
    



}


export default MyApp;