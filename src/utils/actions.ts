type platProps = 'fba' | 'fbo' | 'pv';

type ActionProps = {
  value?: string | boolean | number;
  label: string;
  plat?: [platProps?, platProps?, platProps?];
};

export const Product = (t): ActionProps[] => [
  { value: 'product.add', label: t('action.add'), plat: ['fbo', 'pv', 'fba'] },
  { value: 'product.edit', label: t('action.edit'), plat: ['fbo', 'pv'] },
  { value: 'product.delete', label: t('common:delete'), plat: ['fbo', 'pv'] },
  // { value: 'product.print', label: t('action.print'), plat: ['fbo', 'pv'] },
  { value: 'product.detail', label: t('action.detail'), plat: ['fbo', 'pv', 'fba'] },
  // { value: 'fnsku', label: 'FnSku', plat: ['fbo'] },
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv', 'fba'] },
];
// export const Ages = (t): ActionProps[] => [{ value: 'export', label: t('common:export'), plat: ['fbo', 'pv', 'fba'] }];
export const Inventory = (t): ActionProps[] => [
  { value: 'update', label: t('update.title'), plat: ['fbo'] },
  { value: 'stock_size_import', label: t('action.stock_size_import'), plat: ['fbo'] },
];
export const InventoryTransfer = (t): ActionProps[] => [
  { value: 'add', label: t('common:upload_single_label'), plat: ['fbo'] },
  { value: 'import', label: t('common:upload_batch_label'), plat: ['fbo'] },
  { value: 'cancel', label: t('common:revoke'), plat: ['fbo'] },
];
export const Ages = (t): ActionProps[] => [
  { value: 'import', label: t('action.stock_delay_cal_import'), plat: ['fbo'] },
  { value: 'update_delay_days', label: t('action.update_delay_days'), plat: ['fbo'] },
];

export const RunReport = (t): ActionProps[] => [
  { value: 'create', label: t('update.title'), plat: ['fbo', 'pv'] },
];
export const Order = (t): ActionProps[] => [
  { value: 'order.logs', label: t('action.logs'), plat: ['fbo', 'pv'] },
  { value: 'order.add', label: t('action.add'), plat: ['fbo', 'pv'] },
  // { value: 'order.add_return', label: t('action.add_return'), plat: ['fbo', 'pv'] },
  { value: 'order.edit', label: t('action.edit'), plat: ['fbo', 'pv'] },
  { value: 'order.return', label: t('action.return'), plat: ['fbo', 'pv'] },
  { value: 'order.returns', label: t('action.returns'), plat: ['fbo', 'pv'] },
  { value: 'order.detail', label: t('action.detail'), plat: ['fbo', 'pv'] },
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
  { value: 'printLabel', label: t('action.print_label'), plat: ['fbo', 'pv'] },
  { value: 'ordering', label: t('ordering.title'), plat: ['fbo', 'pv'] },
  // { value: 'force_ordering', label: t('ordering.forced_re_title'), plat: ['fbo', 'pv'] },
  // { value: 'order.act_ftp_shipping', label: t('action.act_ftp_shipping'), plat: ['fbo'] },
  { value: 'order.cancel', label: t('action.cancel'), plat: ['fbo', 'pv'] },
  // { value: 'order.cancelled_notfoundinventory', label: t('action.cancelled_notfoundinventory'), plat: ['fbo'] },
  // { value: 'order.cancelled_damaged', label: t('action.cancelled_damaged'), plat: ['fbo'] },
  { value: 'order.import_tracking_code', label: t('action.batch_update'), plat: ['fbo'] },
  { value: 'order.import_label', label: t('action.import_label'), plat: ['fbo'] },
  { value: 'order.rollback_cancelled', label: t('action.rollback'), plat: ['fbo'] },
  { value: 'export_rated', label: t('action.export_rated'), plat: ['fbo'] },
  { value: 'export_track', label: t('action.export_track'), plat: ['fbo'] },
  // { value: 're_rated', label: t('action.re_rated'), plat: ['fbo'] },
  // { value: 'order.shipment_report', label: t('action.g_shipment_report'), plat: ['fbo'] },
  { value: 'order.pod_download', label: t('action.pod_download'), plat: ['fbo'] },
  { value: 'order.tracking_images', label: t('action.tracking_images'), plat: ['fbo'] },
];

