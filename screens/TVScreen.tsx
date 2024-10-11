import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import TVList from '../components/TVList';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';

interface TVShow {
  id: number;
  name: string;
}

export default function TVScreen() {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [category, setCategory] = useState('airing_today');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On the Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTVShows();
  }, [category]);

  const fetchTVShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${category}?api_key=${API_KEY}`
      );
      setTVShows(response.data.results);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        dropDownDirection="BOTTOM" 
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}  
        placeholder="Select TV Show Category"
      />

      <TVList tvShows={tvShows} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  dropdown: {
    marginBottom: 20,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownContainer: {
    zIndex: 1000, 
  },
});
