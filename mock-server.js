/**
 * 가게 상세 페이지 테스트용 Mock API 서버
 * V2__seed_data.sql 기반 데이터
 *
 * 실행: node mock-server.js
 * 포트: 4010 (EXPO_PUBLIC_API_BASE_URL 기본값)
 */
const http = require("http");

// ── Seed 데이터 ─────────────────────────────────────────────

const stores = [
  {
    id: 1,
    userId: 5,
    name: "맛있는 파스타",
    roadAddress: "서울시 강남구 역삼로 1",
    jibunAddress: "서울시 강남구 역삼동 100-1",
    phone: "02-1234-5678",
    introduction: "전통 이탈리안 파스타 전문점입니다.",
    operatingHours: "매일 11:00 - 22:00",
    latitude: 37.498095,
    longitude: 127.02761,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["GROUP_GATHERING", "ROMANTIC"],
    imageUrls: ["https://picsum.photos/seed/store1/400/300"],
  },
  {
    id: 2,
    userId: 5,
    name: "아늑한 카페",
    roadAddress: "서울시 종로구 명륜동 2",
    jibunAddress: "서울시 종로구 명륜동 200-2",
    phone: "02-2345-6789",
    introduction: "넓고 쾌적한 스터디하기 좋은 카페",
    operatingHours: "매일 09:00 - 23:00",
    latitude: 37.588284,
    longitude: 126.992224,
    storeCategories: ["CAFE"],
    storeMoods: ["SOLO_DINING"],
    imageUrls: ["https://picsum.photos/seed/store2/400/300"],
  },
  {
    id: 3,
    userId: 6,
    name: "매운 떡볶이",
    roadAddress: "서울시 서대문구 대현동 3",
    jibunAddress: "서울시 서대문구 대현동 300-3",
    phone: "02-3456-7890",
    introduction: "스트레스 한방에 날리는 매운맛!",
    operatingHours: "매일 14:00 - 02:00",
    latitude: 37.556754,
    longitude: 126.945892,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["LATE_NIGHT", "GROUP_GATHERING"],
    imageUrls: ["https://picsum.photos/seed/store3/400/300"],
  },
  {
    id: 4,
    userId: 6,
    name: "든든 국밥",
    roadAddress: "서울시 성북구 안암동 4",
    jibunAddress: "서울시 성북구 안암동 400-4",
    phone: "02-4567-8901",
    introduction: "24시간 정성껏 끓인 국밥",
    operatingHours: "24시간 영업",
    latitude: 37.586419,
    longitude: 127.029053,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["SOLO_DINING", "LATE_NIGHT"],
    imageUrls: ["https://picsum.photos/seed/store4/400/300"],
  },
  {
    id: 5,
    userId: 7,
    name: "바삭 치킨",
    roadAddress: "서울시 성동구 행당동 5",
    jibunAddress: "서울시 성동구 행당동 500-5",
    phone: "02-5678-9012",
    introduction: "겉바속이 치킨의 정석",
    operatingHours: "매일 16:00 - 04:00",
    latitude: 37.561726,
    longitude: 127.037409,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["LATE_NIGHT", "GROUP_GATHERING"],
    imageUrls: ["https://picsum.photos/seed/store5/400/300"],
  },
  {
    id: 6,
    userId: 7,
    name: "피자 천국",
    roadAddress: "서울시 동작구 흑석동 6",
    jibunAddress: "서울시 동작구 흑석동 600-6",
    phone: "02-6789-0123",
    introduction: "토핑이 듬뿍 들어간 수제 피자",
    operatingHours: "매일 11:30 - 23:30",
    latitude: 37.508821,
    longitude: 126.963784,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["GROUP_GATHERING"],
    imageUrls: ["https://picsum.photos/seed/store6/400/300"],
  },
  {
    id: 7,
    userId: null,
    name: "버거 농장",
    roadAddress: "서울시 동대문구 휘기동 7",
    jibunAddress: "서울시 동대문구 휘기동 700-7",
    phone: "02-7890-1234",
    introduction: "육즙 가득한 수제 버거 맛집",
    operatingHours: "매일 10:30 - 21:00",
    latitude: 37.589808,
    longitude: 127.057913,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["SOLO_DINING"],
    imageUrls: ["https://picsum.photos/seed/store7/400/300"],
  },
  {
    id: 8,
    userId: null,
    name: "이밥 달인",
    roadAddress: "서울시 동대문구 이문동 8",
    jibunAddress: "서울시 동대문구 이문동 800-8",
    phone: "02-8901-2345",
    introduction: "신선한 재료로 만드는 프리미엄 이밥",
    operatingHours: "매일 11:30 - 22:00",
    latitude: 37.595605,
    longitude: 127.062831,
    storeCategories: ["RESTAURANT"],
    storeMoods: ["SOLO_DINING"],
    imageUrls: ["https://picsum.photos/seed/store8/400/300"],
  },
  {
    id: 9,
    userId: null,
    name: "감성 포차",
    roadAddress: "서울시 마포구 전농동 9",
    jibunAddress: "서울시 마포구 전농동 900-9",
    phone: "02-9012-3456",
    introduction: "분위기 좋은 감성 안주 주점",
    operatingHours: "매일 18:00 - 05:00",
    latitude: 37.547146,
    longitude: 126.936551,
    storeCategories: ["BAR"],
    storeMoods: ["LATE_NIGHT", "ROMANTIC"],
    imageUrls: ["https://picsum.photos/seed/store9/400/300"],
  },
  {
    id: 10,
    userId: null,
    name: "달콤 베이커리",
    roadAddress: "서울시 성동구 성수동 10",
    jibunAddress: "서울시 성동구 성수동 1000-10",
    phone: "02-0123-4567",
    introduction: "매일 아침 구워내는 신선한 빵",
    operatingHours: "매일 08:00 - 21:00",
    latitude: 37.544569,
    longitude: 127.056073,
    storeCategories: ["CAFE"],
    storeMoods: ["SOLO_DINING"],
    imageUrls: ["https://picsum.photos/seed/store10/400/300"],
  },
];