export const Standard = (t): ActionProps[] => [
  // { value: 'order.logs', label: t('action.logs'), plat: ['fbo', 'pv'] },
  { value: 'order.add', label: t('action.add'), plat: ['fbo', 'pv'] },
  // { value: 'order.import', label: t('action.import'), plat: ['fbo', 'pv'] },
  { value: 'order.edit', label: t('action.edit'), plat: ['fbo', 'pv'] },
  { value: 'order.return', label: t('action.return'), plat: ['fbo', 'pv'] },
  { value: 'order.returns', label: t('action.returns'), plat: ['fbo', 'pv'] },
  // { value: 'order.detail', label: t('action.detail'), plat: ['fbo', 'pv'] },
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
  // { value: 'printLabel', label: t('action.print_label'), plat: ['fbo', 'pv'] },
  // { value: 'ordering', label: t('ordering.title'), plat: ['fbo', 'pv'] },
  { value: 'order.cancel', label: t('action.cancel'), plat: ['fbo', 'pv'] },
  // { value: 'order.import_tracking_code', label: t('action.batch_update'), plat: ['fbo'] },
  // { value: 'order.import_label', label: t('action.import_label'), plat: ['fbo'] },
  // { value: 'order.rollback_cancelled', label: t('action.rollback'), plat: ['fbo'] },
  { value: 'order.title_force_title', label: t('action.title_force_title'), plat: ['fbo'] },
  { value: 'export_rated', label: t('action.export_rated'), plat: ['fbo'] },
  { value: 'export_track', label: t('action.export_track'), plat: ['fbo'] },
  { value: 'order.pod_download', label: t('action.pod_download'), plat: ['fbo'] },
  { value: 'order.tracking_images', label: t('action.tracking_images'), plat: ['fbo'] },
];

export const CRMCallList = (t): ActionProps[] => [
  { value: 'add', label: t('common:add'), plat: ['fbo'] },
  { value: 'all', label: t('action.all'), plat: ['fbo'] },
];
export const CMSbooking = (t): ActionProps[] => [
  { value: 'info', label: t('common:view_detail'), plat: ['fbo'] },
  { value: 'add', label: t('common:add'), plat: ['fbo'] },
  { value: 'cancel', label: t('common:cancel'), plat: ['fbo'] },
  { value: 'export', label: t('common:export'), plat: ['fbo'] },
  { value: 'all', label: t('action.all'), plat: ['fbo'] },
];
export const OrderOutbound = (t): ActionProps[] => [
  { value: 'info', label: t('common:view_detail'), plat: ['fbo'] },
  { value: 'add', label: t('common:add'), plat: ['fbo'] },
  { value: 'cancel', label: t('common:cancel'), plat: ['fbo'] },
  { value: 'export', label: t('common:export'), plat: ['fbo'] },
  { value: 'all', label: t('action.all'), plat: ['fbo'] },
];
export const InventoryList = (t): ActionProps[] => [
  { value: 'info', label: t('common:view_detail'), plat: ['fbo'] },
  { value: 'export', label: t('common:export'), plat: ['fbo'] },
  { value: 'all', label: t('action.all'), plat: ['fbo'] },
];
export const CRMDuplicateChecking = (t): ActionProps[] => [
  { value: 'all', label: t('action.all'), plat: ['fbo'] },
];
export const CRMList = (t): ActionProps[] => [
  { value: 'add', label: t('common:add'), plat: ['fbo'] },
  { value: 'edit', label: t('common:edit'), plat: ['fbo'] },
  { value: 'all', label: t('action.all'), plat: ['fbo'] },
  { value: 'freed', label: t('action.freed'), plat: ['fbo'] },
];
export const CRMHighSeasList = (t): ActionProps[] => [
  { value: 'info', label: t('action.info'), plat: ['fbo'] },
  { value: 'claim', label: t('action.claim'), plat: ['fbo'] },
  { value: 'approval', label: t('action.approval'), plat: ['fbo'] },
];

export const OrderTransfer = (t): ActionProps[] => [
  { value: 'order.transfer.logs', label: t('action.logs'), plat: ['fbo'] },
  { value: 'order.transfer.add', label: t('action.add'), plat: ['fbo'] },
  { value: 'order.transfer.outbound', label: t('action.outbound'), plat: ['fbo'] },
  { value: 'order.transfer.edit', label: t('action.edit'), plat: ['fbo'] },
  { value: 'order.transfer.detail', label: t('action.detail'), plat: ['fbo'] },
  { value: 'order.transfer.confirm', label: t('action.confirm'), plat: ['fbo'] },
  // { value: 'order.transfer.force_ordering', label: t('ordering.forced_re_title'), plat: ['fbo', 'pv'] },
  { value: 'order.transfer.cancel', label: t('action.cancel'), plat: ['fbo'] },
  { value: 'order.transfer.shipCancel', label: t('action.shipCancel'), plat: ['fbo'] },
  { value: 'order.transfer.push', label: '推送至WMS', plat: ['fbo'] },
  { value: 'order.transfer.real_product_label', label: '审核产品标签', plat: ['fbo'] },
  { value: 'order.transfer.pod_download', label: t('action.pod_download'), plat: ['fbo'] },
  { value: 'order.transfer.tracking_images', label: t('action.tracking_images'), plat: ['fbo'] },
];

