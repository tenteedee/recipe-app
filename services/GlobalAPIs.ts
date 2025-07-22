import axios from 'axios';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import OpenAI from 'openai';
import { db } from './firebaseConfig';

export const GetUserByEmail = async (email: string) => {
  const usersCollection = collection(db, 'Users');

  // find user by email
  const q = query(usersCollection, where('email', '==', email));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log('No matching user found in Firestore.');
    return null;
  } else {
    // return the first user found
    const userDoc = querySnapshot.docs[0];
    console.log('User found in Firestore:', userDoc.id);
    return {
      id: userDoc.id,
      ...userDoc.data(),
    };
  }
};

export const CreateUser = async (userData: any) => {
  const docRef = await addDoc(collection(db, 'Users'), userData);
  console.log('New user created in Firestore with ID:', docRef.id);
  return {
    id: docRef.id,
    ...userData,
  };
};

export const GetCategoryList = async () => {
  try {
    const categoriesCollection = collection(db, 'Categories');
    const q = query(categoriesCollection, orderBy('name', 'asc'));

    const querySnapshot = await getDocs(q);

    const categoryList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categoryList;
  } catch (error) {
    console.error('Error fetching category list:', error);
    return [];
  }
};

export const SaveCompleteRecipe = async (recipeData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'Recipes'), recipeData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving recipe to Firestore:', error);
    throw error;
  }
};

export const GetSavedRecipes = async (userId: string) => {
  try {
    const recipesCollection = collection(db, 'Recipes');
    const q = query(
      recipesCollection,
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const recipeList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return recipeList;
  } catch (error) {
    console.error('Lỗi khi lấy công thức đã lưu:', error);
    return [];
  }
};

export const GetLatestRecipes = async () => {
  try {
    const recipesCollection = collection(db, 'Recipes');

    const q = query(recipesCollection, orderBy('createdAt', 'desc'), limit(20));

    const querySnapshot = await getDocs(q);

    const recipeList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return recipeList;
  } catch (error) {
    console.error('Lỗi khi lấy các công thức mới nhất:', error);
    return [];
  }
};

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  // defaultHeaders: {
  //   'HTTP-Referer': '<YOUR_SITE_URL>',
  //   'X-Title': '<YOUR_SITE_NAME>',
  // },
});

export const AIModel = async (prompt: string) =>
  await openai.chat.completions.create({
    model: 'mistralai/mistral-7b-instruct:free',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

export const generatedImage = async (
  prompt: string
): Promise<string | null> => {
  const IMAGE_API_KEY = process.env.EXPO_PUBLIC_AI_GURULAB_API_KEY;

  try {
    const response = await axios.post(
      'https://aigurulab.tech/api/generate-image',
      {
        width: 1024,
        height: 1024,
        input: prompt,
        model: 'sdxl',
        aspectRatio: '1:1',
      },
      {
        headers: {
          'x-api-key': IMAGE_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.image) {
      console.log('API trả về URL ảnh:', response.data.image);
      return response.data.image;
    } else {
      console.warn("API không trả về 'image' trong response.data");
      return null;
    }
  } catch (error) {
    console.error('Lỗi từ API aigurulab.tech:', error);
    throw error;
  }
};
