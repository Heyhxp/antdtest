import { CaretUpOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface Props {
  callbackFn;
  recordId;
  txt?;
}

const ViewDetailBtn = ({ callbackFn, recordId, txt }: Props) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  const expandRow = () => {
    const idx = expandedRowKeys?.findIndex((i) => recordId === i);
    const nextExpandKeys = expandedRowKeys.slice();
    if (idx === -1) {
      nextExpandKeys.push(recordId);
    } else {
      nextExpandKeys.splice(idx, 1);
    }
    setExpandedRowKeys(nextExpandKeys);
    callbackFn(nextExpandKeys);
  };

  return (
    <a onClick={() => expandRow()}>
      {txt}
      <CaretUpOutlined rotate={expandedRowKeys.includes(recordId) ? 0 : 180} />
    </a>
  );
};

export { ViewDetailBtn };