const items = [
  {
    id: 1,
    storeId: 1,
    name: "까르보나라",
    price: 12000,
    description: "크리미한 정통 까르보나라",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
    itemOrder: 1,
    badge: "BEST",
    hidden: false,
    soldOut: false,
    representative: true,
  },
  {
    id: 2,
    storeId: 1,
    name: "알리오 올리오",
    price: 10000,
    description: "마늘향 가득한 오일 파스타",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
    itemOrder: 2,
    badge: null,
    hidden: false,
    soldOut: false,
    representative: false,
  },
  {
    id: 3,
    storeId: 1,
    name: "토마토 파스타",
    price: 11000,
    description: "상큼한 토마토 소스 파스타",
    imageUrl: "https://picsum.photos/seed/item3/200/200",
    itemOrder: 3,
    badge: "NEW",
    hidden: false,
    soldOut: false,
    representative: false,
  },
  {
    id: 4,
    storeId: 2,
    name: "아메리카노",
    price: 4000,
    description: "깊고 진한 원두 아메리카노",
    imageUrl: "https://picsum.photos/seed/item4/200/200",
    itemOrder: 1,
    badge: "BEST",
    hidden: false,
    soldOut: false,
    representative: true,
  },
  {
    id: 5,
    storeId: 2,
    name: "카페라떼",
    price: 4500,
    description: "부드러운 우유 라떼",
    imageUrl: "https://picsum.photos/seed/item5/200/200",
    itemOrder: 2,
    badge: null,
    hidden: false,
    soldOut: false,
    representative: false,
  },
  {
    id: 6,
    storeId: 3,
    name: "떡볶이 1인분",
    price: 4000,
    description: "매콤달콤 떡볶이",
    imageUrl: "https://picsum.photos/seed/item6/200/200",
    itemOrder: 1,
    badge: "BEST",
    hidden: false,
    soldOut: false,
    representative: true,
  },
  {
    id: 7,
    storeId: 3,
    name: "모듬 튀김",
    price: 5000,
    description: "바삭한 모듬 튀김",
    imageUrl: "https://picsum.photos/seed/item7/200/200",
    itemOrder: 2,
    badge: "HOT",
    hidden: false,
    soldOut: false,
    representative: false,
  },
  {
    id: 8,
    storeId: 4,
    name: "순대국밥",
    price: 9000,
    description: "진한 국물의 순대국밥",
    imageUrl: "https://picsum.photos/seed/item8/200/200",
    itemOrder: 1,
    badge: "BEST",
    hidden: false,
    soldOut: false,
    representative: true,
  },
  {
    id: 9,
    storeId: 5,
    name: "프라이드 치킨",
    price: 18000,
    description: "겉바속촉 프라이드",
    imageUrl: "https://picsum.photos/seed/item9/200/200",
    itemOrder: 1,
    badge: "BEST",
    hidden: false,
    soldOut: false,
    representative: true,
  },
  {
    id: 10,
    storeId: 6,
    name: "콤비네이션 피자",
    price: 20000,
    description: "토핑 가득 콤비네이션",
    imageUrl: "https://picsum.photos/seed/item10/200/200",
    itemOrder: 1,
    badge: "BEST",
    hidden: false,
    soldOut: false,
    representative: true,
  },
];

