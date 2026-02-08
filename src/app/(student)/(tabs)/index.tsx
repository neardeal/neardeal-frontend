import { CategorySection } from '@/src/app/(student)/components/home/category-section';
import {
  CouponItem,
  CouponSection,
} from '@/src/app/(student)/components/home/coupon-section';
import { EventSection } from '@/src/app/(student)/components/home/event-section';
import {
  HotPlaceItem,
  HotPlaceSection,
} from '@/src/app/(student)/components/home/hot-place-section';
import { WelcomeBanner } from '@/src/app/(student)/components/home/welcome-banner';
import { ThemedText } from '@/src/shared/common/themed-text';
import { rs } from '@/src/shared/theme/scale';
import { Gray, Notify } from '@/src/shared/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NearDealLogo from '@/assets/images/logo/neardeal-logo.svg';

// Mock 데이터
const MOCK_USER = {
  name: '선지원',
  university: '전북대학교',
  department: '공과대학 IT시스템 공학과',
};

const MOCK_EVENTS = [
  {
    id: 1,
    title: '전수당 앞! 총학생회 체육행사회',
    description: '참여하고 커피 받아가세요!',
    startDateTime: '2026-01-28T10:00:00',
    endDateTime: '2026-01-28T14:00:00',
    status: 'LIVE' as const,
    imageUrls: [],
  },
  {
    id: 2,
    title: '알뜰이네 거리 총학생회 개강행사',
    description: '참여하고 햄버거 받아가세요!',
    startDateTime: '2026-01-29T10:00:00',
    endDateTime: '2026-01-29T15:00:00',
    status: 'UPCOMING' as const,
    imageUrls: [],
  },
];

const MOCK_COUPONS: CouponItem[] = [
  {
    id: 1,
    storeId: 1,
    storeName: '파리바게트',
    title: '마감 빵 세트',
    description: '',
    discountType: 'PERCENT',
    discountValue: 20,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    storeId: 2,
    storeName: '카페 디딤',
    title: '아메리카노',
    description: '',
    discountType: 'AMOUNT',
    discountValue: 1500,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    storeId: 3,
    storeName: '롯데리아',
    title: '치즈볼 3구',
    description: '',
    discountType: 'SERVICE',
    discountValue: 0,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_HOT_PLACES: HotPlaceItem[] = [
  {
    id: 1,
    rank: 1,
    name: '000 돈까스',
    category: '식당',
    organization: '1,000원 할인',
    weeklyFavoriteCount: 33,
  },
  {
    id: 2,
    rank: 2,
    name: '카페 00',
    category: '카페',
    organization: '음료 1+1',
    weeklyFavoriteCount: 20,
  },
  {
    id: 3,
    rank: 3,
    name: '00 헬스',
    category: '뷰티•헬스',
    organization: '회원할인',
    weeklyFavoriteCount: 15,
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push('/notification');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <NearDealLogo width={rs(92)} height={rs(28)} />
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotificationPress}
          >
            <Ionicons name="notifications-outline" size={rs(24)} color={Gray.black} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Welcome Banner */}
        <WelcomeBanner
          userName={MOCK_USER.name}
          university={MOCK_USER.university}
          department={MOCK_USER.department}
          couponCount={3}
          eventCount={3}
        />

        {/* Event Section */}
        <View style={styles.section}>
          <EventSection events={MOCK_EVENTS} />
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <CategorySection />
        </View>

        {/* Coupon Section */}
        <View style={styles.section}>
          <CouponSection coupons={MOCK_COUPONS} />
        </View>

        {/* Hot Place Section */}
        <View style={styles.section}>
          <HotPlaceSection places={MOCK_HOT_PLACES} />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray.gray1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: rs(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rs(12),
  },
  notificationButton: {
    position: 'relative',
    padding: rs(4),
  },
  notificationDot: {
    position: 'absolute',
    top: rs(4),
    right: rs(4),
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: Notify.importHeart,
  },
  section: {
    marginTop: rs(16),
  },
  bottomSpacer: {
    height: rs(100),
  },
});
