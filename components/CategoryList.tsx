import { GetCategoryList } from '@/services/GlobalAPIs';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<any[]>([]);

  const getCategoryListData = async () => {
    try {
      const results = await GetCategoryList();
      setCategoryList(results);
    } catch (error) {
      setCategoryList([]);
      console.log('Lỗi trong getCategoryListData: ', error);
    }
  };

  useEffect(() => {
    getCategoryListData();
  }, []);

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.heading}>Danh mục</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }: any) => (
          <View style={styles.categoryContainer}>
            <Image
              source={{ uri: item?.image?.url }}
              style={{ width: 40, height: 40, borderRadius: 10 }}
            />
            <Text style={{ marginTop: 3, fontFamily: 'outfit' }}>
              {item?.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  categoryContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
  },
});
