import { Col, Row, Spin } from 'antd';

const fileTypes = [
  { key: 'pod_files', label: 'pods', type: 'pods' },
  {
    key: 'tally_report_files',
    label: 'tally_report',
    type: 'tally_report',
    notDel: true,
  },
  { key: 'other_files', label: 'others', type: 'others' },
];
const InboundListExpend = ({ data, callbackFn, loading, editAble }) => {
  //   const [detailDatas, setDetailDatas] = useState(data);

  //   useEffect(() => {
  //     setDetailDatas(data);
  //   }, [data]);

  //   const delFile = async (file, type) => {
  //     callbackFn(data.id);
  //     try {
  //       await ApiInbound.DelFile({ id: file.id, type });
  //       const detailes = await ApiInbound.Detail({ id: data.id });
  //       setDetailDatas(detailes);
  //       message.success(t('common:action.success', { action: t('common:deleteFile') }));
  //     } catch (error: any) {
  //       message.error(
  //         t('common:action.failed', { action: t('common:deleteFile') }) +
  //           (error?.response?.data?.msg || ''),
  //       );
  //     }
  //     callbackFn(null);
  //   };

  return (
    <Spin spinning={false}>
      <Row>
        {fileTypes?.map((i) => (
          <Col key={i.key} span={24 / (fileTypes?.length || 1)}>
            <p style={{ textAlign: 'center' }}>
              {/* {i.label}
              {!!datas?.[i.key]?.length && updateRender} */}
              {i.label}
            </p>
            {/* 弹窗式的下载直接用a标签更直接 */}
            {/* 删除内容按钮的功能可观察效果后判断 */}
            <a href="" download>
              下载测试
            </a>
            {/* 这部分的数据是通过lable 获取显示用来 展示，下载，删除组件部分 TODO */}
            {/* {datas?.[i.key]?.length
              ? datas?.[i.key]?.map((item) => (
                  <FileItem
                    t={t}
                    key={item.id}
                    name={t('common:file-name', { name: i.label })}
                    file={item}
                    delFn={delFn && !i.notDel && ((file) => delFn(file, i.type))}
                  />
                ))
              : uploadRender} */}
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default InboundListExpend;
