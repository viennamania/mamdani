import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
  ],
  darkMode: ['class', '[data-theme="dark"]'],


  theme: {

    
    /*
    fontSize: {
      xs: '0.75rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      //xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    */
    
    /* figma */
    fontSize: {
      sm: "14px",
      "3xs": "10px",
      base: "16px",
      xs: "12px",
      "5xl": "24px",
      "7xs": "6px",
      xl: "20px",
      "13xl": "32px",
      "17xl": "36px",
      "9xl": "28px",
      "45xl": "64px",
      inherit: "inherit",


      //xs: '0.75rem',
      //sm: '0.8rem',
      //base: '1rem',
      lg: '1.25rem',
      //xl: '1.563rem',
      //xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      //'5xl': '3.052rem',
    },
  

    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px', // only need to control product grid mode in ultra 4k device
    },
    
    extend: {


      /* figma */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },


      colors: {


        /* figma color palette */
        white: "#fff",
        "grey-d": "#ddd",
        "grey-9": "#999",
        "grey-6": "#666",
        black: "#000",
        dark: "#212121",
        "grey-f1": "#f1f1f1",
        "grey-c": "#ccc",
        red: "#ff0000",
        "grey-e": "#eee",
        background: "#fff8ec",
        "orange-light": "#ffd8aa",
        /*
        gray: {
          "100": "#101010",
          "200": "rgba(255, 255, 255, 0.5)",
          "300": "rgba(0, 0, 0, 0.5)",
        },
        */
        "background-input": "#f5f5f5",

        bad: "#fe847a",
        std: "#fbe204",
        good: "#7ed95a",
        skyblue: "#7cd7fa",
        lightcoral: "#ff968d",
        burlywood: "#ffc38b",
        orange: "#ff820f",
        lawngreen: "#6cf437",
        limegreen: "#07b804",
        orange1: "#fbbc04",
        dodgerblue: "#4285f4",
        "input-bg": "#f5f5f9",

        ////////////////////////////////



        
        gray: {
          0: 'rgb(var(--gray-0) / <alpha-value>)',
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          1000: 'rgb(var(--gray-1000) / <alpha-value>)',
        },
        

        
        primary: {
          lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
          light: 'rgb(var(--primary-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--primary-default) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
        },
        secondary: {
          lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
          light: 'rgb(var(--secondary-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--secondary-default) / <alpha-value>)',
          dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
        },
        



        /*
        red: {
          lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
          light: 'rgb(var(--red-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },
        orange: {
          lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
          light: 'rgb(var(--orange-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark) / <alpha-value>)',
        },
        */
        blue: {
          lighter: 'rgb(var(--blue-lighter) / <alpha-value>)',
          light: 'rgb(var(--blue-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--blue-default) / <alpha-value>)',
          dark: 'rgb(var(--blue-dark) / <alpha-value>)',
        },
        green: {
          lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
          light: 'rgb(var(--green-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },
      },


      /* figma */
      spacing: {},

      borderRadius: {
        "81xl": "100px",
        xl: "20px",
        "41xl": "60px",
      },


      fontFamily: {

        /* figma */
        "menu-off": "'NanumSquare Neo'",
        montserrat: "Montserrat",
        jalnan: "Jalnan",
        //jalnan: "yg-jalnan",
        ///////////////////////////


        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],

        //noto-sans-kr: "Noto Sans KR",
        "noto-sans-kr": "'Noto Sans KR'",
      },


      // required these animations for the Loader component
      animation: {
        blink: 'blink 1.4s infinite both;',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'spin-slow': 'spin 4s linear infinite',
        popup: 'popup 500ms var(--popup-delay, 0ms) linear 1',
        skeleton: 'skeletonWave 1.6s linear 0.5s infinite',
        'spinner-ease-spin': 'spinnerSpin 0.8s ease infinite',
        'spinner-linear-spin': 'spinnerSpin 0.8s linear infinite',
      },

      /*
      backgroundImage: {
        skeleton: `linear-gradient(90deg,transparent,#ecebeb,transparent)`,
        'skeleton-dark': `linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)`,
      },
      */
      keyframes: {
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        popup: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        skeletonWave: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '50%': {
            /* +0.5s of delay between each loop */
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        spinnerSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      
      
      content: {
        underline: 'url("/public/underline.svg")',
      },

      boxShadow: {
        profilePic:
          '0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
      },
      

    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)');
    }),
  ],

} satisfies Config;