export const OutboundOrderTransfer = (t): ActionProps[] => [
  { value: 'order.transfer.add', label: t('actions.add'), plat: ['fbo'] },
  { value: 'order.transfer.edit', label: t('actions.edit'), plat: ['fbo'] },
  { value: 'order.transfer.detail', label: t('actions.detail'), plat: ['fbo'] },
  { value: 'order.transfer.logs', label: t('actions.logs'), plat: ['fbo'] },
  { value: 'order.transfer.cancel', label: t('actions.cancel'), plat: ['fbo'] },
  { value: 'order.transfer.tracking_images', label: t('actions.tracking_images'), plat: ['fbo'] },
];

export const OutboundOrderSelfpick = (t): ActionProps[] => [
  { value: 'order.selfpick.add', label: t('actions.add'), plat: ['fbo'] },
  { value: 'order.selfpick.edit', label: t('actions.edit'), plat: ['fbo'] },
  { value: 'order.selfpick.detail', label: t('actions.detail'), plat: ['fbo'] },
  { value: 'order.selfpick.logs', label: t('actions.logs'), plat: ['fbo'] },
  { value: 'order.selfpick.confirm', label: t('actions.confirm'), plat: ['fbo'] },
  { value: 'order.selfpick.cancel', label: t('actions.cancel'), plat: ['fbo'] },
  { value: 'order.selfpick.tracking_images', label: t('actions.tracking_images'), plat: ['fbo'] },
];
//
export const OrderNonstandarOne = (t): ActionProps[] => [
  { value: 'order.nonstandardone.add', label: t('action.add'), plat: ['fbo'] },
  { value: 'order.nonstandardone.edit', label: t('action.edit'), plat: ['fbo'] },
  { value: 'order.nonstandardone.export', label: t('action.export'), plat: ['fbo'] },
  { value: 'order.nonstandardone.cancel', label: t('action.cancel'), plat: ['fbo'] },
  { value: 'order.nonstandardone.hold_release', label: t('action.hold_release'), plat: ['fbo'] },
  {
    value: 'order.nonstandardone.title_force_title',
    label: t('action.title_force_title'),
    plat: ['fbo'],
  },
  { value: 'order.nonstandardone.batch_import', label: t('action.batch_import'), plat: ['fbo'] },
];

export const OrderNonstandarTwo = (t): ActionProps[] => [
  { value: 'order.nonstandardtwo.add', label: t('action.add'), plat: ['fbo'] },
  { value: 'order.nonstandardtwo.edit', label: t('action.edit'), plat: ['fbo'] },
  { value: 'order.nonstandardtwo.export', label: t('action.export'), plat: ['fbo'] },
  { value: 'order.nonstandardtwo.cancel', label: t('action.cancel'), plat: ['fbo'] },
  {
    value: 'order.nonstandardtwo.title_force_title',
    label: t('action.title_force_title'),
    plat: ['fbo'],
  },
  { value: 'order.nonstandardtwo.import_label', label: t('action.import_label'), plat: ['fbo'] },
  { value: 'order.nonstandardtwo.batch_import', label: t('action.batch_import'), plat: ['fbo'] },
  // { value: 'order.nonstandardtwo.return', label: t('action.return'), plat: ['fbo', 'pv'] },
  // { value: 'order.nonstandardtwo.returns', label: t('action.returns'), plat: ['fbo', 'pv'] },
];

export const Mtw = (t): ActionProps[] => [
  { value: 'order.mtw.add', label: t('action.add'), plat: ['fbo'] },
  { value: 'order.mtw.detail', label: t('action.detail'), plat: ['fbo'] },
  { value: 'order.mtw.cancel', label: t('action.cancel'), plat: ['fbo'] },
  { value: 'order.mtw.confirm', label: t('action.confirm'), plat: ['fbo'] },
  // { value: 'order.mtw.force_ordering', label: t('ordering.forced_re_title'), plat: ['fbo', 'pv'] },
];

