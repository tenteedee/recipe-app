import { UserContext } from '@/context/UserContext';
import { SaveCompleteRecipe } from '@/services/GlobalAPIs';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RecipeDetailScreen() {
  const { recipeData } = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const recipe = useMemo(() => {
    if (typeof recipeData === 'string') {
      return JSON.parse(recipeData);
    }
    return {};
  }, [recipeData]);

  const onSaveRecipe = async () => {
    if (!user) {
      Alert.alert('Chưa đăng nhập', 'Bạn cần đăng nhập để lưu công thức.');
      return;
    }

    setLoading(true);
    try {
      const dataToSave = {
        ...recipe,
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: new Date().toISOString(),
      };
      await SaveCompleteRecipe(dataToSave);

      Alert.alert('Đã lưu!', 'Công thức đã có trong Cookbook của bạn.');
      router.replace('/(tabs)/Cookbook');
    } catch (error) {
      console.error('Lỗi khi lưu công thức:', error);
      Alert.alert('Lỗi', 'Không thể lưu công thức. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!recipe.recipeName) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>

      <Image source={{ uri: recipe.recipeImage }} style={styles.recipeImage} />

      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{recipe.recipeName}</Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={onSaveRecipe}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.saveButtonText}>Lưu vào Cookbook</Text>
          )}
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>🔥 {recipe.calories} Calories</Text>
          <Text style={styles.infoText}>⏰ {recipe.cookTime}</Text>
          <Text style={styles.infoText}>🍽️ {recipe.serveTo}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thành phần</Text>
        {recipe.ingredients?.map((item: any, index: number) => (
          <Text key={index} style={styles.listItem}>
            • {item.icon} {item.ingredient} ({item.quantity})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Các bước thực hiện</Text>
        {recipe.steps?.map((step: string, index: number) => (
          <Text key={index} style={styles.stepItem}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 99,
  },
  recipeImage: {
    width: '100%',
    height: 350,
  },
  title: {
    fontSize: 26,
    fontFamily: 'outfit-bold',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'outfit-bold',
    fontSize: 18,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoText: {
    fontFamily: 'outfit',
    fontSize: 14,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 17,
    fontFamily: 'outfit',
    marginBottom: 8,
    lineHeight: 25,
  },
  stepItem: {
    fontSize: 17,
    fontFamily: 'outfit',
    marginBottom: 15,
    lineHeight: 26,
  },
});
