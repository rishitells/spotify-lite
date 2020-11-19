import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import Buffer from 'buffer';

const Details = ({route, navigation}) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {id: categoryId} = route.params;

  console.log('CATEGORY ID = ', categoryId);

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
        fetch(
          `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(
              'response received!',
              JSON.stringify(res.playlists.items),
            );
            setPlaylists(res.playlists.items);
            setIsLoading(false);
          });
      });
  }, [categoryId]);

  return (
    <ScrollView style={{flex: 1}}>
      {/*<Text>{JSON.stringify(playlists, null, 4)}</Text>*/}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {!isLoading &&
          playlists.map((playlist) => {
            return (
              <View
                style={{width: 130, height: 130, padding: 12, marginBottom: 8}}
                key={playlist.id}>
                <Image
                  style={{width: 100, height: 100}}
                  source={{uri: playlist.images[0].url}}
                />
                <Text>{playlist.name}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Details;
