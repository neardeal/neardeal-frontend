import { StoreBenefits } from '@/src/app/(student)/components/store/benefits';
import { BottomFixedBar } from '@/src/app/(student)/components/store/bottom-bar';
import { StoreContent } from '@/src/app/(student)/components/store/content';
import { StoreHeader } from '@/src/app/(student)/components/store/header';
import { ThemedText } from '@/src/shared/common/themed-text';
import { UNIVERSITY_OPTIONS } from '@/src/shared/constants/store';
import { DUMMY_STORE_DETAILS } from '@/src/shared/data/mock/store';
import { rs } from '@/src/shared/theme/scale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('news');
  const [isLiked, setIsLiked] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState<number | null>(null);

  // TODO: API 연동 시 fetch로 교체
  const store = DUMMY_STORE_DETAILS.find((s) => s.id === id);

  // const { data, isLoading, error } = useGetStore(Number(id));
  // const store = data?.data?.data; // API 응답 구조에 맞게

  // if (isLoading) return <LoadingSpinner />;
  // if (error) return <ErrorView />;

  // 선택된 대학 라벨 (없으면 store 기본값 사용)
  const selectedUniversity = selectedUniversityId
    ? UNIVERSITY_OPTIONS.find((opt) => opt.id === selectedUniversityId)?.label ?? store?.university
    : store?.university;

  // 선택된 단과대학에 맞는 쿠폰만 필터링
  // targetOrganizationId가 없거나 null이면 전체 대상 쿠폰
  const filteredCoupons = store?.coupons.filter(
    (coupon) =>
      !coupon.targetOrganizationId ||
      coupon.targetOrganizationId === selectedUniversityId
  ) ?? [];

  if (!store) {
    return (
      <View style={styles.container}>
        <ThemedText>가게를 찾을 수 없습니다.</ThemedText>
      </View>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCouponPress = () => {
    // 쿠폰 받기 로직
  };

  const handleWriteReview = () => {
    router.push(`/store/${id}/review/write`);
  };

  const handleEditReview = (reviewId: string) => {
    router.push(`/store/${id}/review/write?reviewId=${reviewId}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: rs(80) + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <StoreHeader
          image={store.image}
          cloverGrowth={store.cloverGrowth}
          isLiked={isLiked}
          name={store.name}
          rating={store.rating}
          category={store.category}
          reviewCount={store.reviewCount}
          address={store.address}
          openHours={store.openHours}
          university={selectedUniversity ?? store.university}
          isPartner={store.isPartner}
          onBack={handleBack}
          onLike={handleLike}
          onUniversityChange={setSelectedUniversityId}
        />

        <View style={styles.content}>
          <StoreBenefits
            benefits={store.benefits}
            coupons={filteredCoupons}
          />

          <StoreContent
            storeId={String(id)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            news={store.news}
            menu={store.menu}
            announcements={store.announcements}
            recommendStores={store.recommendStores}
            reviewRating={store.reviewRating}
            reviews={store.reviews}
            onWriteReview={handleWriteReview}
            onEditReview={handleEditReview}
          />
        </View>
      </ScrollView>

      <BottomFixedBar
        likeCount={store.likeCount}
        isLiked={isLiked}
        onLikePress={handleLike}
        onCouponPress={handleCouponPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: rs(20),
    gap: rs(16),
  },
});
