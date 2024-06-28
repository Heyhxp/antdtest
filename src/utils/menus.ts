import * as Actions from './actions';

export const Menus = [
  {
    label: 'product',
    key: 'product',
    href: '/product',
    i18n: 'i18n_product',
    subAgent: 'product.list',
    plat: ['fbo', 'pv', 'fba'],
    subMenus: [
      {
        label: 'subs_product.list',
        key: 'product.list',
        href: '/product',
        plat: ['fbo', 'pv', 'fba'],
        confs: {
          actions: Actions.Product,
        },
      },
      {
        label: 'subs_product.add',
        key: 'product.add',
        href: '/product/[action]',
        as: '/product/add',
        isShowCurrent: true,
      },
      {
        label: 'subs_product.detail',
        key: 'product.detail',
        href: '/product/[action]',
        as: '/product/detail',
        isShowCurrent: true,
      },
      {
        label: 'subs_product.edit',
        key: 'product.edit',
        href: '/product/[action]',
        as: '/product/edit',
        isShowCurrent: true,
      },
      {
        label: 'subs_product.records',
        key: 'product.history',
        plat: ['fbo', 'pv'],
        href: '/product/records',
      },
      {
        label: 'subs_product.transfer',
        key: 'product.transfer',
        plat: ['fbo'],
        href: '/product/transfer',
      },
      {
        label: 'subs_product.catalog_barcodes',
        key: 'product.catalog_barcodes',
        plat: ['fbo'],
        href: '/product/catalog_barcodes',
      },
    ],
  },
  {
    label: 'asn.label',
    key: 'asn',
    href: '/asn',
    i18n: 'i18n_asn',
    subAgent: 'asn.list',
    plat: ['fba'],
    subMenus: [
      {
        label: 'asn.list',
        key: 'asn.list',
        href: '/asn',
        plat: ['fba'],
        confs: {
          actions: Actions.Inbound,
        },
      },
    ],
  },
  {
    label: 'inbound_notice.mgr',
    key: 'inboundNotice',
    href: '/inboundNotice',
    i18n: 'i18n_inbound_notice',
    subAgent: 'inbound_notice.list',
    plat: ['fbo', 'pv'],
    subMenus: [
      {
        label: 'inbound_notice.list',
        key: 'inbound_notice.list',
        href: '/inboundNotice',
        plat: ['fbo', 'pv'],
        confs: {
          actions: Actions.InboundNotice,
        },
      },
      {
        label: 'inbound_notice.add',
        key: 'inbound_notice.add',
        href: '/inboundNotice/[action]',
        as: '/inboundNotice/add',
        isShowCurrent: true,
      },
      {
        label: 'inbound_notice.import',
        key: 'inbound_notice.import',
        href: '/inboundNotice/[action]',
        as: '/inboundNotice/import',
        isShowCurrent: true,
      },
      {
        label: 'inbound_notice.edit',
        key: 'inbound_notice.edit',
        href: '/inboundNotice/[action]',
        as: '/inboundNotice/edit',
        isShowCurrent: true,
      },
      {
        label: 'inbound_notice.edit-puttype',
        key: 'inbound_notice.edit-puttype',
        href: '/inboundNotice/[action]',
        as: '/inboundNotice/edit-puttype',
        isShowCurrent: true,
      },
      {
        label: 'inbound_notice.container',
        key: 'inbound_notice.asn',
        href: '/inboundNotice/container',
        plat: ['fbo'],
        
      },
    ],
  },
  {
    label: 'inbound.title',
    key: 'inbound',
    href: '/inbound/tally_report',
    i18n: 'i18n_inbound',
    subAgent: 'inbound.tally_report.list',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'tally_report.list',
        key: 'inbound.tally_report.list',
        href: '/inbound/tally_report',
        plat: ['fbo'],
        confs: {
          actions: Actions.TallyReport,
        },
      },
      {
        label: 'inbound.list',
        key: 'inbound.list',
        href: '/inbound',
        plat: ['fbo'],
        confs: {
          actions: Actions.Inbound,
        },
      },
      {
        label: 'adjust_dim.title',
        key: 'inbound.adjust_dim',
        href: '/inbound/adjust_dim',
        plat: ['fbo'],
        confs: {
          actions: Actions.AdjustDim,
        },
      },
      {
        label: 'inbound.add',
        key: 'inbound.add',
        href: '/inbound/[action]',
        as: '/inbound/add',
        isShowCurrent: true,
      },
      {
        label: 'inbound.edit',
        key: 'inbound.edit',
        href: '/inbound/[action]',
        as: '/inbound/edit',
        isShowCurrent: true,
      },
      {
        label: 'inbound.detail',
        key: 'inbound.edit',
        href: '/inbound/[action]',
        as: '/inbound/detail',
        isShowCurrent: true,
      },
      {
        label: 'tally_report.detail',
        key: 'inbound.tally_report.detail',
        href: '/inbound/tally_report/[id]',
        isShowCurrent: true,
      },
      {
        label: 'tally_report.tobe_confirmed',
        key: 'inbound.tally_report.tobe_confirmed',
        href: '/inbound/tally_report/tobe_confirmed/[id]',
        isShowCurrent: true,
      },
      {
        label: 'tally_report.tobe_confirmed_detail',
        key: 'inbound.tally_report.tobe_confirmed_detail',
        href: '/inbound/tally_report/tobe_confirmed_detail/[id]',
        isShowCurrent: true,
      },
      {
        label: 'tally_report.oblpn_detail',
        key: 'inbound.tally_report.oblpn_detail',
        href: '/inbound/tally_report/oblpn_detail/[id]',
        isShowCurrent: true,
      },
    ],
  },
  {
    label: 'inventory.title',
    key: 'inventory',
    href: '/inventory',
    i18n: 'i18n_inventory',
    subAgent: 'inventory.list',
    plat: ['fbo', 'pv', 'fba'],
    subMenus: [
      {
        label: 'inventory.list',
        key: 'inventory.list',
        href: '/inventory',
        plat: ['fbo', 'pv', 'fba'],
        confs: {
          actions: Actions.Inventory,
        },
      },
      {
        label: 'inventory.ware_update',
        key: 'runreport.list',
        href: '/inventory/update',
        isShowCurrent: true,
      },
      {
        label: 'inventory.stock_age',
        key: 'inventory.stock_age',
        plat: ['fbo'],
        href: '/inventory/stock-age',
        confs: {
          actions: Actions.Ages,
        },
      },
      {
        label: 'inventory.summary.warehouse',
        key: 'inventory.summary.warehouse',
        href: '/inventory/summary/[kind]',
        as: '/inventory/summary/warehouse',
        plat: ['fbo'],
      },
      {
        label: 'inventory.summary.account',
        key: 'inventory.summary.account',
        href: '/inventory/summary/[kind]',
        as: '/inventory/summary/account',
        plat: ['fbo'],
      },
      {
        label: 'inventory.summary.invalid',
        key: 'inventory.summary.invalid',
        href: '/inventory/summary/[kind]',
        as: '/inventory/summary/invalid',
        plat: ['fbo'],
      },
      {
        label: 'inventory.transfer',
        key: 'inventory.transfer',
        plat: ['fbo'],
        href: '/inventory/transfer',
        confs: {
          actions: Actions.InventoryTransfer,
        },
      },
      {
        label: 'inventory.flow',
        key: 'inventory.flow',
        plat: ['fbo'],
        href: '/inventory/flow',
      },
      {
        label: 'inventory.outbound_record',
        key: 'inventory.outbound_record',
        href: '/inventory/outbound_record',
        plat: ['fbo'],
        confs: {
          actions: Actions.Outbound,
        },
      },
      {
        label: 'inventory.outbound_scan',
        key: 'inventory.outbound_scan',
        href: '/inventory/outbound_scan',
        plat: ['fbo'],
        confs: {
          actions: Actions.Scan,
        },
      },
      {
        label: 'inventory.outbound_add',
        key: 'inventory.outbound_record.add',
        href: '/inventory/outbound_record/[action]',
        as: '/inventory/outbound_record/add',
        // isShowCurrent: true,
      },
      {
        label: 'inventory.outbound_edit',
        key: 'inventory.outbound_record.edit',
        href: '/inventory/outbound_record/[action]',
        as: '/inventory/outbound_record/edit',
        // isShowCurrent: true,
      },
      {
        label: 'inventory.outbound_detail',
        key: 'inventory.outbound_record.detail',
        href: '/inventory/outbound_record/[action]',
        as: '/inventory/outbound_record/detail',
        // isShowCurrent: true,
      },
    ],
  },
  {
    label: 'order.title',
    key: 'order',
    href: '/order/standard',
    i18n: 'i18n_order',
    subAgent: 'order.list',
    plat: ['fbo', 'pv', 'fba'],
    subMenus: [
      {
        label: 'order.standard',
        key: 'order.standard',
        href: '/order/standard',
        plat: ['fbo'],
        confs: {
          actions: Actions.Standard,
        },
      },
      {
        label: 'order.nonstandardone',
        key: 'order.nonstandardone',
        href: '/order/nonstandardone',
        plat: ['fbo'],
        confs: {
          actions: Actions.OrderNonstandarOne,
        },
      },
      {
        label: 'order.nonstandardtwo',
        key: 'order.nonstandardtwo',
        href: '/order/nonstandardtwo',
        plat: ['fbo'],
        confs: {
          actions: Actions.OrderNonstandarTwo,
        },
      },
      {
        label: 'order.list',
        key: 'order.list',
        href: '/order',
        plat: ['fbo', 'pv'],
        confs: {
          actions: Actions.Order,
        },
      },
      {
        label: 'order.mtw',
        key: 'order.mtw',
        // associatedKeys: ['order.transfer_box'],
        plat: ['fbo'],
        href: '/order/mtw',
        confs: {
          actions: Actions.Mtw,
        },
      },
      {
        label: 'order.transfer',
        key: 'order.transfer',
        associatedKeys: ['order.transfer_box'],
        plat: ['fbo'],
        href: '/order/transfer',
        confs: {
          actions: Actions.OrderTransfer,
        },
      },
      {
        label: 'order.return',
        key: 'order.returning',
        plat: ['fbo'],
        href: '/order/return',
      },
      {
        label: 'order.order_analysis',
        key: 'order.order_analysis',
        plat: ['fbo'],
        href: '/order/order_analysis',
        confs: {
          actions: Actions.OrderAnalysis,
        },
      },
      {
        label: 'order.order_analysis_war',
        key: 'order.order_analysis_war',
        plat: ['fbo'],
        href: '/order/order_analysis_war',
        confs: {
          actions: Actions.OrderAnalysisWar,
        },
      },
      {
        label: 'order.fee_adjust',
        key: 'order.fee_adjust',
        plat: ['fbo'],
        href: '/order/fee_adjust',
        confs: {
          actions: Actions.FeeAdjust,
        },
      },
      {
        label: 'order.order_cost',
        key: 'order.cost',
        plat: ['fbo'],
        href: '/order/cost',
      },
      {
        label: 'order.fedex_info',
        key: 'order.fedex_info',
        plat: ['fbo'],
        href: '/order/fedex_info',
      },
      {
        label: 'order.records',
        key: 'order.import_file',
        plat: ['fbo'],
        href: '/order/records',
      },
      {
        label: 'order.cancel',
        key: 'order.cancel',
        plat: ['fbo'],
        href: '/order/cancel',
      },
      {
        label: 'order.list',
        key: 'order.fab_list',
        href: '/order/fba',
        plat: ['fba'],
        confs: {},
      },
      {
        label: 'order.detail',
        key: 'order.detail',
        href: '/order/[action]',
        as: '/order/detail',
        isShowCurrent: true,
      },

      {
        label: 'order.track',
        key: 'order.track',
        href: '/order/track',
        isShowCurrent: true,
      },
      {
        label: 'order.track_record',
        key: 'order.track_record',
        plat: ['fbo'],
        href: '/order/track_record',
      },
      {
        label: 'order.transfer_box',
        key: 'order.transfer_box',
        plat: ['fbo'],
        href: '/order/transfer',
        hidden: true,
        confs: {
          actions: Actions.OrderPvTransfer,
        },
      },
      {
        label: 'order.fedex_eclaim',
        key: 'order.fedex_eclaim',
        plat: ['fbo'],
        href: '/order/fedex_eclaim',
        confs: {
          actions: Actions.FedexEClaim,
        },
      },
      {
        label: 'order.fedex_eclaim_mgt',
        key: 'order.fedex_eclaim_mgt',
        plat: ['fbo'],
        href: '/order/fedex_eclaim_mgt',
        confs: {
          actions: Actions.FedexEClaimMgt,
        },
      },
      {
        label: 'order.fedex_track',
        key: 'order.fedex_track',
        plat: ['fbo'],
        href: '/order/fedex_track',
        confs: {
          actions: Actions.FedexTrack,
        },
      },
      {
        label: 'order.fedex_track_mgt',
        key: 'order.fedex_track_mgt',
        plat: ['fbo'],
        href: '/order/fedex_track_mgt',
        confs: {
          actions: Actions.FedexTrackMgt,
        },
      },
    ],
  },
  {
    label: 'return_center.label',
    key: 'return_center',
    href: '/return_center',
    i18n: 'i18n_return_center',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'return_center.return',
        key: 'return_center.return',
        href: '/return_center/return',
        plat: ['fbo'],
        confs: {
          actions: Actions.ReturnOrder,
        },
      },
      {
        label: 'return_center.inbound_detail',
        key: 'return_center.inbound_detail',
        href: '/return_center/inbound_detail',
        plat: ['fbo'],
        confs: {
          actions: Actions.ReturnInboundDetails,
        },
      },
      {
        label: 'return_center.return_inventory',
        key: 'return_center.return_inventory',
        href: '/return_center/return_inventory',
        plat: ['fbo'],
      },
    ],
  },
  {
    label: 'outbound.title',
    key: 'outbound',
    href: '/outbound/standard',
    i18n: 'i18n_outbound',
    subAgent: 'outbound.standard',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'outbound.transfer',
        key: 'outbound.transfer',
        href: '/outbound/transfer',
        plat: ['fbo'],
        confs: {
          actions: Actions.OutboundOrderTransfer,
        },
      },
      {
        label: 'outbound.selfpick',
        key: 'outbound.selfpick',
        href: '/outbound/selfpick',
        plat: ['fbo'],
        confs: {
          actions: Actions.OutboundOrderSelfpick,
        },
      },
    ],
  },
  {
    label: 'value_add_service.title',
    key: 'value_add_service',
    href: '/valueAddService',
    i18n: 'i18n_value_add_service',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'value_add_service.list',
        key: 'value_add_service.list',
        href: '/valueAddService',
        plat: ['fbo'],
        confs: {
          actions: Actions.VAService,
        },
      },
    ],
  },
  {
    label: 'report.title',
    key: 'report',
    href: '/report',
    i18n: 'i18n_report',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'report.shipment',
        key: 'report.shipment',
        href: '/report',
        plat: ['fbo'],
        confs: {
          actions: Actions.shipmentReport,
        },
      },
      {
        label: 'report.shipment_detail',
        key: 'report.shipment.detail',
        href: '/report/[id]',
        isShowCurrent: true,
      },
      {
        label: 'report.kpi',
        key: 'report.kpi',
        href: '/report/kpi',
        plat: ['fbo'],
      },
      {
        label: 'report.inventory_detail',
        key: 'report.inventory.detail',
        href: '/report/inventory/[id]',
        isShowCurrent: true,
      },
    ],
  },
  {
    label: 'fee.label',
    key: 'fee',
    href: '/fee',
    i18n: 'i18n_fee',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'fee.overview_kh',
        key: 'fee.overview.kh',
        href: '/fee/overview/kh',
        plat: ['fbo'],
      },
      {
        label: 'fee.overview_cw',
        key: 'fee.overview.cw',
        href: '/fee/overview/cw',
        plat: ['fbo'],
      },
      {
        label: 'fee.transaction_detail_kh',
        key: 'fee.transaction_detail.kh',
        href: '/fee/transaction_detail/kh',
        plat: ['fbo'],
      },
      {
        label: 'fee.transaction_detail_cw',
        key: 'fee.transaction_detail.cw',
        href: '/fee/transaction_detail/cw',
        plat: ['fbo'],
      },
      {
        label: 'fee.recharge_manage',
        key: 'fee.recharge_manage',
        href: '/fee/recharge_manage',
        plat: ['fbo'],
        confs: {
          actions: Actions.Recharge,
        },
      },
    ],
  },
  {
    label: 'bill.label',
    key: 'bill',
    href: '/bill',
    i18n: 'i18n_bill',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'bill.invoice',
        key: 'bill.invoice',
        href: '/bill/invoice',
        plat: ['fbo'],
        confs: {
          actions: Actions.Bill,
        },
      },
      {
        label: 'bill.sgw',
        key: 'bill.sgw',
        href: '/bill/sgw',
        plat: ['fbo'],
      },
      {
        label: 'bill.fedex',
        key: 'bill.fedex',
        href: '/bill/fedex',
        plat: ['fbo'],
        confs: {
          actions: Actions.Fedex,
        },
      },
      {
        label: 'bill.profit',
        key: 'bill.profit',
        href: '/bill/profit',
        plat: ['fbo'],
      },
      {
        label: 'bill.manual',
        key: 'bill.manual',
        href: '/bill/manual',
        plat: ['fbo'],
      },
      {
        label: 'bill.fedex-alert',
        key: 'bill.fedex-alert',
        href: '/bill/fedex-alert',
        plat: ['fbo'],
      },
    ],
  },
  {
    label: 'billmgt.label',
    key: 'billmgt',
    href: '/billmgt',
    i18n: 'i18n_billmgt',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'billmgt.lift_cabinet_fee',
        key: 'billmgt.lift_cabinet_fee',
        href: '/billmgt/lift_cabinet_fee',
        plat: ['fbo'],
        confs: {
          actions: Actions.LiftCabinet,
        },
      },
      {
        label: 'billmgt.tally',
        key: 'billmgt.tally',
        href: '/billmgt/tally',
        plat: ['fbo'],
        confs: {
          actions: Actions.Tally,
        },
      },
      {
        label: 'billmgt.storage',
        key: 'billmgt.storage',
        href: '/billmgt/storage',
        plat: ['fbo'],
        confs: {
          actions: Actions.Storage,
        },
      },
      {
        label: 'billmgt.fulfillment',
        key: 'billmgt.fulfillment',
        href: '/billmgt/fulfillment',
        plat: ['fbo'],
      },
      {
        label: 'billmgt.value_added_service_fee',
        key: 'billmgt.value_added_service_fee',
        href: '/billmgt/value_added_service_fee',
        plat: ['fbo'],
        confs: {
          actions: Actions.ValueAddedService,
        },
      },
      {
        label: 'billmgt.value_added_service_fee_new',
        key: 'billmgt.value_added_service_fee_new',
        href: '/billmgt/value_added_service_fee_new',
        plat: ['fbo'],
        confs: {
          actions: Actions.ValueAddedService,
        },
      },
      {
        label: 'billmgt.return_fee',
        key: 'billmgt.return_fee',
        href: '/billmgt/return_fee',
        plat: ['fbo'],
        confs: {
          actions: Actions.ReturnFee,
        },
      },
      {
        label: 'billmgt.other_fee',
        key: 'billmgt.other_fee',
        href: '/billmgt/other_fee',
        plat: ['fbo'],
        confs: {
          actions: Actions.OtherFee,
        },
      },
      {
        label: 'billmgt.expense_cost',
        key: 'billmgt.expense_cost',
        href: '/billmgt/expense_cost',
        plat: ['fbo'],
        confs: {
          actions: Actions.Expense,
        },
      },
      {
        label: 'billmgt.card_list',
        key: 'billmgt.card_list',
        href: '/billmgt/card_list',
        plat: ['fbo'],
      },
      {
        label: 'billmgt.trading_flow',
        key: 'billmgt.trading_flow',
        href: '/billmgt/trading_flow',
        plat: ['fbo'],
      },
      {
        label: 'billmgt.payment_record',
        key: 'billmgt.payment_record',
        href: '/billmgt/payment_record',
        plat: ['fbo'],
      },
      {
        label: 'billmgt.customer_bill_management',
        key: 'billmgt.customer_bill_management',
        href: '/billmgt/customer_bill_management',
        plat: ['fbo'],
        confs: {
          actions: Actions.CustomerBillManagement,
        },
      },
      {
        label: 'billmgt.customer_list',
        key: 'billmgt.customer_list',
        href: '/billmgt/customer_list',
        plat: ['fbo'],
      },
      {
        label: 'billmgt.period_approval_process',
        key: 'billmgt.period_approval_process',
        href: '/billmgt/period_approval_process',
        plat: ['fbo'],
        confs: {
          actions: Actions.PeriodApproval,
        },
      },
      {
        label: 'billmgt.bill_invoice_management',
        key: 'billmgt.bill_invoice_management',
        href: '/billmgt/bill_invoice_management',
        plat: ['fbo'],
        confs: {
          actions: Actions.BillInvoiceManagement,
        },
      },
    ],
  },
  {
    label: 'batch',
    key: 'batch',
    href: '/batch',
    i18n: 'i18n_batch',
    plat: ['pv'],
    subMenus: [
      {
        label: 'batch',
        key: 'batch.list',
        href: '/batch',
        plat: ['pv'],
      },
    ],
  },
  {
    label: 'cms.title',
    key: 'cms',
    href: '/cms',
    i18n: 'i18n_cms',
    subAgent: 'cms.booking',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'cms.booking',
        key: 'cms.booking_list',
        href: '/cms/booking',
        plat: ['fbo'],
        confs: {
          actions: Actions.CMSbooking,
        },
      },
      {
        label: 'cms.order_outbound',
        key: 'cms.order_list',
        href: '/cms/order_outbound',
        plat: ['fbo'],
        confs: {
          actions: Actions.OrderOutbound,
        },
      },
      {
        label: 'cms.stock_ages',
        key: 'cms.inventory_list',
        href: '/cms/stock_ages',
        plat: ['fbo'],
        confs: {
          actions: Actions.InventoryList,
        },
      },
    ],
  },
  {
    label: 'crm.title',
    key: 'crm',
    href: '/crm',
    i18n: 'i18n_crm',
    subAgent: 'crm.call_list',
    plat: ['fbo'],
    subMenus: [
      {
        label: 'crm.call_list',
        key: 'crm.call_list',
        href: '/crm/call_list',
        plat: ['fbo'],
        confs: {
          actions: Actions.CRMCallList,
        },
      },
      {
        label: 'crm.duplicate_checking',
        key: 'crm.duplicate_checking',
        href: '/crm/duplicate_checking',
        plat: ['fbo'],
        confs: {
          actions: Actions.CRMDuplicateChecking,
        },
      },
      {
        label: 'crm.list',
        key: 'crm.list',
        href: '/crm/list',
        plat: ['fbo'],
        confs: {
          actions: Actions.CRMList,
        },
      },
      {
        label: 'crm.high_seas_list',
        key: 'crm.high_seas_list',
        href: '/crm/high_seas_list',
        plat: ['fbo'],
        confs: {
          actions: Actions.CRMHighSeasList,
        },
      },
    ],
  },
  {
    label: 'warehouse',
    key: 'warehouse',
    href: '/warehouse',
    i18n: 'i18n_warehouse',
    subAgent: 'warehouse.list',
    plat: ['fbo', 'pv', 'fba'],
    subMenus: [
      {
        label: 'subs_warehouse.pv_list',
        key: 'warehouse.pv_list',
        href: '/warehouse/[mode]',
        as: '/warehouse/pv',
        plat: ['pv'],
        confs: {
          actions: Actions.Warehouse,
        },
      },
      {
        label: 'subs_warehouse.list',
        key: 'warehouse.list',
        href: '/warehouse/[mode]',
        as: '/warehouse/vir',
        plat: ['fbo', 'pv', 'fba'],
        confs: {
          actions: Actions.Warehouse,
        },
      },
      {
        label: 'subs_warehouse.add',
        key: 'warehouse.add',
        href: '/warehouse/[mode]/add',
        isShowCurrent: true,
      },
      {
        label: 'subs_warehouse.detail',
        key: 'warehouse.detail',
        href: '/warehouse/[mode]/[action]',
        as: '/warehouse/[mode]/detail',
        isShowCurrent: true,
      },
      {
        label: 'subs_warehouse.edit',
        key: 'warehouse.edit',
        href: '/warehouse/[mode]/[action]',
        as: '/warehouse/[mode]/edit',
        isShowCurrent: true,
      },
      {
        label: 'subs_warehouse.transfer',
        key: 'warehouse.transfer',
        href: '/warehouse/transfer',
        plat: ['fbo'],
      },
      {
        label: 'subs_warehouse.warehouseservice',
        key: 'warehouse.warehouseservice',
        href: '/warehouse/warehouseservice',
        plat: ['fbo'],
      },
    ],
  },
  {
    label: 'account',
    key: 'account',
    href: '/account',
    i18n: 'i18n_account',
    subAgent: 'account.list',
    plat: ['fbo', 'pv', 'fba'],
    subMenus: [
      {
        label: 'sub_account.list',
        key: 'account.list',
        href: '/account',
        plat: ['fbo', 'pv', 'fba'],
        confs: {
          actions: Actions.user,
        },
      },
      {
        label: 'sub_account.add',
        key: 'account.add',
        href: '/account/[action]',
        as: '/account/add',
        isShowCurrent: true,
      },
      {
        label: 'sub_account.edit',
        key: 'account.edit',
        href: '/account/[action]',
        as: '/account/edit',
        isShowCurrent: true,
      },
      {
        label: 'sub_account.template.title',
        key: 'account.template',
        plat: ['fbo', 'pv', 'fba'],
        href: '/account/templates',
      },
      {
        label: 'sub_account.template.add',
        key: 'account.template.add',
        href: '/account/templates/[action]',
        as: '/account/templates/add',
        isShowCurrent: true,
      },
      {
        label: 'sub_account.template.edit',
        key: 'account.template.edit',
        href: '/account/templates/[action]',
        as: '/account/templates/edit',
        isShowCurrent: true,
      },
      {
        label: 'sub_account.agent.title',
        key: 'account.agent',
        plat: ['fbo'],
        href: '/account/agent',
      },
    ],
  },
  {
    label: 'platform_auth.label',
    key: 'platform_auth',
    href: '/platform_auth',
    i18n: 'i18n_platform_auth',
    subAgent: 'platform_auth.shop_list',
    plat: ['fbo', 'pv', 'fba'],
    subMenus: [
      {
        label: 'platform_auth.shop_list',
        key: 'platform_auth.shop_list',
        href: '/platform_auth/shop_list',
        plat: ['fbo'],
        confs: {
          actions: Actions.ShopList,
        },
      },
      {
        label: 'platform_auth.auth',
        key: 'platform_auth.auth',
        href: '/platform_auth/[action]',
        as: '/platform_auth/auth',
        isShowCurrent: true,
      },
      {
        label: 'platform_auth.product',
        key: 'platform_auth.product',
        href: '/platform_auth/product',
        plat: ['fbo'],
        confs: {
          actions: Actions.AuthProduct,
        },
      },
      {
        label: 'platform_auth.order',
        key: 'platform_auth.order',
        href: '/platform_auth/order',
        plat: ['fbo'],
        confs: {
          actions: Actions.AuthOrder,
        },
      },
      {
        label: 'platform_auth.listing',
        key: 'platform_auth.listing',
        href: '/platform_auth/listing',
        plat: ['fbo'],
        confs: {
          actions: Actions.Listing,
        },
      },
      {
        label: 'platform_auth.listing_edit',
        key: 'platform_auth.listing.edit',
        href: '/platform_auth/listing/edit',
        isShowCurrent: true,
        plat: ['fbo'],
        hidden: true,
      },
      {
        label: 'platform_auth.mailpool',
        key: 'platform_auth.mailpool',
        href: '/platform_auth/mailpool',
        plat: ['fbo'],
      },
    ],
  },
];

