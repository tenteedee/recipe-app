import { UserContext } from '@/context/UserContext';
import { GetSavedRecipes } from '@/services/GlobalAPIs';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CookbookScreen() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  // useFocusEffect sẽ chạy mỗi khi màn hình này được focus
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        loadSavedRecipes();
      }
    }, [user])
  );

  const loadSavedRecipes = async () => {
    const recipes = await GetSavedRecipes(user.uid);
    setSavedRecipes(recipes);
  };

  type Recipe = {
    id: string;
    recipeImage: string;
    recipeName: string;
  };

  const RecipeCard: React.FC<{ item: Recipe }> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/recipe-detail',
          params: { recipeData: JSON.stringify(item) },
        })
      }
    >
      <Image source={{ uri: item.recipeImage }} style={styles.cardImage} />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.recipeName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cookbook</Text>
      <FlatList
        data={savedRecipes}
        renderItem={({ item }) => <RecipeCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50 }}>
            Bạn chưa lưu công thức nào.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  header: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 20,
    marginTop: 25,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardImage: { width: '100%', height: 150 },
  cardTitle: { padding: 10, fontFamily: 'outfit-bold' },
});