const coupons = [
  {
    id: 1,
    storeId: 1,
    title: "오픈 기념 10% 할인",
    description: "전 메뉴 10% 할인",
    targetOrganizationId: null,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 100,
    limitPerUser: 1,
    status: "ACTIVE",
  },
  {
    id: 2,
    storeId: 2,
    title: "신메뉴 무료 시음권",
    description: "신메뉴 1잔 무료",
    targetOrganizationId: null,
    issueStartsAt: "2024-02-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 50,
    limitPerUser: 1,
    status: "ACTIVE",
  },
  {
    id: 3,
    storeId: 3,
    title: "떡볶이 사이즈 업",
    description: "1인분 주문 시 사이즈 업",
    targetOrganizationId: null,
    issueStartsAt: "2024-03-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 100,
    limitPerUser: 1,
    status: "ACTIVE",
  },
  {
    id: 4,
    storeId: 4,
    title: "음료수 무료 쿠폰",
    description: "국밥 주문 시 음료수 무료",
    targetOrganizationId: null,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2025-06-30T23:59:59",
    totalQuantity: 200,
    limitPerUser: 2,
    status: "ACTIVE",
  },
  {
    id: 5,
    storeId: 5,
    title: "생맥주 500cc 1천원",
    description: "치킨 주문 시 생맥주 할인",
    targetOrganizationId: null,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 100,
    limitPerUser: 1,
    status: "ACTIVE",
  },
  {
    id: 6,
    storeId: 6,
    title: "사이드 메뉴 1종 무료",
    description: "피자 주문 시 사이드 무료",
    targetOrganizationId: null,
    issueStartsAt: "2024-04-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 50,
    limitPerUser: 1,
    status: "ACTIVE",
  },
  {
    id: 7,
    storeId: 7,
    title: "무료 토핑 추가",
    description: "버거 주문 시 토핑 무료",
    targetOrganizationId: null,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 100,
    limitPerUser: 1,
    status: "ACTIVE",
  },
  {
    id: 8,
    storeId: 1,
    title: "재방문 5% 할인",
    description: "재방문 고객 5% 할인 (공과대학 전용)",
    targetOrganizationId: 2,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2025-12-31T23:59:59",
    totalQuantity: 1000,
    limitPerUser: 10,
    status: "ACTIVE",
  },
  {
    id: 9,
    storeId: 2,
    title: "아메리카노 1+1",
    description: "아메리카노 1+1 이벤트",
    targetOrganizationId: null,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2024-06-30T23:59:59",
    totalQuantity: 50,
    limitPerUser: 1,
    status: "EXPIRED",
  },
  {
    id: 10,
    storeId: 3,
    title: "튀김 서비스",
    description: "떡볶이 주문 시 튀김 1개",
    targetOrganizationId: null,
    issueStartsAt: "2024-01-01T00:00:00",
    issueEndsAt: "2024-12-31T23:59:59",
    totalQuantity: 10,
    limitPerUser: 1,
    status: "STOPPED",
  },
];

const usernames = { 8: "김학생", 9: "이학생", 10: "박학생" };

