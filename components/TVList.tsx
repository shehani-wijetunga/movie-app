import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  popularity: number;
  release_date: string;
}

interface TVListProps {
  tvShows: TVShow[];
}

export default function TVList({ tvShows }: TVListProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <FlatList
      data={tvShows}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.image}
          />
          <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.info}>Popularity: {item.popularity}</Text>
            <Text style={styles.info}>Release Date: {item.release_date}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ShowScreen', { id: item.id, type: 'tv' })}
            >
              <Text style={styles.buttonText}>More Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
