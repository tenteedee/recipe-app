import { GetLatestRecipes } from '@/services/GlobalAPIs';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ExploreScreen() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadLatestRecipes();
    }, [])
  );

  const loadLatestRecipes = async () => {
    setLoading(true);
    const result = await GetLatestRecipes();
    setRecipes(result);
    setLoading(false);
  };

  const RecipeCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/recipe-detail',
          params: { recipeData: JSON.stringify(item) },
        })
      }
    >
      <Image source={{ uri: item.imageURL }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.recipeName}
        </Text>
        <Text style={styles.cardAuthor}>by {item.authorEmail}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size='large' style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Khám phá công thức mới</Text>
      <FlatList
        data={recipes}
        renderItem={RecipeCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50 }}>
            Chưa có công thức nào để hiển thị.
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadLatestRecipes} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
  },
  cardAuthor: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
});
