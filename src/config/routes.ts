import { profile } from "console";
import { stat } from "fs";

export const routes = {
  eCommerce: {
    dashboard: '/ecommerce',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: '/ecommerce/orders',
    createOrder: '/ecommerce/orders/create',
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: '/ecommerce/reviews',
    shop: '/ecommerce/shop',
    cart: '/ecommerce/cart',
    checkout: '/ecommerce/checkout',
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  support: {
    dashboard: '/support',
    inbox: '/support/inbox',
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: '/support/snippets',
    createSnippet: '/support/snippets/create',
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: '/support/templates',
    createTemplate: '/support/templates/create',
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/shipments',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/shipments/create',
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  
  analytics: '/analytics',

  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },

  pos: {
    index: '/point-of-sale',
  },
  eventCalendar: '/event-calendar',
  rolesPermissions: '/roles-permissions',
  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
  },
  widgets: {
    cards: '/widgets/cards',
    icons: '/widgets/icons',
    charts: '/widgets/charts',
    maps: '/widgets/maps',
    banners: '/widgets/banners',
  },
  tables: {
    basic: '/tables/basic',
    collapsible: '/tables/collapsible',
    enhanced: '/tables/enhanced',
    pagination: '/tables/pagination',
    search: '/tables/search',
    stickyHeader: '/tables/sticky-header',
  },
  multiStep: '/multi-step',
  forms: {
    profileSettings: '/forms/profile-settings',
    notificationPreference: '/forms/profile-settings/notification',
    personalInformation: '/forms/profile-settings/profile',
    newsletter: '/forms/newsletter',
  },
  search: {
    realEstate: '/search/real-estate',
    nft: '/search/nft',
    flightAndHotel: '/search/flight',
  },
  emailTemplates: '/email-templates',
  profile: '/profile',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',

  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp4: '/auth/sign-up-4',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },


  home: '/',


  //signIn: '/signin',

  signIn: '/usermain/user/login',

  signUp: '/signup',


  dashboard: '/dashboard',


  user: {
    index: '/user/member',
    details: (id: string) => `/user/${id}`,
    edit: (id: string) => `/user/${id}/edit`,
    member: '/user/member',
    withdrew: '/user/withdrew',
    admin: '/user/admin',
    memberDetails: (id: string) => `/user/member/${id}`,
    withdrewDetails: (id: string) => `/user/withdrew/${id}`,

    adminCreate: '/user/admin/create',
    adminDetails: (id: string) => `/user/admin/${id}`,
    adminEdit: (id: string) => `/user/admin/${id}/edit`,



  },

  feed: {
    index: '/feed',
    stats: '/feed/stats',
    details: (id: string) => `/feed/${id}`,
    edit: (id: string) => `/feed/${id}/edit`,
  },

  board: {
    index: '/board',
    comment: '/board/comment',
    details: (id: string) => `/board/${id}`,
    edit: (id: string) => `/board/${id}/edit`,
    tag: '/board/tag',
    tagDetails: (id: string) => `/board/tag/${id}`,
    tagEdit: (id: string) => `/board/tag/${id}/edit`,
    tagCreate: '/board/tag/create',

  },

  survey: {
    index: '/survey',
    stats: '/survey/stats',
    details: (id: string) => `/survey/${id}`,
    edit: (id: string) => `/survey/${id}/edit`,
  },


 
  operation: {
    healthinfo: '/operation/healthinfo',
    healthinfoDetails: (id: string) => `/operation/healthinfo/${id}`,
    healthinfoEdit: (id: string) => `/operation/healthinfo/${id}/edit`,
    healthinfoCreate: '/operation/healthinfo/create',
    
    
    guide: '/operation/guide',
    guideDetails: (id: string) => `/operation/guide/${id}`,
    guideEdit: (id: string) => `/operation/guide/${id}/edit`,
    guideCreate: '/operation/guide/create',

    notice: '/operation/notice',
    noticeDetails: (id: string) => `/operation/notice/${id}`,
    noticeEdit: (id: string) => `/operation/notice/${id}/edit`,
    noticeCreate: '/operation/notice/create',

    faq: '/operation/faq',
    faqDetails: (id: string) => `/operation/faq/${id}`,
    faqEdit: (id: string) => `/operation/faq/${id}/edit`,
    faqCreate: '/operation/faq/create',


    faqcategory: '/operation/faqcategory',
    faqcategoryDetails: (id: string) => `/operation/faqcategory/${id}`,
    faqcategoryEdit: (id: string) => `/operation/faqcategory/${id}/edit`,
    faqcategoryCreate: '/operation/faqcategory/create',

    details: (id: string) => `/operation/${id}`,
    edit: (id: string) => `/operation/${id}/edit`,
  },
  
  point: {
    index: '/point',
    setup: '/point/setup',
    details: (id: string) => `/point/${id}`,
    edit: (id: string) => `/point/${id}/edit`,
  },
  setup: {
    index: '/setup/db',
    db: '/setup/db',
    food: '/setup/food',
    foodImport: '/setup/food/import',
    terms: '/setup/terms',
    details: (id: string) => `/setup/${id}`,
    edit: (id: string) => `/setup/${id}/edit`,
  },


  usermain: {

    signIn: '/usermain/user/login',

    myProfileEdit: `/usermain/user/my-profile-edit`,

    myPage: '/usermain/user/my-page',

    feeds: '/usermain/feeds',
    feedsDetails: (id: string) => `/usermain/feeds/${id}`,
    feedsEdit: (id: string) => `/usermain/feeds/${id}/edit`,
    feedsCreate: '/usermain/feeds/create',

    feedsInterest: '/usermain/feeds/interest',
    feedsInterestDetails: (id: string) => `/usermain/feeds/interest/${id}`,
    feedsInterestEdit: (id: string) => `/usermain/feeds/interest/${id}/edit`,
    feedsInterestCreate: '/usermain/feeds/interest/create',
    
    feedsMy: '/usermain/feeds/my',
    feedsMyDetails: (id: string) => `/usermain/feeds/my/${id}`,
    feedsMyEdit: (id: string) => `/usermain/feeds/my/${id}/edit`,
    feedsMyCreate: '/usermain/feeds/my/create',





    board: '/usermain/boards',
    boardDetails: (id: string) => `/usermain/boards/${id}`,
    boardEdit: (id: string) => `/usermain/boards/${id}/edit`,
    boardCreate: '/usermain/boards/create',

    myBoard: '/usermain/boards/my',
    


    boardHealth: '/usermain/boards/health',
    boardHealthDetails: (id: string) => `/usermain/boards/health/${id}`,
    boardHealthEdit: (id: string) => `/usermain/boards/health/${id}/edit`,
    boardHealthCreate: '/usermain/boards/health/create',

    boardGuide: '/usermain/boards/guide',
    boardGuideDetails: (id: string) => `/usermain/boards/guide/${id}`,
    boardGuideEdit: (id: string) => `/usermain/boards/guide/${id}/edit`,
    boardGuideCreate: '/usermain/boards/guide/create',


    boardNotice: '/usermain/boards/notice',
    boardNoticeDetails: (id: string) => `/usermain/boards/notice/${id}`,
    boardNoticeEdit: (id: string) => `/usermain/boards/notice/${id}/edit`,
    boardNoticeCreate: '/usermain/board/boards/create',

    boardFaq: '/usermain/boards/faq',
    boardFaqDetails: (id: string) => `/usermain/boards/faq/${id}`,
    boardFaqEdit: (id: string) => `/usermain/boards/faq/${id}/edit`,

    statistics: '/usermain/feeds/statistics',
    statisticsDetails: (id: string) => `/usermain/feeds/statistics/details/${id}`,
    statisticsDaily: '/usermain/feeds/statistics',
    statisticsWeekly: '/usermain/feeds/statistics/weekly',
    statisticsMonthly: '/usermain/feeds/statistics/weekly',
    statisticsAll: '/usermain/feeds/statistics/wyearly',
    

    survey: '/usermain/survey/result',
    surveyDetails: (id: string) => `/usermain/survey/${id}`,
    surveyQuestion: '/usermain/survey/question1',

  },


  


  
};