export const OrderPvTransfer = (t): ActionProps[] => [
  { value: 'order.transfer_box.logs', label: t('action.logs'), plat: ['fbo'] },
  { value: 'order.transfer_box.add', label: t('action.add'), plat: ['fbo'] },
  { value: 'order.transfer_box.outbound', label: t('action.outbound'), plat: ['fbo'] },
  { value: 'order.transfer_box.edit', label: t('action.edit'), plat: ['fbo'] },
  { value: 'order.transfer_box.detail', label: t('action.detail'), plat: ['fbo'] },
  { value: 'order.transfer_box.pack', label: t('action.transfer_pack'), plat: ['fbo'] },
  // { value: 'order.transfer.confirm', label: t('action.confirm'), plat: ['fbo'] },
  { value: 'order.transfer_box.cancel', label: t('action.cancel'), plat: ['fbo'] },
  {
    value: 'order.transfer_box.tracking_images',
    label: t('action.tracking_images'),
    plat: ['fbo'],
  },
  // { value: 'order.transfer.pack', label: t('action.transfer_pack'), plat: ['fbo'] },
];

export const FedexEClaimReport = (t): ActionProps[] => [
  { value: 'order.fedex_eclaim_report.export', label: t('common:export'), plat: ['fbo'] },
];

export const FedexEClaim = (t): ActionProps[] => [
  { value: 'order.fedex_eclaim.add', label: '添加/编辑Claim', plat: ['fbo'] },
  { value: 'order.fedex_eclaim.detail', label: t('action.detail'), plat: ['fbo'] },
  { value: 'order.fedex_eclaim.delete', label: t('common:delete'), plat: ['fbo'] },
  { value: 'order.fedex_eclaim.import', label: t('common:upload_batch_label'), plat: ['fbo'] },
];

export const FedexEClaimMgt = (): ActionProps[] => [
  { value: 'order.fedex_eclaim_mgt.process', label: '运营处理', plat: ['fbo'] },
  { value: 'order.fedex_eclaim_mgt.confirm', label: '财务确认', plat: ['fbo'] },
  { value: 'order.fedex_eclaim_mgt.log', label: '查看日志', plat: ['fbo'] },
  { value: 'order.fedex_eclaim_mgt.remark', label: '备注', plat: ['fbo'] },
];

export const FedexTrack = (t): ActionProps[] => [
  { value: 'order.fedex_track.add', label: t('common:add'), plat: ['fbo'] },
  { value: 'order.fedex_track.detail', label: t('common:view_detail'), plat: ['fbo'] },
  { value: 'order.fedex_track.delete', label: t('common:delete'), plat: ['fbo'] },
];
export const FedexTrackMgt = (t): ActionProps[] => [
  { value: 'order.fedex_track_mgt.import', label: t('common:import'), plat: ['fbo'] },
  { value: 'order.fedex_track_mgt.detail', label: t('common:view_detail'), plat: ['fbo'] },
  { value: 'order.fedex_track_mgt.handle', label: t('common:handle'), plat: ['fbo'] },
  { value: 'order.fedex_track_mgt.archive', label: t('action.archive'), plat: ['fbo'] },
  { value: 'order.fedex_track_mgt.changeStatus', label: t('common:change_status'), plat: ['fbo'] },
];

export const OrderDelivery = (t): ActionProps[] => [
  { value: 'order.order_delivery.logs', label: t('action.logs'), plat: ['fbo'] },
  { value: 'order.order_delivery.add', label: t('action.add'), plat: ['fbo', 'pv'] },
  {
    value: 'order.order_delivery.add_label_only',
    label: t('action.add_label_only'),
    plat: ['fbo', 'pv'],
  },
  { value: 'order.order_delivery.cancel', label: t('action.cancel'), plat: ['fbo', 'pv'] },
  { value: 'order.order_delivery.confirm', label: t('ordering.title'), plat: ['fbo', 'pv'] },
  // { value: 'order.order_delivery.force_ordering', label: t('ordering.forced_re_title'), plat: ['fbo', 'pv'] },
  { value: 'order.order_delivery.zip', label: t('action.export_print_label'), plat: ['fbo', 'pv'] },
  { value: 'order.order_delivery.pod_download', label: t('action.pod_download'), plat: ['fbo'] },
  {
    value: 'order.order_delivery.tracking_images',
    label: t('action.tracking_images'),
    plat: ['fbo'],
  },
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
];

