import {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

interface IrenderSelect {
  options: any;
  curSelectTyp: SelectTyp;
  curSelectParams: any;
  changeSelectProps: (v: any) => void;
}

export type SelectTyp = 'select' | 'text' | 'datepicker' | 'timepicker' | 'timeRange' | 'dateRange';

const RenderSelect = (props: IrenderSelect) => {
  const { options, curSelectTyp, curSelectParams, changeSelectProps } = props;
  return (
    <>
      <ProFormSelect
        name="selectTyp"
        className="filteroption"
        fieldProps={{
          dropdownStyle: { width: 160 },
          allowClear: false,
          options: options,
          value: curSelectTyp,
        }}
        onChange={(v) => changeSelectProps(v)}
      />
      <div className="filterItem">
        {curSelectParams?.type === 'select' && (
          <ProFormSelect
            name={curSelectParams.name}
            fieldProps={curSelectParams.filterProps}
            allowClear={true}
          />
        )}
        {curSelectParams?.type === 'text' && (
          <ProFormText
            name={curSelectParams.name}
            fieldProps={curSelectParams.filterProps}
            allowClear={true}
          />
        )}
        {curSelectParams?.type === 'timepicker' && (
          <ProFormDateTimePicker
            name={curSelectParams.name}
            {...curSelectParams.filterProps}
            allowClear={true}
          />
        )}
        {curSelectParams?.type === 'datepicker' && (
          <ProFormDatePicker
            name={curSelectParams.name}
            {...curSelectParams.filterProps}
            allowClear={true}
          />
        )}
        {curSelectParams?.type === 'daterange' && (
          <ProFormDateRangePicker
            name={curSelectParams.name}
            {...curSelectParams.filterProps}
            allowClear={true}
          />
        )}
        {curSelectParams?.type === 'timerange' && (
          <ProFormDateTimeRangePicker
            name={curSelectParams.name}
            {...curSelectParams.filterProps}
            allowClear={true}
          />
        )}
        {/* {curSelectParams?.type === 'dateRange' && (
          <ProFormDateTimeRangePicker
            name={curSelectParams.name}
            {...curSelectParams.filterProps}
            allowClear={true}
          />
        )} */}
      </div>
    </>
  );
};

export default RenderSelect;
