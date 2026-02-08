import { AppButton } from '@/src/shared/common/app-button';
import { ThemedText } from '@/src/shared/common/themed-text';
import { ThemedView } from '@/src/shared/common/themed-view';
import { rs } from '@/src/shared/theme/scale';
import { Gray, System } from '@/src/shared/theme/theme';
import type { Coupon } from '@/src/shared/types/store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CouponModalProps {
  visible: boolean;
  onClose: () => void;
  coupons: Coupon[];
  issuedCouponIds: number[];
  onIssueCoupon: (couponId: string) => void;
  isIssuing: boolean;
}

export function CouponModal({
  visible,
  onClose,
  coupons,
  issuedCouponIds,
  onIssueCoupon,
  isIssuing,
}: CouponModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ThemedView style={[styles.container, { paddingBottom: insets.bottom || rs(20) }]}>
          <View style={styles.header}>
            <ThemedText type="title">쿠폰 받기</ThemedText>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={rs(24)} color="#1d1b20" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {coupons.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>발급 가능한 쿠폰이 없습니다</ThemedText>
              </View>
            ) : (
              coupons.map((coupon, index) => {
                const isIssued = issuedCouponIds.includes(Number(coupon.id));
                return (
                  <View key={coupon.id} style={[styles.couponCard, index > 0 && { marginTop: rs(12) }]}>
                    <View style={styles.couponLeft}>
                      <View style={styles.discountBadge}>
                        <ThemedText style={styles.percentIcon}>%</ThemedText>
                      </View>
                    </View>
                    <View style={styles.couponContent}>
                      <View style={styles.couponHeader}>
                        <ThemedText type="defaultSemiBold">{coupon.title}</ThemedText>
                        <ThemedText type="defaultSemiBold" lightColor={System.hotSoldOut}>
                          {coupon.discount}
                        </ThemedText>
                      </View>
                      <ThemedText style={styles.couponDescription}>{coupon.description}</ThemedText>
                      <View style={styles.couponFooter}>
                        <ThemedText style={styles.couponExpiry}>{coupon.expiryDate}</ThemedText>
                        {isIssued ? (
                          <View style={styles.issuedBadge}>
                            <ThemedText type="default" lightColor={Gray.gray500}>
                              발급완료
                            </ThemedText>
                          </View>
                        ) : (
                          <AppButton
                            label="쿠폰 받기"
                            backgroundColor="#34b262"
                            onPress={() => onIssueCoupon(coupon.id)}
                            style={styles.couponButton}
                            disabled={isIssuing}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    minHeight: '40%',
    maxHeight: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: rs(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    paddingBottom: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: rs(20),
    paddingTop: rs(20),
    paddingBottom: rs(20),
  },
  emptyContainer: {
    paddingVertical: rs(40),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: rs(14),
    color: '#999',
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: rs(12),
    gap: rs(12),
  },
  couponLeft: {
    width: rs(40),
    height: rs(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    width: rs(40),
    height: rs(40),
    borderRadius: 16,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentIcon: {
    fontSize: rs(16),
    fontWeight: '700',
    color: '#ff9800',
  },
  couponContent: {
    flex: 1,
    gap: rs(2),
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponDescription: {
    fontSize: rs(12),
    color: '#666',
  },
  couponFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(4),
  },
  couponExpiry: {
    fontSize: rs(10),
    color: '#999',
  },
  couponButton: {
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
    minHeight: rs(32),
  },
  issuedBadge: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
  },
});
