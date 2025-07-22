import colors from '@/services/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

export default function Button({
  label,
  onPress,
  iconName = '',
  loading = false,
}: any) {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={() => onPress()}
      style={{
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <ActivityIndicator color={colors.WHITE} />
      ) : (
        <Ionicons name={iconName} size={24} color='white' />
      )}
      <Text
        style={{
          textAlign: 'center',
          color: colors.WHITE,
          fontSize: 17,
          fontFamily: 'outfit',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
