import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getPlaylistItems} from '../util/serviceUtil';

import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../types/app';
import {PlaylistTrackObject} from '../types/spotify';
import Song from '../components/listItem/Song';

type PlaylistItemsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PlaylistItems'
>;

type DetailProps = {
  route: PlaylistItemsScreenRouteProp;
};

const styles = StyleSheet.create({
  playlistCover: {height: 200, width: 200, alignSelf: 'center', margin: 8},
  playlistDescription: {alignSelf: 'center'},
  search: {height: 100, backgroundColor: '#bbbfca', padding: 12},
});

const PlaylistItems: React.FC<DetailProps> = ({route}) => {
  const [playlistItems, setPlaylistItems] = useState<PlaylistTrackObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    id: playlistId,
    cover: playlistCover,
    description: playlistDescription,
  } = route.params;

  useEffect(() => {
    getPlaylistItems(playlistId)
      .then((res) => {
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
    <>
      <ScrollView>
        <Image style={styles.playlistCover} source={{uri: playlistCover}} />
        <Text style={styles.playlistDescription}>{playlistDescription}</Text>
        <View>
          {!isLoading &&
            playlistItems.map((playlistItem) => {
              console.log('playlistItem -->', playlistItem);
              if (!playlistItem.track) {
                return null;
              }

              return (
                <Song
                  key={playlistItem.track.id}
                  title={playlistItem.track.name}
                  cover={playlistItem.track.album.images[0]}
                  artists={playlistItem.track.album.artists.map(
                    (artist) => artist.name,
                  )}
                />
              );
            })}
        </View>
      </ScrollView>
    </>
  );
};

export default PlaylistItems;
