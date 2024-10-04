import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import axios from 'axios';
import TVList from '../components/TVList';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';

interface TVShow {
  id: number;
  name: string;
}

export default function TVScreen() {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [category, setCategory] = useState('airing_today');

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

  return (
    <View>
      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Airing Today" value="airing_today" />
        <Picker.Item label="On the Air" value="on_the_air" />
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Rated" value="top_rated" />
      </Picker>
      <TVList tvShows={tvShows} />
    </View>
  );
}
