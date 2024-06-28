import { useIntl } from '@umijs/max';
import { Tabs } from 'antd';
// import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import './style.less';
const { TabPane } = Tabs;
export const CustomerHeaderTabs = ({
  isKeep,
  keepElements,
  navigate,
  dropByCacheKey,
  local,
  activeKey,
  refreshTab,
  // dropLeftTabs,
  // dropRightTabs,
  // dropOtherTabs,
  // updateTab,
}: any) => {
  const intl = useIntl();
  return (
    <div className="rumtime-keep-alive-tabs-layout" hidden={!isKeep}>
      <Tabs
        hideAdd
        onChange={(key: string) => {
          navigate(key);
        }}
        activeKey={activeKey}
        type="editable-card"
        onEdit={(targetKey: string) => {
          const pathList = Object.keys(keepElements.current);
          if (pathList.length === 1) {
            // message.info('至少要保留一个窗口');
            // 弄人最后关闭时的页面为首页
            dropByCacheKey(targetKey);
            navigate('/index');
            return;
          }
          dropByCacheKey(targetKey);
          if (targetKey === activeKey) {
            // 删除当前选中的tab时:
            // 1.如果当前tab是第一个时自动选中后一个
            // 2.不是第一个时自动选中前一个
            const i = pathList.indexOf(targetKey);
            if (pathList.length === 1 && i === 0) {
              return;
            }
            navigate(pathList[i === 0 ? i + 1 : i - 1]);
          }
        }}
      >
        {Object.entries(keepElements.current).map(([pathname]: any, element) => (
          <TabPane
            tab={
              <ContextMenuTrigger
                id="same_unique_identifier"
                collect={(p) => {
                  return { path: pathname };
                }}
              >
                {intl.formatMessage({
                  id: `menu${pathname.replaceAll('/', '.')}`,
                  defaultMessage: 'The Page Not Found',
                })}
              </ContextMenuTrigger>
            }
            key={pathname}
          ></TabPane>
        ))}
      </Tabs>
      {/* 右键菜单 */}
      <ContextMenu id="same_unique_identifier" className="contextmenustyle">
        <MenuItem
          className="contextItem"
          // data={{ local: activeKey }}
          onClick={(_e, data) => {
            navigate(data?.path);
            refreshTab(data?.path);
          }}
        >
          {intl.formatMessage({ id: 'tabs.refresh' })}
        </MenuItem>
        {/* <MenuItem
          className="contextItem"
          data={{ local: activeKey }}
          onClick={(_e, data) => {
            navigate(data?.path);
            dropRightTabs(data.path);
          }}
        >
          {intl.formatMessage({ id: 'tabs.close.right' })}
        </MenuItem>
        <MenuItem
          className="contextItem"
          data={{ local: activeKey }}
          onClick={(_e, data) => {
            navigate(data?.path);
            dropLeftTabs(data.path);
          }}
        >
          {intl.formatMessage({ id: 'tabs.close.left' })}
        </MenuItem>
        <MenuItem
          className="contextItem"
          data={{ local: activeKey }}
          onClick={(_e, data) => {
            navigate(data?.path);
            dropOtherTabs(data.path);
          }}
        >
          {intl.formatMessage({ id: 'tabs.close.others' })}
        </MenuItem> */}
      </ContextMenu>
    </div>
  );
};

{
  /* <ContextMenuTrigger id="same_unique_identifier"></ContextMenuTrigger>
      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 1</MenuItem>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 2</MenuItem>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 3</MenuItem>
      </ContextMenu> */
}