const reviews = [
  {
    reviewId: 1,
    storeId: 1,
    username: usernames[8],
    content: "정말 맛있어요!",
    rating: 5,
    createdAt: "2024-06-01T12:00:00",
    likeCount: 2,
    imageUrls: ["https://picsum.photos/seed/rev1/200/200"],
  },
  {
    reviewId: 2,
    storeId: 1,
    username: usernames[9],
    content: "가성비 좋습니다.",
    rating: 4,
    createdAt: "2024-06-05T15:30:00",
    likeCount: 1,
    imageUrls: [],
  },
  {
    reviewId: 3,
    storeId: 2,
    username: usernames[10],
    content: "커피 향이 너무 좋아요.",
    rating: 5,
    createdAt: "2024-06-10T09:00:00",
    likeCount: 1,
    imageUrls: ["https://picsum.photos/seed/rev3/200/200"],
  },
  {
    reviewId: 4,
    storeId: 2,
    username: usernames[8],
    content: "자리가 좀 좁아요.",
    rating: 3,
    createdAt: "2024-06-12T14:00:00",
    likeCount: 0,
    imageUrls: [],
  },
  {
    reviewId: 5,
    storeId: 3,
    username: usernames[9],
    content: "매운데 맛있다요.",
    rating: 5,
    createdAt: "2024-06-15T18:00:00",
    likeCount: 2,
    imageUrls: [
      "https://picsum.photos/seed/rev5a/200/200",
      "https://picsum.photos/seed/rev5b/200/200",
    ],
  },
  {
    reviewId: 6,
    storeId: 3,
    username: usernames[10],
    content: "튀김이 바삭합니다.",
    rating: 4,
    createdAt: "2024-06-18T19:30:00",
    likeCount: 0,
    imageUrls: [],
  },
  {
    reviewId: 7,
    storeId: 4,
    username: usernames[8],
    content: "국밥이 정말 든든해요.",
    rating: 5,
    createdAt: "2024-06-20T08:00:00",
    likeCount: 2,
    imageUrls: ["https://picsum.photos/seed/rev7/200/200"],
  },
  {
    reviewId: 8,
    storeId: 5,
    username: usernames[9],
    content: "치맥하기 딱 좋습니다.",
    rating: 5,
    createdAt: "2024-06-22T20:00:00",
    likeCount: 2,
    imageUrls: [],
  },
  {
    reviewId: 9,
    storeId: 6,
    username: usernames[10],
    content: "배달이 너무 늦었어요.",
    rating: 2,
    createdAt: "2024-06-25T21:00:00",
    likeCount: 0,
    imageUrls: [],
  },
  {
    reviewId: 10,
    storeId: 1,
    username: usernames[8],
    content: "또 가고 싶어요.",
    rating: 5,
    createdAt: "2024-07-01T12:00:00",
    likeCount: 0,
    imageUrls: ["https://picsum.photos/seed/rev10/200/200"],
  },
  // ── 가게 4 (든든 국밥) 추가 리뷰 ──
  {
    reviewId: 11,
    storeId: 4,
    username: usernames[9],
    content: "새벽에 출출할 때 딱이에요. 국물이 진하고 좋습니다.",
    rating: 4,
    createdAt: "2024-06-22T02:30:00",
    likeCount: 1,
    imageUrls: [],
  },
  {
    reviewId: 12,
    storeId: 4,
    username: usernames[10],
    content: "밥 양도 많고 가격도 착해요!",
    rating: 5,
    createdAt: "2024-06-25T12:00:00",
    likeCount: 3,
    imageUrls: ["https://picsum.photos/seed/rev12/200/200"],
  },
  // ── 가게 5 (바삭 치킨) 추가 리뷰 ──
  {
    reviewId: 13,
    storeId: 5,
    username: usernames[10],
    content: "양념치킨도 맛있어요. 소스가 달지 않아서 좋아요.",
    rating: 4,
    createdAt: "2024-06-24T21:00:00",
    likeCount: 1,
    imageUrls: ["https://picsum.photos/seed/rev13/200/200"],
  },
  {
    reviewId: 14,
    storeId: 5,
    username: usernames[8],
    content: "배달이 빠르고 치킨이 눅눅하지 않아요.",
    rating: 5,
    createdAt: "2024-06-28T19:30:00",
    likeCount: 2,
    imageUrls: [],
  },
  // ── 가게 6 (피자 천국) 추가 리뷰 ──
  {
    reviewId: 15,
    storeId: 6,
    username: usernames[8],
    content: "토핑이 정말 듬뿍 올라와요. 가성비 최고!",
    rating: 5,
    createdAt: "2024-06-27T12:30:00",
    likeCount: 3,
    imageUrls: [
      "https://picsum.photos/seed/rev15a/200/200",
      "https://picsum.photos/seed/rev15b/200/200",
    ],
  },
  {
    reviewId: 16,
    storeId: 6,
    username: usernames[9],
    content: "치즈가 쭉쭉 늘어나서 사진 찍기 좋아요.",
    rating: 4,
    createdAt: "2024-06-30T18:00:00",
    likeCount: 1,
    imageUrls: ["https://picsum.photos/seed/rev16/200/200"],
  },
  // ── 가게 7 (버거 농장) ──
  {
    reviewId: 17,
    storeId: 7,
    username: usernames[8],
    content: "패티가 두툼하고 육즙이 살아있어요!",
    rating: 5,
    createdAt: "2024-07-01T12:00:00",
    likeCount: 4,
    imageUrls: ["https://picsum.photos/seed/rev17/200/200"],
  },
  {
    reviewId: 18,
    storeId: 7,
    username: usernames[9],
    content: "감자튀김이 좀 짜긴 한데 버거는 맛있어요.",
    rating: 3,
    createdAt: "2024-07-03T13:30:00",
    likeCount: 0,
    imageUrls: [],
  },
  {
    reviewId: 19,
    storeId: 7,
    username: usernames[10],
    content: "혼밥하기 좋습니다. 자리도 편해요.",
    rating: 4,
    createdAt: "2024-07-05T11:00:00",
    likeCount: 2,
    imageUrls: ["https://picsum.photos/seed/rev19/200/200"],
  },
  // ── 가게 8 (이밥 달인) ──
  {
    reviewId: 20,
    storeId: 8,
    username: usernames[9],
    content: "재료가 신선한 게 느껴져요. 매일 가고 싶은 곳!",
    rating: 5,
    createdAt: "2024-07-02T12:30:00",
    likeCount: 3,
    imageUrls: [
      "https://picsum.photos/seed/rev20a/200/200",
      "https://picsum.photos/seed/rev20b/200/200",
    ],
  },
  {
    reviewId: 21,
    storeId: 8,
    username: usernames[10],
    content: "반찬이 다양하고 맛있어요.",
    rating: 4,
    createdAt: "2024-07-04T12:00:00",
    likeCount: 1,
    imageUrls: [],
  },
  {
    reviewId: 22,
    storeId: 8,
    username: usernames[8],
    content: "양이 좀 적은 편이에요. 맛은 좋습니다.",
    rating: 3,
    createdAt: "2024-07-06T13:00:00",
    likeCount: 0,
    imageUrls: [],
  },
  // ── 가게 9 (감성 포차) ──
  {
    reviewId: 23,
    storeId: 9,
    username: usernames[8],
    content: "분위기가 정말 좋아요. 안주도 맛있고!",
    rating: 5,
    createdAt: "2024-07-01T22:00:00",
    likeCount: 5,
    imageUrls: ["https://picsum.photos/seed/rev23/200/200"],
  },
  {
    reviewId: 24,
    storeId: 9,
    username: usernames[9],
    content: "주류 가격이 좀 있지만 분위기 값이라고 생각해요.",
    rating: 3,
    createdAt: "2024-07-03T23:30:00",
    likeCount: 1,
    imageUrls: [],
  },
  {
    reviewId: 25,
    storeId: 9,
    username: usernames[10],
    content: "소주 한잔하기 딱 좋은 곳입니다. 재방문 의사 있어요.",
    rating: 4,
    createdAt: "2024-07-05T21:00:00",
    likeCount: 2,
    imageUrls: [
      "https://picsum.photos/seed/rev25a/200/200",
      "https://picsum.photos/seed/rev25b/200/200",
    ],
  },
  // ── 가게 10 (달콤 베이커리) ──
  {
    reviewId: 26,
    storeId: 10,
    username: usernames[10],
    content: "크루아상이 정말 바삭하고 맛있어요!",
    rating: 5,
    createdAt: "2024-07-02T09:00:00",
    likeCount: 4,
    imageUrls: ["https://picsum.photos/seed/rev26/200/200"],
  },
  {
    reviewId: 27,
    storeId: 10,
    username: usernames[8],
    content: "소금빵 대박입니다. 줄 서서 먹을 만해요.",
    rating: 5,
    createdAt: "2024-07-04T10:30:00",
    likeCount: 3,
    imageUrls: ["https://picsum.photos/seed/rev27/200/200"],
  },
  {
    reviewId: 28,
    storeId: 10,
    username: usernames[9],
    content: "케이크 종류가 더 다양했으면 좋겠어요.",
    rating: 3,
    createdAt: "2024-07-06T15:00:00",
    likeCount: 0,
    imageUrls: [],
  },
];