export const ReturnOrder = (t): ActionProps[] => [
  { value: 'return_center.return.logs', label: t('action.logs'), plat: ['fbo'] },
  { value: 'return_center.return.add', label: t('action.add'), plat: ['fbo', 'pv'] },
  { value: 'return_center.return.supplement', label: t('action.supplement'), plat: ['fbo', 'pv'] },
  {
    value: 'return_center.return.add_label_only',
    label: t('action.add_label_only'),
    plat: ['fbo', 'pv'],
  },
  { value: 'return_center.return.cancel', label: t('action.cancel'), plat: ['fbo', 'pv'] },
  { value: 'return_center.return.confirm', label: t('action.ordering'), plat: ['fbo', 'pv'] },
  { value: 'return_center.return.zip', label: t('action.export_print_label'), plat: ['fbo', 'pv'] },
  { value: 'return_center.return.pod_download', label: t('action.pod_download'), plat: ['fbo'] },
  {
    value: 'return_center.return.tracking_images',
    label: t('action.tracking_images'),
    plat: ['fbo'],
  },
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
];
export const ReturnInboundDetails = (t): ActionProps[] => [
  {
    value: 'return_center.return_inbound_details.delete',
    label: t('action.delete'),
    plat: ['fbo'],
  },
];
export const OrderAnalysis = (t): ActionProps[] => [
  { value: 'order.order_analysis.rated_daily', label: t('action.rated_daily'), plat: ['fbo'] },
  { value: 'order.order_analysis.rated_monthly', label: t('action.rated_monthly'), plat: ['fbo'] },
  { value: 'order.order_analysis.rated_zone', label: t('action.rated_zone'), plat: ['fbo'] },
  { value: 'order.order_analysis.rated_weight', label: t('action.rated_weight'), plat: ['fbo'] },
  { value: 'order.order_analysis.rated_ahs', label: t('action.rated_ahs'), plat: ['fbo'] },
  { value: 'order.order_analysis.rated_remote', label: t('action.rated_remote'), plat: ['fbo'] },
  { value: 'order.order_analysis.rated_backend', label: t('action.rated_backend'), plat: ['fbo'] },
  { value: 'order.order_analysis.service_type', label: t('action.service_type'), plat: ['fbo'] },
  { value: 'order.order_analysis.b2c_stat', label: t('action.b2c_stat'), plat: ['fbo'] },
  { value: 'order.order_analysis.stat', label: t('action.stat'), plat: ['fbo'] },
  { value: 'order.order_analysis.order_stat', label: t('order_stat'), plat: ['fbo'] },
];
export const OrderAnalysisWar = (t): ActionProps[] => [
  { value: 'order.order_analysis_war.rated_daily', label: t('action.rated_daily'), plat: ['fbo'] },
  {
    value: 'order.order_analysis_war.rated_monthly',
    label: t('action.rated_monthly'),
    plat: ['fbo'],
  },
  { value: 'order.order_analysis_war.rated_zone', label: t('action.rated_zone'), plat: ['fbo'] },
  {
    value: 'order.order_analysis_war.rated_weight',
    label: t('action.rated_weight'),
    plat: ['fbo'],
  },
  { value: 'order.order_analysis_war.rated_ahs', label: t('action.rated_ahs'), plat: ['fbo'] },
  {
    value: 'order.order_analysis_war.rated_remote',
    label: t('action.rated_remote'),
    plat: ['fbo'],
  },
  {
    value: 'order.order_analysis_war.rated_backend',
    label: t('action.rated_backend'),
    plat: ['fbo'],
  },
  {
    value: 'order.order_analysis_war.service_type',
    label: t('action.service_type'),
    plat: ['fbo'],
  },
  { value: 'order.order_analysis_war.b2c_stat', label: t('action.b2c_stat'), plat: ['fbo'] },
  { value: 'order.order_analysis_war.stat', label: t('action.stat'), plat: ['fbo'] },
  { value: 'order.order_analysis_war.order_stat', label: t('order_stat'), plat: ['fbo'] },
  {
    value: 'order.order_analysis_war.stat_pickup_location',
    label: t('action.stat_pickup_location'),
    plat: ['fbo'],
  },
  {
    value: 'order.order_analysis_war.omsbi_pickup_location',
    label: t('action.omsbi_pickup_location'),
    plat: ['fbo'],
  },
];
export const FeeAdjust = (t): ActionProps[] => [
  { value: 'order.fee_adjust.import', label: t('action.fee_adjust_import'), plat: ['fbo', 'pv'] },
  { value: 'order.fee_adjust.cfg', label: t('action.fee_adjust_cfg'), plat: ['fbo', 'pv'] },
];

