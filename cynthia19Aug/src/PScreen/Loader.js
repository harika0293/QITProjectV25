import {StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Layout} from '@ui-kitten/components';

const Loader = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 3000);
  }, []);
  return (
    <Layout style={styles.mainContainer}>
      <Layout style={styles.homeTop}>
        <Image
          style={styles.logo}
          source={require('../../assets/VigilanceAI_logo.png')}
          resizeMode="contain"
        />
        <Image
          style={styles.team}
          source={require('../../assets/animatedimg.gif')}
        />
      </Layout>
    </Layout>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#fff',
  },
  homeTop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    height: 180,
    width: 100,
    aspectRatio: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  team: {
    height: 300,
    width: 200,
    aspectRatio: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});