// 소식 (seed SQL에 없으므로 직접 추가)
const storeNews = [
  {
    id: 1,
    storeId: 1,
    title: "6월 신메뉴 출시!",
    content:
      "여름 한정 레몬 크림 파스타가 출시되었습니다. 상큼한 레몬과 크리미한 소스의 조합!",
    createdAt: "2024-06-01T10:00:00",
    imageUrls: ["https://picsum.photos/seed/news1/400/300"],
    likeCount: 12,
    commentCount: 3,
    liked: false,
  },
  {
    id: 2,
    storeId: 1,
    title: "영업시간 변경 안내",
    content: "7월부터 영업시간이 11:00~23:00으로 변경됩니다.",
    createdAt: "2024-06-20T09:00:00",
    imageUrls: [],
    likeCount: 5,
    commentCount: 1,
    liked: false,
  },
  {
    id: 3,
    storeId: 2,
    title: "원두 변경 안내",
    content:
      "에티오피아 예가체프 원두로 변경합니다. 더욱 풍부한 향을 즐겨보세요!",
    createdAt: "2024-06-15T11:00:00",
    imageUrls: ["https://picsum.photos/seed/news3/400/300"],
    likeCount: 8,
    commentCount: 2,
    liked: false,
  },
  {
    id: 4,
    storeId: 3,
    title: "매운맛 챌린지 이벤트",
    content: "지옥의 떡볶이 완식 시 무료! 도전하세요!",
    createdAt: "2024-06-10T14:00:00",
    imageUrls: ["https://picsum.photos/seed/news4/400/300"],
    likeCount: 25,
    commentCount: 8,
    liked: false,
  },
  {
    id: 5,
    storeId: 4,
    title: "국밥 리뉴얼",
    content: "사골 육수를 12시간 우려내 더욱 진해진 국밥!",
    createdAt: "2024-06-05T07:00:00",
    imageUrls: ["https://picsum.photos/seed/news5/400/300"],
    likeCount: 15,
    commentCount: 4,
    liked: false,
  },
  {
    id: 6,
    storeId: 5,
    title: "치킨 + 맥주 세트 할인",
    content: "치킨 + 생맥주 2잔 세트 25,000원! (기존 29,000원)",
    createdAt: "2024-06-18T16:00:00",
    imageUrls: ["https://picsum.photos/seed/news6/400/300"],
    likeCount: 30,
    commentCount: 5,
    liked: false,
  },
];

