import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import './style.less';

export type BottomCollapsed = {
  collapse?: boolean;
  onCollapse?: (collapsed: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BottomCollapsed = (props: any) => {
  const [collapsed, setCollapsed] = useMergedState(props.collapse ?? false, {
    value: props?.collapse,
    onChange: props?.onCollapse,
  });
  const intl = useIntl();

  return (
    <>
      <div
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        style={{
          cursor: 'pointer',
          fontSize: '16px',
          borderTop: '1px solid #EBEEF5',
          paddingTop: '20px',
        }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined className="collapsedIcon" />
        ) : (
          <div className="textToggle">
            <span className="tt_text">
              {intl.formatMessage({ id: 'component.toggle.navigation' })}
            </span>
            <MenuFoldOutlined />
          </div>
        )}
      </div>
    </>
  );
};
