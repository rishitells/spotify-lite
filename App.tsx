/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import Buffer from 'buffer';
import {SafeAreaView, StyleSheet, FlatList, StatusBar} from 'react-native';

import ListItem from './src/components/listItem/ListItem';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const clientId = '8ec49d2d8ee94bb499ffe6777a3b7754';
    const clientSecret = 'a26d689065cf4d78aba42b77312e53e5';
    const encodedAuth = new Buffer.Buffer(
      `${clientId}:${clientSecret}`,
    ).toString('base64');
    let accessToken: string;

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
      body: 'grant_type=client_credentials',
    })
      .then((res) => res.json())
      .then((res) => {
        accessToken = res.access_token;
      })
      .then(() => {
        fetch('https://api.spotify.com/v1/browse/categories', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setCategories(res.categories.items);
          });
      });
  }, []);

  const renderItem = ({item}: {item: {id: string; name: string}}) => {
    console.log('AAAAAA', item);
    return <ListItem title={item.name} />;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item: {id: string}) => item.id}
        />
        {/*<ScrollView*/}
        {/*  contentInsetAdjustmentBehavior="automatic"*/}
        {/*  style={styles.scrollView}>*/}
        {/*  <Text style={styles.sectionTitle}>Categories</Text>*/}
        {/*  {global.HermesInternal == null ? null : (*/}
        {/*    <View style={styles.engine}>*/}
        {/*      <Text style={styles.footer}>Engine: Hermes</Text>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*  <View style={styles.body}>*/}
        {/*    <View style={styles.sectionContainer}>*/}
        {/*      <Text style={styles.sectionTitle}>Step One</Text>*/}
        {/*      {categories.map((category) => {*/}
        {/*        return <Text style={styles.highlight}>{category.name}</Text>;*/}
        {/*      })}*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</ScrollView>*/}
      </SafeAreaView>
    </>
  );
};

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
