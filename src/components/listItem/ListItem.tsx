import React, {useCallback} from 'react';
import {StyleSheet, Image, Text, View, TouchableHighlight} from 'react-native';
import {ImageObject} from '../../types/spotify';

type ListItemProps = {
  id: string;
  title: string;
  icon: ImageObject;
  handleClick: (id: string) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
  },
});

const ListItem: React.FC<ListItemProps> = ({id, title, icon, handleClick}) => {
  const handleItemClick = useCallback(() => {
    handleClick(id);
  }, [id, handleClick]);

  return (
    <TouchableHighlight onPress={handleItemClick}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 2,
          padding: 2,
          backgroundColor: '#fbf6f0',
        }}>
        <Text style={styles.text}>{title}</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri: icon.url,
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

export default ListItem;
