import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {getPlaylists} from '../util/serviceUtil';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/app';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailProps = {
  route: ProfileScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const Details: React.FC<DetailProps> = ({route, navigation}) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id: categoryId} = route.params;

  useEffect(() => {
    getPlaylists(categoryId)
      .then((res) => {
        setPlaylists(res.playlists.items);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [categoryId]);

  if (error) {
    return (
      <View>
        <Text>Sorry, no playlists were found!</Text>
      </View>
    );
  }

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
