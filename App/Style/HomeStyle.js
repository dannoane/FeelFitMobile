import { StyleSheet, Dimensions } from 'react-native';

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  controllers: {
    flex: 1,
    flexDirection: 'row'
  },
  controller: {
    width: '50%',
    backgroundColor: '#4286f4'
  },
  gridText: {
    fontWeight: '900',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1
  },
  grid: {
    flex: 2,
    flexDirection: 'row'
  },
  smallGrid: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default HomeStyle;