// 즐겨찾기 수 (가짜)
const favoriteCounts = {
  1: 42,
  2: 28,
  3: 15,
  4: 33,
  5: 51,
  6: 19,
  7: 8,
  8: 5,
  9: 12,
  10: 7,
};

// ── 헬퍼 ────────────────────────────────────────────────────

function ok(data) {
  return JSON.stringify({ isSuccess: true, data });
}

function pageResponse(items, page, size) {
  const start = page * size;
  const sliced = items.slice(start, start + size);
  return {
    content: sliced,
    pageNumber: page,
    pageSize: size,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    sort: "createdAt: DESC",
    last: start + size >= items.length,
  };
}

function parseQuery(url) {
  const q = {};
  const idx = url.indexOf("?");
  if (idx === -1) return q;
  url
    .substring(idx + 1)
    .split("&")
    .forEach((pair) => {
      const [k, v] = pair.split("=");
      q[decodeURIComponent(k)] = decodeURIComponent(v || "");
    });
  return q;
}

function computeReviewStats(storeId) {
  const storeReviews = reviews.filter((r) => r.storeId === storeId);
  const total = storeReviews.length;
  const avg =
    total > 0 ? storeReviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  storeReviews.forEach((r) => dist[r.rating]++);
  return {
    averageRating: Math.round(avg * 100) / 100,
    totalReviews: total,
    rating1Count: dist[1],
    rating2Count: dist[2],
    rating3Count: dist[3],
    rating4Count: dist[4],
    rating5Count: dist[5],
  };
}

