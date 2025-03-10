import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import LoginPage from './LoginPage';
import CatFact from './CatFact';
import FavoritesPage from './FavoritesPage';
import { FavoritesProvider } from './FavoritesContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen
            name="CatFact"
            component={CatFact}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  title="Favorites"
                  onPress={() => navigation.navigate('Favorites')}
                />
              ),
            })}
          />
          <Stack.Screen name="Favorites" component={FavoritesPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
