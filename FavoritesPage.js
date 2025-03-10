import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
import { useFavorites } from './FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const renderItem = ({ item, index }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.factText}>{item.fact}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Button title="Remove from Favorites" onPress={() => removeFromFavorites(index)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet. Add some!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  favoriteItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  factText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesPage;