export const InboundNotice = (t): ActionProps[] => [
  { value: 'inbound_notice.add', label: t('add'), plat: ['fbo', 'pv', 'fba'] },
  // { value: 'inbound_notice.import', label: t('import'), plat: ['fbo', 'pv', 'fba'] },
  { value: 'inbound_notice.edit-putype', label: t('edit-puttype'), plat: ['fbo', 'pv', 'fba'] },
  { value: 'inbound_notice.cancel', label: t('common:cancel'), plat: ['fbo', 'pv', 'fba'] },
  { value: 'inbound_notice.print', label: t('common:print'), plat: ['fbo', 'pv', 'fba'] },
  { value: 'inbound_notice.notify', label: t('inboundNotify'), plat: ['fbo', 'pv', 'fba'] },
  {
    value: 'inbound_notice.batchNotify',
    label: t('batchInboundNotify'),
    plat: ['fbo', 'pv', 'fba'],
  },
  {
    value: 'inbound_notice.inbound_receipt',
    label: t('inbound_receipt'),
    plat: ['fbo', 'pv', 'fba'],
  },
  { value: 'inbound_notice.inbound_tally', label: t('inbound_tally'), plat: ['fbo', 'pv', 'fba'] },
];
export const Container = (t): ActionProps[] => [
  { value: 'update_status', label: t('update_asn'), plat: ['fbo', 'pv'] },
];
export const Inbound = (t): ActionProps[] => [
  { value: 'inbound.add', label: t('import'), plat: ['fbo', 'pv'] },
  { value: 'inbound.edit', label: t('edit'), plat: ['fbo', 'pv'] },
  { value: 'inbound.detail', label: t('detail.title'), plat: ['fbo', 'pv'] },
];
export const AdjustDim = (t): ActionProps[] => [
  { value: 'inbound.adjust_dim.add', label: t('common:add'), plat: ['fbo', 'pv'] },
];
export const TallyReport = (t): ActionProps[] => [
  {
    value: 'inbound.tally_report.download',
    label: t('tallyReportDetail.download'),
    plat: ['fbo', 'pv'],
  },
  {
    value: 'inbound.tally_report.detail',
    label: t('tallyReportDetail.title'),
    plat: ['fbo', 'pv'],
  },
  {
    value: 'inbound.tally_report.delete',
    label: t('tallyReportDetail.delete'),
    plat: ['fbo', 'pv'],
  },
  { value: 'inbound.tally_report.reset', label: t('tallyReportDetail.reset'), plat: ['fbo', 'pv'] },
  { value: 'inbound.tally_report.add', label: t('tallyReportDetail.add'), plat: ['fbo', 'pv'] },
  { value: 'inbound.tally_report.check', label: t('tallyReportDetail.check'), plat: ['fbo', 'pv'] },
  {
    value: 'inbound.tally_report.damage_check',
    label: t('tallyReportDetail.damage_check'),
    plat: ['fbo', 'pv'],
  },
  // { value: 'inbound.tally_report.tobe_confirmed', label: t('tallyReportDetail.tobe_confirmed'), plat: ['fbo', 'pv'] },
  // {
  //   value: 'inbound.tally_report.tobe_confirmed_detail',
  //   label: t('tallyReportDetail.tobe_confirmed_detail'),
  //   plat: ['fbo', 'pv'],
  // },
];
export const Forecast = (t): ActionProps[] => [
  { value: 'forecast.add', label: t('forecast_create'), plat: ['fbo', 'pv'] },
];
export const Outbound = (t): ActionProps[] => [
  { value: 'outbound_record.add', label: t('outbound_record.import'), plat: ['fbo', 'pv'] },
  // { value: 'outbound.edit', label: t('edit'), plat: ['fbo', 'pv'] },
  {
    value: 'outbound_record.detail',
    label: t('outbound_record.detail.title'),
    plat: ['fbo', 'pv'],
  },
];
export const Scan = (t): ActionProps[] => [
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
];
export const Warehouse = (t): ActionProps[] => [
  { value: 'warehouse.add', label: t('add'), plat: ['fbo', 'pv'] },
  { value: 'warehouse.edit', label: t('edit'), plat: ['fbo', 'pv'] },
  { value: 'warehouse.detail', label: t('detail'), plat: ['fbo', 'pv'] },
];
export const Storehouse = (t): ActionProps[] => [
  { value: 'storehouse.add', label: t('add'), plat: ['fbo', 'pv'] },
  { value: 'storehouse.edit', label: t('edit'), plat: ['fbo', 'pv'] },
  { value: 'storehouse.detail', label: t('detail'), plat: ['fbo', 'pv'] },
];

