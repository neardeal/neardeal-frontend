import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/src/shared/common/themed-text';
import { useAuth } from '@/src/shared/lib/auth';
import { rs } from '@/src/shared/theme/scale';
import { Gray } from '@/src/shared/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MyPageScreen() {
  const insets = useSafeAreaInsets();
  const { handleLogout } = useAuth();

  const onLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: handleLogout },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedText style={styles.title}>마이페이지</ThemedText>

      <View style={styles.content}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={rs(16)} color={Gray.gray9} />
          <ThemedText style={styles.logoutText}>로그아웃</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: rs(18),
    fontWeight: '600',
    paddingHorizontal: rs(20),
    paddingVertical: rs(16),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(6),
    paddingVertical: rs(12),
    paddingHorizontal: rs(24),
    borderWidth: 1,
    borderColor: Gray.gray4,
    borderRadius: rs(8),
  },
  logoutText: {
    fontSize: rs(14),
    color: Gray.gray9,
  },
});
