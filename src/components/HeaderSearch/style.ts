import { createStyles } from 'antd-style';

export default createStyles(() => ({
  container: {
    background: '#FFF',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSearch: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  input: {
    width: '0',
    minWidth: '0',
    overflow: 'hidden',
    background: '#fff',
    // borderRadius: '20',
    transition: 'width 0.3s, margin-left 0.3s',
    input: { boxShadow: 'none !important' },
  },
  show: { width: '210px', borderRadius: '20px', height: '34px' },
}));
