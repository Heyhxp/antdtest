import { ProFormSelect, ProFormText } from '@ant-design/pro-components';

type formTyp = 'select' | 'text' | 'number' | 'datepicker' | 'time' | 'customer';
interface IRenderItem {
  type: formTyp;
  name: string;
  [key: string]: any;
}
export const renderItem = (props: IRenderItem) => {
  const { type, name, ...otherProps } = props;

  return (
    <>
      {type && type === 'select' && <ProFormSelect name={name} {...otherProps} />};
      {type && type === 'text' && <ProFormText name={name} {...otherProps} />};
      {type && type === 'number' && <ProForm name={name} {...otherProps} />};
      {type && type === 'datepicker' && <ProFormText name={name} {...otherProps} />};
      {type && type === 'time' && <ProFormText name={name} {...otherProps} />};
      {type && type === 'customer' && <ProFormText name={name} {...otherProps} />};
    </>
  );
};