export const user = (t): ActionProps[] => [
  { value: 'account.add', label: t('user.add'), plat: ['fbo', 'pv'] },
  { value: 'account.edit', label: t('user.edit'), plat: ['fbo', 'pv'] },
  { value: 'account.changePassword', label: t('user.editPassword'), plat: ['fbo', 'pv'] },
  { value: 'account.enable', label: t('user.enable'), plat: ['fbo', 'pv'] },
  { value: 'company.add', label: t('company.add'), plat: ['fbo', 'pv'] },
  // { value: 'company.edit', label: t('company.edit'), plat: ['fbo', 'pv'] },
];

export const ShopList = (t): ActionProps[] => [
  { value: 'shoplist.add', label: t('action.add'), plat: ['fbo', 'pv'] },
  { value: 'shoplist.edit', label: t('action.edit'), plat: ['fbo', 'pv'] },
  { value: 'shoplist.active', label: t('action.active'), plat: ['fbo', 'pv'] },
];

export const AuthProduct = (t): ActionProps[] => [
  { value: 'product.async', label: t('action.async'), plat: ['fbo', 'pv'] },
];

export const AuthOrder = (t): ActionProps[] => [
  { value: 'order.pull', label: t('action.pull'), plat: ['fbo', 'pv'] },
  { value: 'order.delivery', label: t('action.delivery'), plat: ['fbo', 'pv'] },
  { value: 'order.cancel', label: t('action.cancel'), plat: ['fbo', 'pv'] },
  { value: 'order.repush', label: t('action.repush'), plat: ['fbo', 'pv'] },
];

export const Listing = (t): ActionProps[] => [
  {
    value: 'listing.tem_data',
    label: t('layout_i18n:menu.platform_auth.tem_data'),
    plat: ['fbo', 'pv'],
  },
  { value: 'listing.draft', label: t('layout_i18n:menu.platform_auth.draft'), plat: ['fbo', 'pv'] },
  { value: 'listing.list', label: t('layout_i18n:menu.platform_auth.list'), plat: ['fbo', 'pv'] },
];

export const shipmentReport = (t): ActionProps[] => [
  { value: 'deadline', label: t('deadlineAble'), plat: ['fbo', 'pv'] },
];

export const Bill = (): ActionProps[] => [
  { value: 'view-list', label: '调整账单明细', plat: ['fbo'] },
  { value: 'view-files', label: '调整文件列表', plat: ['fbo'] },
];

export const Fedex = (): ActionProps[] => [
  { value: 'fedex_download_cw', label: 'FedEx财务账单', plat: ['fbo'] },
  { value: 'fedex_pdf', label: 'PDF原始账单', plat: ['fbo'] },
];
export const RateList = (): ActionProps[] => [
  { value: 'rate.add', label: '添加费率', plat: ['fbo'] },
  { value: 'rate.detail', label: '查看详情', plat: ['fbo'] },
  { value: 'rate.cost_add', label: '添加成本费率', plat: ['fbo'] },
  { value: 'rate.cost_detail', label: '查看成本费率', plat: ['fbo'] },
];
export const WeekChargeList = (): ActionProps[] => [
  { value: 'add', label: '新增', plat: ['fbo'] },
  { value: 'import', label: '导入', plat: ['fbo'] },
];

export const Storage = (): ActionProps[] => [
  { value: 'add-storage-bill', label: '新增账单', plat: ['fbo'] },
  { value: 'download-storage-excel', label: '仓储费报表下载', plat: ['fbo'] },
  { value: 'delete-small-sku', label: '不计仓储sku删除', plat: ['fbo'] },
  { value: 'batchimport-small-sku', label: '不计仓储sku批量导入', plat: ['fbo'] },
  { value: 'recalculate', label: '系统统计费用重新计算', plat: ['fbo', 'pv'] },
];

