import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 100,
    width: 100,
    position: 'relative',
    marginRight: 20,
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  newContainer: {
    position: 'absolute',
    top: -15,
    right: -15,
    height: 30,
    width: 30,
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newContainerText: {
    fontSize: 10,
  },
  cardWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardMiddleWrap: {
    flexDirection: 'row',
  },
  cardBottomWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
