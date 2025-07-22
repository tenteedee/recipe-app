import { UserContext } from '@/context/UserContext';
import { AIModel, generatedImage } from '@/services/GlobalAPIs';
import colors from '@/services/colors';
import { useRouter } from 'expo-router';
import React, { useContext, useRef, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import {
  GENERATE_COMPLETE_RECIPE,
  GENERATE_RECIPE_OPTION_PROMPT,
} from '../services/Prompts';
import Button from './Button';

export default function CreateRecipe() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [userInput, setUserInput] = useState<string>();
  const [recipeOptions, setRecipeOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const actionSheet = useRef<ActionSheetRef>(null);

  const findAndParseJson = (text: string) => {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      const jsonString = text.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        console.error('Lỗi parse JSON:', e);
        return null;
      }
    }
    return null;
  };

  const onGenerateRecipeOptions = async () => {
    if (!userInput) {
      Alert.alert(
        'Chưa có thông tin',
        'Vui lòng nhập ý tưởng cho món ăn của bạn.'
      );
      return;
    }
    setLoading(true);
    try {
      const finalPrompt = userInput + GENERATE_RECIPE_OPTION_PROMPT;
      const result = await AIModel(finalPrompt);
      const messageContent = result?.choices[0]?.message?.content;

      if (messageContent) {
        const jsonResponse = findAndParseJson(messageContent);
        if (jsonResponse && jsonResponse.recipes) {
          setRecipeOptions(jsonResponse.recipes);
          actionSheet.current?.show();
        } else {
          Alert.alert(
            'Lỗi',
            'Không thể phân tích phản hồi từ AI. Vui lòng thử lại.'
          );
        }
      }
    } catch (error) {
      console.error('Lỗi khi tạo lựa chọn công thức:', error);
      Alert.alert('Lỗi', 'Không thể tạo lựa chọn công thức. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const onRecipeOptionSelect = async (option: any) => {
    actionSheet.current?.hide();
    setLoading(true);
    try {
      const detailPrompt = `Recipe name: ${option.recipeName}\nDescription: ${option.description}\n${GENERATE_COMPLETE_RECIPE}`;
      const detailResult = await AIModel(detailPrompt);
      const detailContent = detailResult?.choices[0]?.message?.content;
      if (!detailContent)
        throw new Error('Không nhận được chi tiết công thức từ AI.');
      const recipeDetails = findAndParseJson(detailContent);
      if (!recipeDetails)
        throw new Error('Không thể phân tích chi tiết công thức.');

      const imageUrl = await generatedImage(recipeDetails.imagePrompt);
      if (!imageUrl) throw new Error('Tạo ảnh thất bại.');

      const finalRecipeData = {
        ...recipeDetails,
        recipeImage: imageUrl,
      };

      router.push({
        pathname: '/recipe-detail',
        params: {
          recipeData: JSON.stringify(finalRecipeData),
        },
      });
    } catch (error) {
      console.error('Lỗi trong quá trình tạo công thức hoàn chỉnh:', error);
      Alert.alert(
        'Lỗi',
        'Không thể hoàn thành việc tạo công thức. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('./../assets/images/pan.gif')}
        style={{ width: 80, height: 80 }}
      />
      <Text style={styles.headingText}>Bật bếp và chuẩn bị nấu ăn nào.</Text>
      <Text style={styles.subHeadingText}>Hãy tạo 1 món gì đó thơm ngon!</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Bạn muốn ăn gì hôm nay? Hãy nhập ý tưởng của bạn...'
        multiline={true}
        numberOfLines={3}
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        label={'Tạo công thức'}
        onPress={onGenerateRecipeOptions}
        iconName={'sparkles'}
        loading={loading}
        disabled={loading}
      />
      <ActionSheet ref={actionSheet}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.actionSheetHeading}>Chọn một công thức</Text>
          {recipeOptions.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeOptionItem}
              onPress={() => onRecipeOptionSelect(item)}
            >
              <Text style={styles.recipeName}>{item?.recipeName}</Text>
              <Text style={styles.recipeDescription}>{item?.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheet>
    </View>
  );
}

// ... styles không thay đổi ...
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: colors.SECONDARY,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  subHeadingText: {
    fontFamily: 'outfit',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
  },
  textInput: {
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    width: '100%',
    padding: 10,
    marginTop: 8,
    textAlignVertical: 'top',
    height: 120,
    borderWidth: 1,
    borderColor: colors.GRAY,
  },
  actionSheetContainer: {
    padding: 20,
  },
  actionSheetHeading: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
  },
  recipeOptionItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeName: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
  },
  recipeDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    marginTop: 5,
    color: colors.GRAY,
  },
});
