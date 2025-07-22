import colors from '@/services/colors';
import { Marquee } from '@animatereactnative/marquee';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Landing() {
  const router = useRouter();

  const imagesList = [
    require('./../assets/images/banh-cuon.jpg'),
    require('./../assets/images/banh-xeo.jpg'),
    require('./../assets/images/che.jpg'),
    require('./../assets/images/pho-bo.jpg'),
    require('./../assets/images/banh-my.jpg'),
    require('./../assets/images/thit-kho.jpg'),
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ height: 450, paddingTop: 30 }}>
        <Marquee
          spacing={10}
          speed={0.7}
          style={{ transform: [{ rotate: '-3deg' }] }}
        >
          <View style={styles.imageContainer}>
            {imagesList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.3}
          style={{ transform: [{ rotate: '-3deg' }], marginTop: 20 }}
        >
          <View style={styles.imageContainer}>
            {imagesList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={1}
          style={{ transform: [{ rotate: '-3deg' }], marginTop: 20 }}
        >
          <View style={styles.imageContainer}>
            {imagesList.map((image, index) => (
              <Image source={image} key={index} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.text_lg}>Tự tạo công thức món ăn với AI🥗🔍</Text>
        <View style={{ height: 10 }} />
        <Text style={styles.text_lg}>
          Tạo, tìm kiếm và thưởng thức những món ăn tuyệt vời chỉ trong vài
          giây!
        </Text>

        <Text style={[styles.text_md, { color: colors.GRAY, marginTop: 20 }]}>
          Khám phá những công thức độc đáo với sức mạnh của AI.
        </Text>

        <View style={{ height: 30 }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={[styles.text_md, { color: colors.WHITE }]}>
            Bắt đầu ngay!
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    gap: 15,
  },

  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
    padding: 20,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text_lg: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    textAlign: 'center',
  },
  text_md: {
    fontFamily: 'outfit',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
