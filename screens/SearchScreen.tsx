import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
}

export default function SearchScreen() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');  
  const [searchType, setSearchType] = useState('multi'); 
  const [open, setOpen] = useState(false); 
  const [items, setItems] = useState([
    { label: 'Multi', value: 'multi' },
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
  ]);

  const searchMovies = async () => {
    if (!query) return;  

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&query=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies/TV shows:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Movie/TV Show Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter movie or TV show"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Choose Search Type*</Text>
      
      <DropDownPicker
        open={open}
        value={searchType}
        items={items}
        setOpen={setOpen}
        setValue={setSearchType}
        setItems={setItems}
        style={styles.dropdown}
        placeholder="Select a Search Type"
      />

      <TouchableOpacity onPress={searchMovies} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {results.length === 0 ? (
        <Text style={styles.noResults}>Please select a search type and enter a query.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              {item.poster_path && (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                  style={styles.poster}
                />
              )}
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title || item.name}</Text>
                <Text style={styles.subtext}>
                  Popularity: {item.popularity.toFixed(3)}
                </Text>
                <Text style={styles.subtext}>
                  Release Date: {item.release_date || item.first_air_date}
                </Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>More Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    marginBottom: 15,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  resultContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#00bfff',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
