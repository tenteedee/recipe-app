// app/(tabs)/profile.tsx

import { UserContext } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const auth = getAuth();

  const handleSignOut = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đăng xuất',
        onPress: () => {
          signOut(auth).catch((error) => {
            console.error('Lỗi khi đăng xuất:', error);
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
          });
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hồ sơ</Text>

      <View style={styles.profileCard}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require('@/assets/icons/profile.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {user?.displayName ?? 'Chưa có tên'}
        </Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/Cookbook')}
        >
          <Ionicons name='book-outline' size={24} color='#333' />
          <Text style={styles.menuText}>Cookbook của tôi</Text>
          <Ionicons name='chevron-forward' size={22} color='#ccc' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Ionicons name='log-out-outline' size={24} color='#e74c3c' />
          <Text style={[styles.menuText, { color: '#e74c3c' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Recipe App v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    marginTop: 15,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#6c757d',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  menuItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'outfit',
    marginLeft: 15,
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
    marginVertical: 30,
    color: '#adb5bd',
    fontFamily: 'outfit',
  },
});
