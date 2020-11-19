import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {ImageObject} from '../../types/spotify';

type SongProps = {
  title: string;
  cover: ImageObject;
  artists: string[];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    padding: 8,
    backgroundColor: '#e8e8e8',
  },
  image: {
    width: 50,
    height: 50,
  },
  songInformation: {
    paddingLeft: 12,
  },
  title: {
    fontSize: 14,
  },
  artist: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

const Song: React.FC<SongProps> = ({title, cover, artists}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: cover.url,
        }}
      />
      <View style={styles.songInformation}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artists.join(', ')}</Text>
      </View>
    </View>
  );
};

export default Song;
