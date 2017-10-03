import { StyleSheet } from 'react-native';

const SignUpStyle = StyleSheet.create({
  page: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyElement: {
    width: '60%'
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default SignUpStyle;
