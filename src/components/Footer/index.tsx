import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'opene web',
          title: 'Opene intelligent fulfillment platform for medium and large items',
          href: 'https://opene.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
