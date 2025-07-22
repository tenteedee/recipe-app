import { UserContext } from '@/context/UserContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import '../services/firebaseConfig';

SplashScreen.preventAutoHideAsync();

const useProtectedRoute = (user: User | null) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inTabsGroup = segments[0] === '(tabs)';

    const protectedRoutes = ['(tabs)', 'recipe-detail'];
    const isProtectedRouteAccess = protectedRoutes.includes(segments[0]);

    if (user && !isProtectedRouteAccess) {
      router.replace('/(tabs)/Home');
    } else if (!user && isProtectedRouteAccess) {
      router.replace('/landing');
    }
  }, [user, segments, router]);
};

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      if (authLoaded) {
        SplashScreen.hideAsync();
      }
    }
  }, [fontsLoaded, fontError, authLoaded]);

  useProtectedRoute(user);

  if (!authLoaded || (!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='landing' />
        <Stack.Screen name='login' />
        <Stack.Screen name='register' />
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='recipe-detail' />
      </Stack>
    </UserContext.Provider>
  );
}
