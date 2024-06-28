import { history, useIntl } from '@umijs/max';
import { Button, Result } from 'antd';

const NoFoundPage = () => {
  const goback = () => {
    history.back();
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle={useIntl().formatMessage({ id: 'pages.404.subTitle' })}
      extra={
        <Button type="primary" onClick={goback}>
          {useIntl().formatMessage({ id: 'pages.404.buttonText' })}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
