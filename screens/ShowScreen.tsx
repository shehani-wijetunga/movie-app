import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

// Replace this with your TMDB API key
const API_KEY = '4222f27d45c859a068abd3f5b758d870';

interface MovieDetails {
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

interface ShowScreenProps {
  route: {
    params: {
      id: number;
      type: 'movie' | 'tv';
    };
  };
}

export default function ShowScreen({ route }: ShowScreenProps) {
  const { id, type } = route.params;
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [id, type]);  

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
      );
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{details.title || details.name}</Text>
        <Text style={styles.subtext}>
          Release Date: {details.release_date || details.first_air_date}
        </Text>
        <Text style={styles.subtext}>
          Rating: {details.vote_average} / 10
        </Text>
        <Text style={styles.overview}>{details.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    marginVertical: 10,
    fontSize: 16,
  },
  overview: {
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 19,
    color: 'red',
  },
});
