import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {getPlaylists} from '../util/serviceUtil';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/app';
import {PlaylistObjectSimplified} from '../types/spotify';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Playlists'>;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Playlists'
>;

type DetailProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const styles = StyleSheet.create({
  scrollView: {flex: 1},
  playlistWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playlistItem: {
    width: 195,
    padding: 8,
    margin: 4,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    borderRadius: 4,
  },
  image: {width: 140, height: 140},
  name: {fontSize: 18, paddingVertical: 8},
  description: {fontSize: 14},
});

const Playlists: React.FC<DetailProps> = ({route, navigation}) => {
  const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id: categoryId} = route.params;

  useEffect(() => {
    getPlaylists(categoryId)
      .then((res) => {
        console.log('PLAYLISTS -->', res.playlists.items);
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.playlistWrapper}>
        {!isLoading &&
          playlists.map((playlist) => {
            return (
              <TouchableHighlight
                key={playlist.id}
                onPress={() => {
                  navigation.navigate('PlaylistItems', {
                    id: playlist.id,
                  });
                }}>
                <View style={styles.playlistItem}>
                  <Image
                    style={styles.image}
                    source={{uri: playlist.images[0].url}}
                  />
                  <Text style={styles.name}>{playlist.name}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Playlists;
