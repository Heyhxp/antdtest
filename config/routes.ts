/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */

import * as Actions from '../src/utils/actions';
// export default [
//   {
//     path: '/index',
//     icon: 'home',
//     name: 'home',
//     component: './index/index',
//   },
//   {
//     path: '/user',
//     layout: false,
//     routes: [
//       {
//         path: '/user/login',
//         layout: false,
//         name: 'login',
//         component: './user/login',
//       },
//     ],
//   },
//   {
//     path: '/',
//     redirect: '/index',
//   },

//   {
//     path: '/inbound',
//     icon: 'crown',
//     name: 'inbound',
//     routes: [
//       {
//         path: '/inbound',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'form',
//         path: '/inbound/form',
//         component: './customercomponent',
//         key: 'inbound.form',
//       },
//       {
//         name: 'plan',
//         path: '/inbound/plan',
//         component: './customercomponent',
//         key: 'inbound.plan',
//       },
//       {
//         name: 'list',
//         path: '/inbound/list',
//         component: './customercomponent',
//         key: 'inbound.list',
//       },
//     ],
//   },
//   {
//     path: '/outbound',
//     icon: 'DeliveredProcedure',
//     name: 'outbound',
//     routes: [
//       {
//         path: '/outbound',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'standard',
//         path: '/outbound/standard',
//         component: './customercomponent',
//         key: 'inbound.standard',
//       },
//       {
//         name: 'nonstandardone',
//         path: '/outbound/nonstandardone',
//         component: './customercomponent',
//         key: 'outbound.nonstandardone',
//       },
//       {
//         name: 'nonstandardtwo',
//         path: '/outbound/nonstandardtwo',
//         component: './customercomponent',
//         key: 'outbound.nonstandardtwo',
//       },
//     ],
//   },
//   {
//     path: '/order',
//     icon: 'table',
//     name: 'order',
//     routes: [
//       {
//         path: '/order',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'transfer',
//         path: '/order/transfer',
//         component: './customercomponent',
//         key: 'order.transfer',
//       },
//       {
//         name: 'list',
//         path: '/order/list',
//         component: './customercomponent',
//         key: 'order.list',
//       },
//       {
//         name: 'plan',
//         path: '/order/plan',
//         component: './customercomponent',
//         key: 'order.plan',
//       },
//     ],
//   },
//   {
//     path: '/inboundnotice',
//     icon: 'Container',
//     name: 'inboundnotice',
//     routes: [
//       {
//         path: '/inboundnotice',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'plan',
//         path: '/inboundnotice/plan',
//         component: './customercomponent',
//         key: 'inboundnotice.plan',
//       },
//       {
//         name: 'list',
//         path: '/inboundnotice/list',
//         component: './customercomponent',
//         key: 'inboundnotice.list',
//       },
//     ],
//   },
//   {
//     path: '/inventory',
//     icon: 'Hdd',
//     name: 'inventory',
//     routes: [
//       {
//         path: '/inventory',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'form',
//         path: '/inventory/form',
//         component: './customercomponent',
//         key: 'inventory.form',
//       },
//       {
//         name: 'plan',
//         path: '/inventory/plan',
//         component: './customercomponent',
//         key: 'inventory.plan',
//       },
//       {
//         name: 'list',
//         path: '/inventory/list',
//         component: './customercomponent',
//         key: 'inventory.list',
//       },
//     ],
//   },
//   {
//     path: '/return_center',
//     icon: 'Profile',
//     name: 'return_center',
//     routes: [
//       {
//         path: '/return_center',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'form',
//         path: '/return_center/form',
//         component: './customercomponent',
//         key: 'return_center.form',
//       },
//     ],
//   },
//   {
//     path: '/value_add_service',
//     icon: 'RedEnvelope',
//     name: 'value_add_service',
//     routes: [
//       {
//         path: '/value_add_service',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'list',
//         path: '/value_add_service/list',
//         component: './customercomponent',
//         key: 'value_add_service.list',
//       },
//     ],
//   },
//   {
//     path: '/report',
//     icon: 'Project',
//     name: 'report',
//     routes: [
//       {
//         path: '/report',
//         redirect: '/customercomponent',
//       },
//       {
//         name: 'plan',
//         path: '/report/plan',
//         component: './customercomponent',
//         key: 'report.plan',
//       },
//       {
//         name: 'list',
//         path: '/report/list',
//         component: './customercomponent',
//         key: 'report.list',
//       },
//     ],
//   },

//   {
//     path: '/*',
//     // layout: false,
//     component: './404.tsx',
//   },
// ];

