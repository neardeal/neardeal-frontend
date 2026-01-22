import type { Store } from '@/src/components/map/store-card';

// 필터 카테고리
export const FILTER_CATEGORIES = [
  { id: 'all', label: '전체', icon: '✓' },
  { id: 'bungeoppang', label: '붕어빵', icon: '🐟' },
  { id: 'student-council', label: '총학생회', icon: '👥' },
  { id: 'club', label: '총동아리', icon: '🎭' },
  { id: 'notice', label: '공고', icon: '📢' },
];

// 정렬 옵션
export const SORT_OPTIONS = [
  { id: 'distance', label: '거리순' },
  { id: 'recommend', label: '추천순' },
  { id: 'rating', label: '별점순' },
  { id: 'reviews', label: '리뷰 많은순' },
  { id: 'benefits', label: '혜택 많은순' },
];

// 바텀 시트 필터 버튼
export const BOTTOM_FILTERS = [
  { id: 'nearby', label: '내 주변' },
  { id: 'storeType', label: '가게 종류' },
  { id: 'event', label: '이벤트' },
];

// 바텀시트 snap points 인덱스
export const SNAP_INDEX = {
  COLLAPSED: 0,  // 접힌 상태 (탭바 보임)
  HALF: 1,       // 중간 상태 (탭바 숨김)
  FULL: 2,       // 펼친 상태 (탭바 숨김)
} as const;

// 더미 가게 데이터 (API 연동 전 테스트용)
export const DUMMY_STORES: Store[] = [
  {
    id: '1',
    name: '만계치킨',
    image: 'https://picsum.photos/200/200?random=1',
    rating: 4.7,
    reviewCount: 800,
    distance: '75m',
    openStatus: '영업중',
    openHours: '16:30 - 03:30',
    benefits: ['치킨 언어머니 쿨링 500m', '무 마라 2L 배송'],
    lat: 35.8468,
    lng: 127.1294,
  },
  {
    id: '2',
    name: '전북대 붕어빵',
    image: 'https://picsum.photos/200/200?random=2',
    rating: 4.5,
    reviewCount: 320,
    distance: '120m',
    openStatus: '영업중',
    openHours: '10:00 - 22:00',
    benefits: ['붕어빵 2개 서비스'],
    lat: 35.8448,
    lng: 127.1274,
  },
  {
    id: '3',
    name: '맛있는 분식',
    image: 'https://picsum.photos/200/200?random=3',
    rating: 4.2,
    reviewCount: 156,
    distance: '250m',
    openStatus: '영업중',
    openHours: '11:00 - 21:00',
    benefits: ['떡볶이 500원 할인'],
    lat: 35.8438,
    lng: 127.1314,
  },
];
