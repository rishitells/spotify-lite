import React, {useEffect, useState} from 'react';
import {FlatList, Text, SafeAreaView} from 'react-native';
import Buffer from 'buffer';

import ListItem from '../components/listItem/ListItem';

const Home = ({navigation}) => {
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
        fetch('https://api.spotify.com/v1/browse/categories?country=US', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('response received!');
            setCategories(res.categories.items);
          });
      });
  }, []);

  const renderItem = ({
    item,
  }: {
    item: {id: string; name: string; icons: []};
  }) => {
    return (
      <ListItem
        id={item.id}
        icon={item.icons[0]}
        handleClick={(id) => {
          navigation.navigate('Details', {
            id,
          });
        }}
        title={item.name}
      />
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#eeeded'}}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item: {id: string}) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;
