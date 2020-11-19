import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {getPlaylistItems} from '../util/serviceUtil';

import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../types/app';
import {PlaylistTrackObject, TrackObject} from '../types/spotify';

type PlaylistItemsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PlaylistItems'
>;

type DetailProps = {
  route: PlaylistItemsScreenRouteProp;
};

// const styles = StyleSheet.create({});

const PlaylistItems: React.FC<DetailProps> = ({route}) => {
  const [playlistItems, setPlaylistItems] = useState<PlaylistTrackObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id: playlistId} = route.params;

  useEffect(() => {
    getPlaylistItems(playlistId)
      .then((res) => {
        console.log('PLAYLIST ITEMS -->', res);
        setPlaylistItems(res.items);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [playlistId]);

  if (error) {
    return (
      <View>
        <Text>Sorry, no items were found!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        {!isLoading &&
          playlistItems.map((playlistItem) => {
            return <Text>{playlistItem.track.name}</Text>;
          })}
      </View>
    </ScrollView>
  );
};

export default PlaylistItems;
