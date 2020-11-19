import React from 'react';
import {Text, View} from 'react-native';

type ListItemProps = {
  title: string;
};

const ListItem: React.FC<ListItemProps> = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default ListItem;
