import React, { useState } from 'react';
import { View, FlatList, Text , Image} from 'react-native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
}

export default function SearchScreen() {
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchMovies = async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <View>
      <SearchBar onSearch={searchMovies} />
      {results.length === 0 ? (
        <Text>No results found</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.title || item.name}</Text>}
        />
      )}
    </View>
  );
}
