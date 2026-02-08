import { ThemedText } from '@/src/shared/common/themed-text';
import { rs } from '@/src/shared/theme/scale';
import { Gray, Owner, System, Text } from '@/src/shared/theme/theme';
import type { Store } from '@/src/shared/types/store';
import {
  formatOperatingHours,
  getOpenStatus,
} from '@/src/shared/utils/store-transform';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface SelectedStoreDetailProps {
  store: Store;
  onCall?: () => void;
  onNavigate?: () => void;
  onShare?: () => void;
  onViewDetail?: () => void;
  onBookmarkPress?: (storeId: string) => void;
}

export function SelectedStoreDetail({
  store,
  onCall,
  onNavigate,
  onShare,
  onViewDetail,
  onBookmarkPress,
}: SelectedStoreDetailProps) {
  const formattedHours = formatOperatingHours(store.openHours);
  const openStatus = getOpenStatus(store.openHours);

  const handleBookmarkPress = () => {
    onBookmarkPress?.(store.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onViewDetail} activeOpacity={0.8}>
        {/* 전체 너비 이미지 */}
        <Image source={{ uri: store.image }} style={styles.image} />

        <View style={styles.info}>
          {/* 매장명 + 북마크 */}
          <View style={styles.nameRow}>
            <ThemedText style={styles.name}>{store.name}</ThemedText>
            <TouchableOpacity
              onPress={handleBookmarkPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={store.isFavorite ? 'bookmark' : 'bookmark-outline'}
                size={rs(24)}
                color={store.isFavorite ? Gray.black : Gray.gray5}
              />
            </TouchableOpacity>
          </View>

          {/* 별점 + 리뷰 + 카테고리 */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={rs(14)} color={System.star} />
            <ThemedText style={styles.ratingText}>
              {store.rating > 0 ? store.rating.toFixed(1) : '-'}
            </ThemedText>
            <ThemedText style={styles.reviewCount}>
              (리뷰 {store.reviewCount}개)
            </ThemedText>
            {store.category && (
              <>
                <View style={styles.separator} />
                <ThemedText style={styles.category}>{store.category}</ThemedText>
              </>
            )}
          </View>

          {/* 영업시간 */}
          <View style={styles.hoursRow}>
            <Ionicons name="time-outline" size={rs(14)} color={Text.tertiary} />
            <ThemedText
              style={[
                styles.openStatus,
                (openStatus === '휴무' || openStatus === '영업종료') &&
                  styles.closedStatus,
              ]}
            >
              {openStatus || '정보없음'}
            </ThemedText>
            {formattedHours && formattedHours !== '휴무' && (
              <>
                <ThemedText style={styles.dot}>•</ThemedText>
                <ThemedText style={styles.hoursText}>{formattedHours}</ThemedText>
              </>
            )}
          </View>

          {/* 쿠폰/혜택 */}
          {store.benefits.length > 0 && (
            <View style={styles.benefitsRow}>
              <ThemedText style={styles.cloverIcon}>🍀</ThemedText>
              <ThemedText style={styles.benefitsText}>
                {store.benefits[0]}
              </ThemedText>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* 액션 버튼 */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onCall}>
          <Ionicons name="call-outline" size={20} color={Owner.primary} />
          <ThemedText style={styles.actionButtonText}>전화</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onNavigate}>
          <Ionicons name="navigate-outline" size={20} color={Owner.primary} />
          <ThemedText style={styles.actionButtonText}>길찾기</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Ionicons name="share-outline" size={20} color={Owner.primary} />
          <ThemedText style={styles.actionButtonText}>공유</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rs(16),
  },
  image: {
    width: '100%',
    height: rs(150),
    borderRadius: rs(12),
    backgroundColor: Gray.gray3,
    marginBottom: rs(16),
  },
  info: {
    gap: rs(8),
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: rs(20),
    fontWeight: '700',
    color: Text.primary,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  ratingText: {
    fontSize: rs(14),
    fontWeight: '500',
    color: Text.primary,
  },
  reviewCount: {
    fontSize: rs(14),
    color: Text.tertiary,
  },
  separator: {
    width: 1,
    height: rs(12),
    backgroundColor: Gray.gray4,
    marginHorizontal: rs(6),
  },
  category: {
    fontSize: rs(14),
    color: Text.secondary,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  openStatus: {
    fontSize: rs(14),
    fontWeight: '500',
    color: Owner.primary,
  },
  closedStatus: {
    color: Text.tertiary,
  },
  dot: {
    fontSize: rs(14),
    color: Text.tertiary,
  },
  hoursText: {
    fontSize: rs(14),
    color: Text.secondary,
  },
  benefitsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
  },
  cloverIcon: {
    fontSize: rs(14),
  },
  benefitsText: {
    fontSize: rs(14),
    color: Owner.primary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: rs(16),
    paddingTop: rs(16),
    borderTopWidth: 1,
    borderTopColor: Gray.gray3,
  },
  actionButton: {
    alignItems: 'center',
    gap: rs(4),
    paddingVertical: rs(8),
    paddingHorizontal: rs(20),
  },
  actionButtonText: {
    fontSize: rs(13),
    color: Owner.primary,
    fontWeight: '500',
  },
});