export const SettingsMenus = [
  {
    label: 'events.label',
    key: 'events',
    href: '/events-setting',
    i18n: 'i18n_events',
    isNotSetting: true,
    subMenus: [
      {
        label: 'events.receiver',
        key: 'events.receiver',
        href: '/events-setting',
      },
      {
        label: 'events.logs',
        key: 'events.logs',
        href: '/events-setting/logs',
      },
    ],
  },
  {
    label: 'rate.label',
    key: 'rate',
    href: '/rate/delivery',
    i18n: 'i18n_rate',
    subAgent: 'rate.list',
    isNotSetting: true,
    subMenus: [
      {
        label: 'rate.list',
        key: 'rate.list',
        href: '/rate/[mode]',
        as: '/rate/delivery',
        confs: {
          actions: Actions.RateList,
        },
      },
      {
        label: 'rate.storage_label',
        key: 'rate.storage',
        href: '/rate/[mode]',
        as: '/rate/storage',
      },
      {
        label: 'rate.fuel_label',
        key: 'rate.fuel',
        href: '/rate/[mode]',
        as: '/rate/fuel',
      },
      {
        label: 'rate.week_charge',
        key: 'rate.week_charge',
        href: '/rate/[mode]',
        as: '/rate/week_charge',
        confs: {
          actions: Actions.WeekChargeList,
        },
      },
      {
        label: 'rate.create',
        // {
        //   delivery: 'rate.create_delivery',
        //   storage: 'rate.create_storage',
        // },
        key: 'rate.create',
        href: '/rate/[mode]/create',
        isShowCurrent: true,
      },
      {
        label: 'rate.detail',
        key: 'rate.detail',
        href: '/rate/[mode]/[id]',
        isShowCurrent: true,
      },
    ],
  },
  {
    label: 'quota.management',
    key: 'quota',
    i18n: 'i18n_quota',
    href: '/quota',
    isNotSetting: true,
    subMenus: [
      {
        label: 'quota.list',
        key: 'quota.viewer',
        href: '/quota',
      },
      {
        label: 'quota.pub_config_center',
        key: 'quota.pub_config_center',
        href: '/quota/pub_config_center',
      },
      {
        label: 'quota.add',
        key: 'quota.add',
        href: '/quota/[action]',
        as: '/quota/add',
        isShowCurrent: true,
      },
      {
        label: 'quota.edit',
        key: 'quota.edit',
        href: '/quota/edit/[id]',
        isShowCurrent: true,
      },
    ],
  },
];

export const AllMenus: any = [...Menus, ...SettingsMenus];

const menu = { Menus, AllMenus, SettingsMenus };
export default menu;