export default [
  {
    name: 'index',
    key: 'index',
    path: '/index',
    icon: '/images/menuicon/home',
    component: './index/index',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/index',
  },
  //商品中心
  // 其中父级菜单翻译是根据menu.xxxx来翻译的 tabs上的菜单是根据path去掉/来翻译的不区分大小写，所以要保持name和path相对一致
  {
    name: 'product',
    key: 'product',
    path: '/product',
    icon: '/images/menuicon/menu_2',
    routes: [
      {
        name: 'list',
        key: 'product.list',
        path: '/product/list',
        confs: {
          actions: Actions.Product,
        },
        component: './product/list',
      },
      {
        name: 'records',
        key: 'product.history',
        path: '/product/records',
        component: './product/records',
      },
      {
        name: 'transfer',
        key: 'product.transfer',
        path: '/product/transfer',
        component: './product/transfer',
      },
      {
        name: 'catalog_barcodes',
        key: 'product.catalog_barcodes',
        path: '/product/catalog_barcodes',
        component: './product/catalog_barcodes',
      },
    ],
  },
  // 入仓计划
  {
    name: 'inboundnotice',
    key: 'inboundNotice',
    path: '/inboundnotice',
    icon: '/images/menuicon/menu_3',
    routes: [
      {
        name: 'list',
        key: 'inbound_notice.list',
        path: '/inboundnotice/list',
        confs: {
          actions: Actions.InboundNotice,
        },
        component: './inboundNotice/list',
      },
      {
        name: 'container',
        key: 'inbound_notice.asn',
        path: '/inboundnotice/container',
        component: './inboundNotice/container',
      },
    ],
  },
  // 入仓管理
  {
    name: 'inbound',
    key: 'inbound',
    path: '/inbound',
    icon: '/images/menuicon/menu_4',
    routes: [
      {
        name: 'tally_report',
        key: 'inbound.tally_report.list',
        path: '/inbound/tally_report',
        confs: {
          actions: Actions.TallyReport,
        },
        component: './inbound/tally_report',
      },
      {
        name: 'list',
        key: 'inbound.list',
        path: '/inbound/list',
        confs: {
          actions: Actions.Inbound,
        },
        component: './inbound/list',
      },
      {
        name: 'adjust_dim',
        key: 'inbound.adjust_dim',
        path: '/inbound/adjust_dim',
        confs: {
          actions: Actions.AdjustDim,
        },
        component: './inbound/adjust_dim',
      },
    ],
  },
  // 库存管理
  {
    name: 'inventory',
    key: 'inventory',
    path: '/inventory',
    icon: '/images/menuicon/menu_5',
    routes: [
      {
        name: 'list',
        key: 'inventory.list',
        path: '/inventory/list',
        confs: {
          actions: Actions.Inventory,
        },
        component: './inventory/list',
      },
      // {
      //   name: 'inventory.ware_update',
      //   key: 'runreport.list',
      //   path: '/inventory/update',
      //   isShowCurrent: true,
      // },
      {
        name: 'stock_age',
        key: 'inventory.stock_age',
        path: '/inventory/stock_age',
        confs: {
          actions: Actions.Ages,
        },
        component: './inventory/stockAge',
      },
      {
        name: 'summary.warehouse',
        key: 'inventory.summary.warehouse',
        path: '/inventory/summary/warehouse',
        component: './inboundNotice/container',
      },
      {
        name: 'summary.account',
        key: 'inventory.summary.account',
        path: '/inventory/summary/account',
        component: './inboundNotice/container',
      },
      {
        name: 'summary.invalid',
        key: 'inventory.summary.invalid',
        path: '/inventory/summary/invalid',
        component: './inboundNotice/container',
      },
      {
        name: 'transfer',
        key: 'inventory.transfer',
        path: '/inventory/transfer',
        confs: {
          actions: Actions.InventoryTransfer,
        },
        component: './inboundNotice/container',
      },
      {
        name: 'flow',
        key: 'inventory.flow',
        path: '/inventory/flow',
        component: './inboundNotice/container',
      },
      {
        name: 'outbound_record',
        key: 'inventory.outbound_record',
        path: '/inventory/outbound_record',
        confs: {
          actions: Actions.Outbound,
        },
        component: './inboundNotice/container',
      },
      {
        name: 'outbound_scan',
        key: 'inventory.outbound_scan',
        path: '/inventory/outbound_scan',
        confs: {
          actions: Actions.Scan,
        },
        component: './inboundNotice/container',
      },
    ],
  },

  // 订单中心
  {
    name: 'order',
    key: 'order',
    path: '/order',
    icon: '/images/menuicon/menu_6',
    routes: [
      {
        name: 'standard',
        key: 'order.standard',
        path: '/order/standard',
        confs: {
          actions: Actions.Standard,
        },
      },
      {
        // 拥有associatedKeys的菜单自定义key,并且保证和associatedKeys不相同
        name: 'nonstandard',
        key: 'order.nonstandard',
        associatedKeys: ['order.nonstandardtwo', 'order.nonstandardone'],
        associatedConfs: {
          'order.nonstandardone': Actions.OrderNonstandarOne,
          'order.nonstandardtwo': Actions.OrderNonstandarTwo,
        },
        path: '/order/nonstandard',
        // confs: {
        //   actions: Actions.OrderNonstandarOne,
        // },
      },
      // {
      //   label: 'order.nonstandardtwo',
      //   key: 'order.nonstandardtwo',
      //   href: '/order/nonstandardtwo',
      //   // 在二级菜单中隐藏
      //   hidden: true,
      //   confs: {
      //     actions: Actions.OrderNonstandarTwo,
      //   },
      // },

      {
        name: 'list',
        key: 'order.list',
        path: '/order/list',
        confs: {
          actions: Actions.Order,
        },
      },
      {
        name: 'mtw',
        key: 'order.mtw',
        path: '/order/mtw',
        confs: {
          actions: Actions.Mtw,
        },
      },
      {
        name: 'transfer',
        key: 'order.transfer',
        associatedKeys: ['order.transfer_box', 'order.transfer'],
        path: '/order/transfer',
        associatedConfs: { 'order.transfer': Actions.OrderTransfer },
        // confs: {
        //   actions: Actions.OrderTransfer,
        // },
      },
      {
        name: 'return',
        key: 'order.returning',
        path: '/order/return',
      },
      {
        name: 'order_analysis',
        key: 'order.order_analysis',
        path: '/order/order_analysis',
        confs: {
          actions: Actions.OrderAnalysis,
        },
      },
      {
        name: 'order_analysis_war',
        key: 'order.order_analysis_war',
        path: '/order/order_analysis_war',
        confs: {
          actions: Actions.OrderAnalysisWar,
        },
      },
      {
        name: 'fee_adjust',
        key: 'order.fee_adjust',
        path: '/order/fee_adjust',
        confs: {
          actions: Actions.FeeAdjust,
        },
      },
      {
        name: 'cost',
        key: 'order.cost',
        path: '/order/cost',
      },
      {
        name: 'fedex_info',
        key: 'order.fedex_info',
        path: '/order/fedex_info',
      },
      {
        name: 'records',
        key: 'order.import_file',
        path: '/order/records',
      },
      {
        name: 'cancel',
        key: 'order.cancel',
        path: '/order/cancel',
      },
      {
        name: 'list',
        key: 'order.fab_list',
        path: '/order/fba',
        confs: {},
      },
      // {
      //   name: 'detail',
      //   key: 'order.detail',
      //   href: '/order/[action]',
      //   as: '/order/detail',
      //   isShowCurrent: true,
      // },

      {
        name: 'track',
        key: 'order.track',
        path: '/order/track',
        // isShowCurrent: true,
      },
      {
        name: 'track_record',
        key: 'order.track_record',
        path: '/order/track_record',
      },
      // {
      //   label: 'order.transfer_box',
      //   key: 'order.transfer_box',
      //   href: '/order/transfer',
      //   hidden: true,
      //   confs: {
      //     actions: Actions.OrderPvTransfer,
      //   },
      // },
      {
        name: 'fedex_eclaim',
        key: 'order.fedex_eclaim',
        path: '/order/fedex_eclaim',
        confs: {
          actions: Actions.FedexEClaim,
        },
      },
      {
        name: 'fedex_eclaim_report',
        key: 'order.fedex_eclaim_report',
        path: '/order/fedex_eclaim_report',
        confs: {
          actions: Actions.FedexEClaimReport,
        },
      },
      {
        name: 'fedex_eclaim_mgt',
        key: 'order.fedex_eclaim_mgt',
        path: '/order/fedex_eclaim_mgt',
        confs: {
          actions: Actions.FedexEClaimMgt,
        },
      },
      {
        name: 'fedex_track',
        key: 'order.fedex_track',
        path: '/order/fedex_track',
        confs: {
          actions: Actions.FedexTrack,
        },
      },
      {
        name: 'fedex_track_mgt',
        key: 'order.fedex_track_mgt',
        path: '/order/fedex_track_mgt',
        confs: {
          actions: Actions.FedexTrackMgt,
        },
      },
    ],
  },

  // 退件中心
  {
    name: 'return_center',
    key: 'return_center',
    path: '/return_center',
    icon: '/images/menuicon/menu_7',
    routes: [
      {
        name: 'return',
        key: 'return_center.return',
        path: '/return_center/return',
        confs: {
          actions: Actions.ReturnOrder,
        },
      },
      {
        name: 'inbound_detail',
        key: 'return_center.inbound_detail',
        path: '/return_center/inbound_detail',
        confs: {
          actions: Actions.ReturnInboundDetails,
        },
      },
      {
        name: 'return_inventory',
        key: 'return_center.return_inventory',
        path: '/return_center/return_inventory',
      },
    ],
  },
  // 出库管理
  {
    name: 'outbound',
    key: 'outbound',
    path: '/outbound',
    icon: '/images/menuicon/menu_8',
    routes: [
      {
        name: 'transfer',
        key: 'outbound.transfer',
        path: '/outbound/transfer',
        confs: {
          actions: Actions.OutboundOrderTransfer,
        },
      },
      {
        name: 'selfpick',
        key: 'outbound.selfpick',
        path: '/outbound/selfpick',
        confs: {
          actions: Actions.OutboundOrderSelfpick,
        },
      },
    ],
  },
  // 增值服务
  {
    name: 'value_add_service',
    key: 'value_add_service',
    path: '/value_add_service',
    icon: '/images/menuicon/menu_9',
    routes: [
      {
        name: 'list',
        key: 'value_add_service.list',
        path: '/value_add_service/list',
        confs: {
          actions: Actions.VAService,
        },
      },
    ],
  },
  // 账单管理
  {
    name: 'billmgt',
    key: 'billmgt',
    path: '/billmgt',
    icon: '/images/menuicon/menu_10',
    routes: [
      {
        name: 'lift_cabinet_fee',
        key: 'billmgt.lift_cabinet_fee',
        path: '/billmgt/lift_cabinet_fee',
        confs: {
          actions: Actions.LiftCabinet,
        },
      },
      {
        name: 'tally',
        key: 'billmgt.tally',
        path: '/billmgt/tally',
        confs: {
          actions: Actions.Tally,
        },
      },
      {
        name: 'storage',
        key: 'billmgt.storage',
        path: '/billmgt/storage',
        confs: {
          actions: Actions.Storage,
        },
      },
      {
        name: 'fulfillment',
        key: 'billmgt.fulfillment',
        path: '/billmgt/fulfillment',
        confs: {
          actions: Actions.Fulfillment,
        },
      },
      {
        name: 'value_added_service_fee',
        key: 'billmgt.value_added_service_fee',
        path: '/billmgt/value_added_service_fee',
        confs: {
          actions: Actions.ValueAddedService,
        },
      },
      {
        name: 'value_added_service_fee_new',
        key: 'billmgt.value_added_service_fee_new',
        path: '/billmgt/value_added_service_fee_new',
        confs: {
          actions: Actions.ValueAddedService,
        },
      },
      {
        name: 'return_fee',
        key: 'billmgt.return_fee',
        path: '/billmgt/return_fee',
        confs: {
          actions: Actions.ReturnFee,
        },
      },
      {
        name: 'other_fee',
        key: 'billmgt.other_fee',
        path: '/billmgt/other_fee',
        confs: {
          actions: Actions.OtherFee,
        },
      },
      {
        name: 'expense_cost',
        key: 'billmgt.expense_cost',
        path: '/billmgt/expense_cost',
        confs: {
          actions: Actions.Expense,
        },
      },
      {
        name: 'card_list',
        key: 'billmgt.card_list',
        path: '/billmgt/card_list',
      },
      {
        name: 'trading_flow',
        key: 'billmgt.trading_flow',
        path: '/billmgt/trading_flow',
      },
      {
        name: 'payment_record',
        key: 'billmgt.payment_record',
        path: '/billmgt/payment_record',
      },
      {
        name: 'customer_bill_management',
        key: 'billmgt.customer_bill_management',
        path: '/billmgt/customer_bill_management',
        confs: {
          actions: Actions.CustomerBillManagement,
        },
      },
      {
        name: 'customer_list',
        key: 'billmgt.customer_list',
        path: '/billmgt/customer_list',
      },
      {
        name: 'period_approval_process',
        key: 'billmgt.period_approval_process',
        path: '/billmgt/period_approval_process',
        confs: {
          actions: Actions.PeriodApproval,
        },
      },
      {
        name: 'bill_invoice_management',
        key: 'billmgt.bill_invoice_management',
        path: '/billmgt/bill_invoice_management',
        confs: {
          actions: Actions.BillInvoiceManagement,
        },
      },
    ],
  },
  {
    path: '/*',
    // layout: false,
    component: './404.tsx',
  },
];
