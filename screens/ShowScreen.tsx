import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation } from '@react-navigation/native';

const API_KEY = '4222f27d45c859a068abd3f5b758d870';

type RootStackParamList = {
  ShowScreen: {
    id: number;
    type: 'movie' | 'tv';
  };
};

type ShowScreenProps = {
  route: RouteProp<RootStackParamList, 'ShowScreen'>;
};

interface MovieDetails {
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  poster_path?: string; 
}

export default function ShowScreen({ route }: ShowScreenProps) {
  const { id, type } = route.params;
  const navigation = useNavigation();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [id, type]);

  useEffect(() => {
    if (details) {
      navigation.setOptions({
        title: details.title || details.name, 
        headerBackTitle: 'Back to List', 
      });
    }
  }, [navigation, details]);


  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

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
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.overview}>{details.overview}</Text>
        <View style={styles.infoContainer}>
        <Text style={styles.subtext}>Popularity: {details.popularity}</Text>
        <Text style={styles.subtext}>Release Date: {details.release_date || details.first_air_date}</Text>
        </View>
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
    alignItems: 'center', 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtext: {
    fontSize: 12,
    textAlign: 'center',
  },
  overview: {
    marginVertical: 20,
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
  poster: {
    width: 180, 
    height: 270, 
    marginBottom: 20,
  },
  popularity: {
    marginTop: 10,
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
  releaseDate: {
    marginTop: 10,
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
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
  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 20, 
    marginTop: 10,
  }
});