// ── 라우팅 ──────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = req.url;
  const query = parseQuery(url);
  const path = url.split("?")[0];

  // GET /api/stores/:id
  let m = path.match(/^\/api\/stores\/(\d+)$/);
  if (m && req.method === "GET") {
    const store = stores.find((s) => s.id === +m[1]);
    if (!store) {
      res.writeHead(404);
      return res.end(JSON.stringify({ isSuccess: false, data: null }));
    }
    res.writeHead(200);
    return res.end(ok(store));
  }

  // GET /api/stores/:id/reviews/stats
  m = path.match(/^\/api\/stores\/(\d+)\/reviews\/stats$/);
  if (m && req.method === "GET") {
    res.writeHead(200);
    return res.end(ok(computeReviewStats(+m[1])));
  }

  // GET /api/stores/:id/reviews
  m = path.match(/^\/api\/stores\/(\d+)\/reviews$/);
  if (m && req.method === "GET") {
    const page = parseInt(query.page || "0");
    const size = parseInt(query.size || "20");
    const storeReviews = reviews.filter((r) => r.storeId === +m[1]);
    res.writeHead(200);
    return res.end(ok(pageResponse(storeReviews, page, size)));
  }

  // GET /api/stores/:id/favorites/count
  m = path.match(/^\/api\/stores\/(\d+)\/favorites\/count$/);
  if (m && req.method === "GET") {
    res.writeHead(200);
    return res.end(ok(favoriteCounts[+m[1]] || 0));
  }

  // GET /api/stores/:id/coupons
  m = path.match(/^\/api\/stores\/(\d+)\/coupons$/);
  if (m && req.method === "GET") {
    const storeCoupons = coupons.filter((c) => c.storeId === +m[1]);
    res.writeHead(200);
    return res.end(ok(storeCoupons));
  }

  // GET /api/stores/:id/news
  m = path.match(/^\/api\/stores\/(\d+)\/news$/);
  if (m && req.method === "GET") {
    const page = parseInt(query.page || "0");
    const size = parseInt(query.size || "20");
    const news = storeNews.filter((n) => n.storeId === +m[1]);
    res.writeHead(200);
    return res.end(ok(pageResponse(news, page, size)));
  }

  // GET /api/stores/:id/items
  m = path.match(/^\/api\/stores\/(\d+)\/items$/);
  if (m && req.method === "GET") {
    const storeItems = items.filter((i) => i.storeId === +m[1]);
    res.writeHead(200);
    return res.end(ok(storeItems));
  }

  // GET /api/stores (목록 - 지도에서 사용)
  if (path === "/api/stores" && req.method === "GET") {
    const page = parseInt(query.page || "0");
    const size = parseInt(query.size || "20");

    const keyword = (query.keyword || "").trim().toLowerCase();

    const filtered = keyword
      ? stores.filter((s) => (s.name || "").toLowerCase().includes(keyword))
      : stores;

    res.writeHead(200);
    return res.end(ok(pageResponse(filtered, page, size)));
  }

  // POST /api/auth/login (더미 토큰)
  if (path === "/api/auth/login" && req.method === "POST") {
    res.writeHead(200);
    return res.end(
      ok({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      }),
    );
  }

  // fallback
  res.writeHead(404);
  res.end(JSON.stringify({ isSuccess: false, data: null }));
});

server.listen(4010, () => {
  console.log("Mock API server running at http://localhost:4010");
  console.log("");
  console.log("Available endpoints:");
  console.log("  GET /api/stores/:id");
  console.log("  GET /api/stores/:id/reviews/stats");
  console.log("  GET /api/stores/:id/reviews?page=0&size=20");
  console.log("  GET /api/stores/:id/favorites/count");
  console.log("  GET /api/stores/:id/coupons");
  console.log("  GET /api/stores/:id/news?page=0&size=20");
  console.log("  GET /api/stores/:id/items");
  console.log("  GET /api/stores");
  console.log("");
  console.log("Stores: 1~10 | Try: curl http://localhost:4010/api/stores/1");
});
