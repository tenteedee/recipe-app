import CategoryList from '@/components/CategoryList';
import CreateRecipe from '@/components/CreateRecipes';
import IntroHeader from '@/components/IntroHeader';
import colors from '@/services/colors';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Home() {
  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: colors.WHITE,
        paddingVertical: 35,
        paddingHorizontal: 10,
      }}
    >
      <IntroHeader />

      <CreateRecipe />

      <CategoryList />
    </ScrollView>
  );
}