export const Recharge = (): ActionProps[] => [
  { value: 'recharge', label: '充值', plat: ['fbo', 'pv'] },
  { value: 'approval', label: '审批', plat: ['fbo', 'pv'] },
];
export const Tally = (): ActionProps[] => [
  { value: 'tally_export', label: '导出入库费明细', plat: ['fbo', 'pv'] },
  { value: 'tally_report_export', label: '导出入库费', plat: ['fbo', 'pv'] },
  { value: 'recalculate', label: '入库费重新计算', plat: ['fbo', 'pv'] },
  { value: 'tally_edit', label: '编辑', plat: ['fbo', 'pv'] },
  // { value: 'cost', label: '费用成本', plat: ['fbo', 'pv'] },
];
export const Fulfillment = (): ActionProps[] => [
  { value: 'detail', label: '费用明细', plat: ['fbo', 'pv'] },
  // { value: 'cost', label: '费用成本', plat: ['fbo', 'pv'] },
];
export const Expense = (): ActionProps[] => [
  { value: 'cost', label: '费用成本', plat: ['fbo', 'pv'] },
  { value: 'cost_add', label: '费用成本-新增', plat: ['fbo', 'pv'] },
  { value: 'cost_delete', label: '费用成本-删除', plat: ['fbo', 'pv'] },
  { value: 'cost_upload', label: '费用成本-上传(旧)', plat: ['fbo', 'pv'] },
  { value: 'cost_upload_report', label: '费用成本-上传成本报表', plat: ['fbo', 'pv'] },
  { value: 'cost_export', label: '费用成本-导出', plat: ['fbo', 'pv'] },
  { value: 'cost_type', label: '成本类型', plat: ['fbo', 'pv'] },
  { value: 'cost_type_add', label: '成本类型-新增', plat: ['fbo', 'pv'] },
  { value: 'cost_type_delete', label: '成本类型-删除', plat: ['fbo', 'pv'] },
  { value: 'cost_type_export', label: '成本类型-导出', plat: ['fbo', 'pv'] },
  { value: 'supplier', label: '供应商', plat: ['fbo', 'pv'] },
  { value: 'supplier_add', label: '供应商-新增', plat: ['fbo', 'pv'] },
  { value: 'supplier_delete', label: '供应商-删除', plat: ['fbo', 'pv'] },
  { value: 'supplier_export', label: '供应商-导出', plat: ['fbo', 'pv'] },
];

export const CustomerBillManagement = (): ActionProps[] => [
  { value: 'export', label: '导出', plat: ['fbo', 'pv'] },
  { value: 'download', label: '下载-账单文件', plat: ['fbo', 'pv'] },
  { value: 'generate', label: '生成新账单', plat: ['fbo', 'pv'] },
  { value: 'settlement', label: '结账', plat: ['fbo', 'pv'] },
  { value: 'anti_settlement', label: '反结账', plat: ['fbo', 'pv'] },
  { value: 'logs', label: '操作日志', plat: ['fbo', 'pv'] },
];

export const PeriodApproval = (): ActionProps[] => [
  { value: 'add', label: '新增/删除', plat: ['fbo', 'pv'] },
  { value: 'approval', label: '审批', plat: ['fbo', 'pv'] },
];

export const BillInvoiceManagement = (): ActionProps[] => [
  { value: 'generate', label: '生成发票/重新生成', plat: ['fbo'] },
  { value: 'download', label: '下载', plat: ['fbo'] },
  { value: 'delete', label: '删除', plat: ['fbo'] },
];

export const ValueAddedService = (t): ActionProps[] => [
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
  { value: 'add', label: t('common:add'), plat: ['fbo', 'pv'] },
  { value: 'update', label: t('common:update'), plat: ['fbo', 'pv'] },
  { value: 'delete', label: t('common:delete'), plat: ['fbo', 'pv'] },
  { value: 'recalculate', label: t('action.recalculate'), plat: ['fbo', 'pv'] },
];

export const ReturnFee = (t): ActionProps[] => [
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
  { value: 'recalculate', label: t('action.recalculate'), plat: ['fbo', 'pv'] },
];
export const OtherFee = (t): ActionProps[] => [
  { value: 'otherfee_add', label: t('common:add'), plat: ['fbo', 'pv'] },
  { value: 'otherfee_delete', label: t('common:delete'), plat: ['fbo', 'pv'] },
  { value: 'otherfee_examine', label: t('common:examine'), plat: ['fbo', 'pv'] },
];

export const LiftCabinet = (t): ActionProps[] => [
  { value: 'export', label: t('common:export'), plat: ['fbo', 'pv'] },
  { value: 'update', label: t('common:update'), plat: ['fbo', 'pv'] },
  { value: 'recalculate', label: t('action.recalculate'), plat: ['fbo', 'pv'] },
  // { value: 'supplement', label: t('action.supplement'), plat: ['fbo', 'pv'] },
];
export const VAService = (): ActionProps[] => [
  { value: 'add', label: '添加增值服务', plat: ['fbo', 'pv'] },
  // { value: 'change_status', label: '变更状态', plat: ['fbo', 'pv'] },
];
