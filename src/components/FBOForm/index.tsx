import { ProForm } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

const mockColumn = [
  {
    name: 'test1', // 参数名 必填
    type: 'text', // 必填
    label: '123', // label 非必填
  },
  {
    name: 'test2', // 参数名 必填
    type: 'select', // 必填
    label: '123', // label 非必填
  },
  {
    name: 'test3', // 参数名 必填
    type: 'datapicker', // 必填
    label: '123', // label 非必填
  },
  {
    name: 'test5',
    type: 'number',
    label: '123'
  },
  {
    name: 'test4', // 参数名 必填
    type: 'customer', // 必填
    label: '123', // label 非必填
  },
];

export const FBOForm = () => {
  return (
    <ProForm>
      <Row>
        <Col></Col>
      </Row>
    </ProForm>
  );
};
