import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import { useFavorites } from './FavoritesContext';

const CatFact = ({ navigation }) => {
  const [fact, setFact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { addToFavorites } = useFavorites();

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  };

  const fetchCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImageUrl(data[0].url);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    fetchCatFact();
    fetchCatImage();
  }, []);

  const handleAddToFavorites = () => {
    addToFavorites(fact, imageUrl);
    Alert.alert('Added to Favorites', 'This cat fact and image have been added to your favorites.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.factText}>{fact}</Text>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.loadingText}>Loading cat image...</Text>
      )}
      <Button title="Get New Fact and Image" onPress={() => {
        fetchCatFact();
        fetchCatImage();
      }} />
      <Button title="Add to Favorites" onPress={handleAddToFavorites} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  factText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default CatFact;
