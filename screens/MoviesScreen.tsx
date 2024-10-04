import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import axios from 'axios';
import MovieList from '../components/MovieList';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';  

interface Movie {
    id: number;
    title: string;
  }
  
  export default function MoviesScreen() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [category, setCategory] = useState('now_playing');
  
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
  
    return (
      <View>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Now Playing" value="now_playing" />
          <Picker.Item label="Popular" value="popular" />
          <Picker.Item label="Top Rated" value="top_rated" />
          <Picker.Item label="Upcoming" value="upcoming" />
        </Picker>
        <MovieList movies={movies} />
      </View>
    );
  }
