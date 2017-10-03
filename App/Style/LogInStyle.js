import { StyleSheet } from 'react-native';

const LogInStyle = StyleSheet.create({
  page: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  body: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyElement: {
    width: '60%'
  },
});

export default LogInStyle;
