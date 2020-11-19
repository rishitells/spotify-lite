import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import ListItem from '../components/listItem/ListItem';
import {fetchAllCategories} from '../util/serviceUtil';
import {CategoryObject} from '../types/spotify';

import {RootStackParamList} from '../types/app';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [categories, setCategories] = useState<CategoryObject[]>([]);

  useEffect(() => {
    fetchAllCategories().then((res) => {
      setCategories(res.categories.items);
    });
  }, []);

  const renderItem = ({item}: {item: CategoryObject}) => {
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