/*
 {
    name: '피드',
    href: '#',
    icon: <PiFolder />,
    dropdownItems: [
      {
        name: '피드관리',
        href: routes.feed.index,
      },
      {
        name: '피드통계',
        href: routes.feed.stats,
      },
    ],
  },

  {
    name: '자유게시판',
    href: '#',
    icon: <PiFolder />,
    dropdownItems: [
      {
        name: '게시글관리',
        href: routes.board.dashboard,
      },
      {
        name: '추천태그관리',
        href: routes.board.comment,
      },
    ],
  },
  {
    name: '설문',
    href: '#',
    icon: <PiFolder />,
    dropdownItems: [
      {
        name: '설문관리',
        href: routes.survey.dashboard,
      },
      {
        name: '설문통계',
        href: routes.survey.stats,
      },
    ],
  },

  {
    name: '운영관리',
    href: '#',
    icon: <PiHardDrive />,
    dropdownItems: [
      {
        name: '건강정보',
        href: routes.operation.dashboard,
      },
      {
        name: '유형별가이드',
        href: routes.operation.guide,
      },
      {
        name: '공지사항',
        href: routes.operation.nitice,
      },
      {
        name: 'FAQ',
        href: routes.operation.faq,
      },
      {
        name: 'FAQ분류관리',
        href: routes.operation.faqcategory,
      },
    ],
  },

  {
    name: '포인트',
    href: '#',
    icon: <PiCurrencyDollarFill />,
    dropdownItems: [
      {
        name: '포인트관리',
        href: routes.point.dashboard,
      },
      {
        name: '포인트설정',
        href: routes.point.setup,
      },
    ],
  },
  {
    name: '설정',
    href: '#',
    icon: <PiGear />,
    dropdownItems: [
      {
        name: '식품DB관리',
        href: routes.setup.db,
      },
      {
        name: '약관',
        href: routes.setup.terms,
      },
    ],
  },

  */





  