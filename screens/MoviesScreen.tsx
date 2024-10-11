import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';  

interface Movie {
    id: number;
    title: string;
}

export default function MoviesScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState('now_playing');
  const navigation = useNavigation();
  
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ]);

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
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
        placeholder="Select a Category"
      />

      <MovieList movies={movies} />
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
