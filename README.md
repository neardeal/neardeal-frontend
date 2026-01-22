# NearDeal - 대학생 제휴혜택 플랫폼

> 우리대학 제휴혜택이 궁금할 땐? NearDeal!

Expo 기반의 React Native 크로스플랫폼 모바일 애플리케이션입니다.

---

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [폴더 및 파일 설명](#폴더-및-파일-설명)
- [Assets 작명 규칙](#assets-작명-규칙)
- [개발 가이드](#개발-가이드)
- [주요 기능](#주요-기능)
- [환경 변수](#환경-변수)
- [스크립트](#스크립트)

---

## 프로젝트 개요

NearDeal은 대학생들을 위한 제휴혜택 플랫폼입니다. 학교 이메일 인증을 통해 다양한 학생 혜택을 제공하는 서비스입니다.

### 주요 특징

- **Expo SDK 54** 기반 개발
- **TypeScript** 완전 적용 (strict mode)
- **Expo Router** 파일 기반 라우팅
- **React Query** 서버 상태 관리
- **Zustand** 클라이언트 상태 관리
- **Light/Dark 테마** 지원
- **반응형 디자인** (375px 기준)
- **SVG 컴포넌트** 방식 사용
- **Secure Store** 토큰 보안 저장

---

## 기술 스택

### Core

- **React** 19.1.0
- **React Native** 0.81.5
- **Expo** ~54.0.31
- **TypeScript** ~5.9.2

### Navigation & Routing

- **expo-router** ~6.0.21 (파일 기반 라우팅)
- **@react-navigation/native** ^7.1.8
- **@react-navigation/bottom-tabs** ^7.4.0
- **react-native-screens** ~4.16.0

### State Management

- **zustand** ^5.0.10 (클라이언트 상태)
- **@tanstack/react-query** ^5.90.19 (서버 상태)

### Network

- **axios** ^1.13.2

### UI & Styling

- **react-native-svg** 15.12.1 (SVG 지원)
- **@expo/vector-icons** ^15.0.3
- **expo-image** ~3.0.11

### Native Modules

- **expo-secure-store** ~15.0.8 (보안 토큰 저장)
- **expo-haptics** ~15.0.8 (햅틱 피드백)
- **expo-font** ~14.0.10
- **expo-status-bar** ~3.0.9
- **expo-splash-screen** ~31.0.13

### Animation

- **react-native-reanimated** ~4.1.1
- **react-native-gesture-handler** ~2.28.0
- **react-native-worklets** 0.5.1

### Development

- **eslint** ^9.25.0
- **eslint-config-expo** ~10.0.0
- **react-native-svg-transformer** ^1.5.2

---

## 시작하기

### 필수 요구사항

- **Node.js** 18 이상
- **npm** 또는 **yarn**
- **Expo CLI** (글로벌 설치 권장)
- **Android Studio** (Android 개발 시)
- **Xcode** (iOS 개발 시, macOS만 가능)

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   ```

2. **개발 서버 시작**

   ```bash
   npm start
   # 또는
   npx expo start
   ```

3. **플랫폼별 실행**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

4. **ESLint 검사**

   ```bash
   npm run lint
   ```

### 개발 환경 선택

Expo 개발 서버를 시작하면 다음 옵션이 제공됩니다:

- **Expo Go**: 간단한 테스트용 (제한적 기능)
- **Development Build**: 전체 기능 사용 가능
- **Android Emulator**: Android Studio 에뮬레이터
- **iOS Simulator**: Xcode 시뮬레이터 (macOS만)

---

## 프로젝트 구조

```
rn-app/
├── src/                          # 메인 소스 코드
│   ├── api/                      # API 통신 레이어
│   │   ├── auth.ts               # 인증 관련 API (구현 예정)
│   │   └── client.ts             # HTTP 클라이언트 설정 (구현 예정)
│   │
│   ├── app/                      # 라우팅 및 화면 (Expo Router)
│   │   ├── _layout.tsx           # 루트 레이아웃 (Query Provider 포함)
│   │   ├── index.tsx             # 홈 (랜딩으로 리다이렉트)
│   │   ├── landing.tsx           # 스플래시/랜딩 화면
│   │   ├── signup.tsx            # 회원가입 메인 화면
│   │   └── signin-email.tsx      # 이메일 로그인 화면
│   │
│   ├── components/               # 재사용 가능한 UI 컴포넌트
│   │   ├── button/
│   │   │   ├── AppButton.tsx     # 초록색 버튼 컴포넌트
│   │   │   └── ArrowLeft.tsx     # SVG 뒤로가기 버튼
│   │   ├── input/
│   │   │   ├── EmailInput.tsx    # 이메일 입력 필드
│   │   │   └── TypeSelector.tsx  # 라디오 스타일 선택 컴포넌트
│   │   ├── themed-text.tsx       # 테마 지원 텍스트 컴포넌트
│   │   └── themed-view.tsx       # 테마 지원 View 래퍼
│   │
│   ├── constants/
│   │   └── env.ts                # 환경 변수 (API URL, Asset URL)
│   │
│   ├── hooks/                    # 커스텀 React Hooks (구현 예정)
│   │
│   ├── theme/
│   │   ├── theme.ts              # 컬러 및 폰트 정의
│   │   └── scale.ts              # 반응형 스케일링 유틸리티 (375px 기준)
│   │
│   ├── types/
│   │   └── svg.d.ts              # SVG 모듈 타입 선언
│   │
│   └── utils/
│       └── storage.ts            # Secure Store 토큰 관리
│
├── assets/                       # 이미지 및 미디어 파일
│   └── images/
│       ├── common/               # 공통 아이콘
│       │   └── arrow-right-icon.svg
│       ├── icons/                # 기능별 아이콘
│       │   └── signup/           # 회원가입 관련 아이콘
│       │       ├── index.ts      # 아이콘 export
│       │       ├── apple-icon.svg
│       │       ├── google-icon.svg
│       │       ├── kakao-icon.svg
│       │       ├── graduation-icon.svg
│       │       ├── switch-on-icon.svg
│       │       └── switch-off-icon.svg
│       └── logo/                 # 로고 파일
│           └── neardeal-logo.svg
│
├── scripts/                      # 유틸리티 스크립트
│   └── reset-project.js          # 프로젝트 초기화 스크립트
│
├── .expo/                        # Expo 설정 (자동 생성)
├── .vscode/                      # VSCode 설정
│   └── mcp.json
├── node_modules/                 # 의존성 패키지
│
├── app.json                      # Expo 앱 설정
├── package.json                  # 의존성 및 스크립트
├── package-lock.json             # 의존성 잠금 파일
├── tsconfig.json                 # TypeScript 설정
├── metro.config.js               # Metro 번들러 설정 (SVG 변환 포함)
├── eslint.config.js              # ESLint 설정
├── expo-env.d.ts                 # Expo 타입 정의
└── README.md                     # 프로젝트 문서
```

---

## 폴더 및 파일 설명

### `/src/api` - API 통신 레이어

백엔드 API와 통신하는 함수들을 정의합니다.

- **auth.ts**: 로그인, 회원가입, 토큰 갱신 등 인증 관련 API (구현 예정)
- **client.ts**: Axios 인스턴스 설정, 인터셉터 등 (구현 예정)

### `/src/app` - 화면 및 라우팅

**Expo Router**를 사용한 파일 기반 라우팅입니다. 파일명이 곧 라우트 경로가 됩니다.

#### 화면 흐름

```
/ (index.tsx)
  └─ /landing으로 리다이렉트

/landing (landing.tsx)
  └─ 1초 후 /signup으로 자동 이동
  └─ NearDeal 로고 표시
  └─ "우리대학 제휴혜택이 궁금할 땐?" 문구

/signup (signup.tsx)
  └─ 회원가입 메인 화면
  └─ 학교 이메일 버튼 → /signin-email 이동
  └─ 소셜 로그인 버튼 (카카오, 구글, 애플)
  └─ 이용약관 및 개인정보 처리방침 텍스트

/signin-email (signin-email.tsx)
  └─ 이메일 인증 플로우
  └─ 이메일 입력 → 인증코드 요청
  └─ 5분 제한시간 인증코드 입력
  └─ 아이디/비밀번호 찾기 탭
```

#### 주요 파일

- **\_layout.tsx**: 앱 전체 레이아웃
  - React Query Provider 설정
  - Stack Navigator 구성
  - StatusBar 스타일 관리
  - `react-native-reanimated` 로드

- **index.tsx**: 루트 경로, `/landing`으로 리다이렉트

- **landing.tsx**: 스플래시 화면
  - 1초 후 자동으로 `/signup`으로 이동
  - NearDeal 로고 및 문구 표시

- **signup.tsx**: 회원가입 선택 화면
  - 학교 이메일 인증 버튼
  - 소셜 로그인 버튼 (카카오, 구글, 애플)

- **signin-email.tsx**: 이메일 인증 화면
  - 이메일 입력 및 인증코드 전송
  - 5분 타이머
  - 아이디/비밀번호 찾기 기능

### `/src/components` - 재사용 컴포넌트

#### 버튼 컴포넌트 (`/button`)

- **AppButton.tsx**: 기본 스타일링된 버튼
  - Props: `text`, `onPress`, `disabled`, `style`
  - 기본 색상: `#40ce2b` (초록색)
  - 비활성화 시: `#e0e0e0` (회색)

- **ArrowLeft.tsx**: SVG 뒤로가기 버튼
  - Props: `onPress`, `color`
  - 네비게이션 뒤로가기 기능

#### 입력 컴포넌트 (`/input`)

- **EmailInput.tsx**: 이메일 입력 필드
  - Props: `value`, `onChangeText`, `placeholder`
  - 학교 이메일 형식 플레이스홀더
  - 테두리 스타일 적용

- **TypeSelector.tsx**: 라디오 스타일 선택 컴포넌트
  - Props: `options`, `selected`, `onSelect`
  - 회원가입 타입, 성별 선택 등에 사용
  - 토글 아이콘 (switch-on/off-icon.svg)

#### 테마 컴포넌트

- **themed-text.tsx**: 테마 적용 텍스트
  - 라이트/다크 모드 자동 적용
  - 스타일 종류: `default`, `title`, `subtitle`, `link`
  - Pretendard 폰트 사용 (한국어)

- **themed-view.tsx**: 테마 적용 View
  - 라이트/다크 배경색 자동 전환

### `/src/theme` - 테마 시스템

- **theme.ts**: 컬러 팔레트 및 폰트 정의
  - Light 모드: 어두운 텍스트 (`#11181C`) / 흰색 배경
  - Dark 모드: 밝은 텍스트 (`#ECEDEE`) / 어두운 배경 (`#151718`)
  - 폰트: Pretendard (한국어), Inter, 시스템 폰트

- **scale.ts**: 반응형 스케일링 유틸리티
  - `rs(size)` 함수: 375px 기준 비율 계산
  - 예: Figma 디자인이 375px 기준이면 `rs(16)` → 디바이스 너비에 비례

### `/src/utils` - 유틸리티 함수

- **storage.ts**: 보안 토큰 저장 관리(수정 예정)
  - `setTokens(accessToken, refreshToken)`: 토큰 저장
  - `getTokens()`: 토큰 조회
  - `clearTokens()`: 토큰 삭제
  - Expo Secure Store 사용 (네이티브 보안 저장소)

### `/src/constants` - 상수 정의

- **env.ts**: 환경 변수
  - `ENV.API_BASE_URL`: 백엔드 API URL (기본: `http://localhost:8000`)
  - `ENV.ASSET_BASE_URL`: 애셋 서버 URL (기본: `http://localhost:3845`)

### `/src/types` - TypeScript 타입 정의

- **svg.d.ts**: SVG 모듈 타입 선언
  - SVG 파일을 React 컴포넌트로 import 가능하게 설정

---

## Assets 작명 규칙

### 디렉토리 구조

```
assets/images/
├── common/          # 공통으로 사용되는 아이콘/이미지
├── icons/           # 기능별 아이콘
│   ├── signup/      # 회원가입 관련 아이콘
│   ├── home/        # 홈 화면 아이콘 (예정)
│   └── profile/     # 프로필 화면 아이콘 (예정)
└── logo/            # 브랜드 로고
```

### 파일 작명 규칙

#### 1. **기본 형식**

```
{기능}-{설명}-{상태}.{확장자}
```

#### 2. **케밥 케이스 (kebab-case) 사용**

모든 파일명은 소문자와 하이픈(`-`)으로 구성합니다.

```
✅ arrow-right-icon.svg
✅ neardeal-logo.svg
✅ switch-on-icon.svg
❌ ArrowRightIcon.svg
❌ nearDeal_logo.svg
❌ switchOnIcon.svg
```

#### 3. **카테고리별 작명 규칙**

##### 아이콘 (icons/)

- **형식**: `{기능명}-icon.svg`
- **상태가 있는 경우**: `{기능명}-{상태}-icon.svg`

```
kakao-icon.svg           # 카카오 로그인 아이콘
google-icon.svg          # 구글 로그인 아이콘
apple-icon.svg           # 애플 로그인 아이콘
graduation-icon.svg      # 졸업모자 (학교) 아이콘
switch-on-icon.svg       # 토글 켜짐 상태
switch-off-icon.svg      # 토글 꺼짐 상태
```

##### 공통 아이콘 (common/)

- **형식**: `{방향/동작}-{타입}.svg`

```
arrow-right-icon.svg     # 오른쪽 화살표
arrow-left-icon.svg      # 왼쪽 화살표 (예정)
close-icon.svg           # 닫기 아이콘 (예정)
search-icon.svg          # 검색 아이콘 (예정)
```

##### 로고 (logo/)

- **형식**: `{브랜드명}-logo.svg`

```
neardeal-logo.svg        # NearDeal 메인 로고
neardeal-logo-white.svg  # 흰색 버전 (예정)
neardeal-logo-symbol.svg # 심볼만 (예정)
```

##### 이미지 (추가 예정)

- **형식**: `{설명}-{번호}.{확장자}`

```
banner-1.png             # 배너 이미지 1번
placeholder-avatar.png   # 기본 프로필 이미지
background-pattern.png   # 배경 패턴
```

#### 4. **화면별 아이콘 그룹화**

화면이나 기능별로 폴더를 생성하여 관리합니다.

```
icons/
├── signup/              # 회원가입 관련 아이콘
│   ├── kakao-icon.svg
│   ├── google-icon.svg
│   ├── apple-icon.svg
│   └── graduation-icon.svg
├── home/                # 홈 화면 아이콘 (예정)
├── profile/             # 프로필 화면 아이콘 (예정)
└── deal/                # 딜/혜택 관련 아이콘 (예정)
```

#### 5. **index.ts로 export 관리**

각 아이콘 폴더에 `index.ts`를 생성하여 export를 관리합니다.

```typescript
// assets/images/icons/signup/index.ts
export { default as KakaoIcon } from "./kakao-icon.svg";
export { default as GoogleIcon } from "./google-icon.svg";
export { default as AppleIcon } from "./apple-icon.svg";
export { default as GraduationIcon } from "./graduation-icon.svg";
export { default as SwitchOnIcon } from "./switch-on-icon.svg";
export { default as SwitchOffIcon } from "./switch-off-icon.svg";
```

사용 예시:

```typescript
import { KakaoIcon, GoogleIcon } from '@/assets/images/icons/signup';

<KakaoIcon width={24} height={24} />
```

#### 6. **상태별 아이콘 작명**

상호작용이 있는 아이콘은 상태를 명확히 표시합니다.

```
button-primary.svg       # 기본 버튼
button-primary-pressed.svg  # 눌림 상태
button-primary-disabled.svg # 비활성화 상태

checkbox-off.svg         # 체크박스 해제
checkbox-on.svg          # 체크박스 선택

heart-outlined.svg       # 빈 하트
heart-filled.svg         # 채워진 하트
```

#### 7. **크기별 파일 (필요시)**

동일 아이콘의 여러 크기가 필요한 경우:

```
logo-small.svg           # 작은 로고 (예: 24x24)
logo-medium.svg          # 중간 로고 (예: 48x48)
logo-large.svg           # 큰 로고 (예: 96x96)
```

단, SVG는 확장 가능하므로 **하나의 파일**로 관리하는 것을 권장합니다.

#### 8. **네이밍 체크리스트**

새로운 애셋을 추가할 때 확인사항:

- [ ] 모두 소문자로 작성했는가?
- [ ] 하이픈(`-`)으로 단어를 구분했는가?
- [ ] 파일명이 용도를 명확히 설명하는가?
- [ ] 적절한 폴더에 위치했는가?
- [ ] 상태가 있다면 명확히 표시했는가?
- [ ] `index.ts`에 export를 추가했는가?

---

## 개발 가이드

### 새로운 화면 추가하기

1. `/src/app/` 폴더에 `.tsx` 파일 생성
2. 파일명이 곧 라우트 경로가 됩니다
   - 예: `profile.tsx` → `/profile` 경로
3. 화면 컴포넌트를 default export

```typescript
// src/app/profile.tsx
export default function ProfileScreen() {
  return (
    <View>
      <Text>프로필 화면</Text>
    </View>
  );
}
```

### 새로운 컴포넌트 추가하기

1. `/src/components/` 하위에 적절한 폴더 생성
2. 컴포넌트 파일 생성 (PascalCase)
3. Props 타입 정의

```typescript
// src/components/card/DealCard.tsx
import { View, Text } from 'react-native';

type DealCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export function DealCard({ title, description, imageUrl }: DealCardProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}
```

### API 연동하기

1. `/src/api/client.ts`에서 Axios 인스턴스 설정
2. `/src/api/` 하위에 도메인별 파일 생성
3. React Query를 사용하여 데이터 페칭

```typescript
// src/api/deals.ts
import { client } from "./client";

export const getDeals = async () => {
  const { data } = await client.get("/deals");
  return data;
};

// 화면에서 사용
import { useQuery } from "@tanstack/react-query";
import { getDeals } from "@/api/deals";

const { data, isLoading } = useQuery({
  queryKey: ["deals"],
  queryFn: getDeals,
});
```

### 테마 컬러 사용하기

```typescript
import { Colors } from "@/theme/theme";
import { useColorScheme } from "react-native";

const colorScheme = useColorScheme();
const textColor = Colors[colorScheme ?? "light"].text;
```

### 반응형 스케일링 적용하기

```typescript
import { rs } from "@/theme/scale";

const styles = StyleSheet.create({
  container: {
    padding: rs(16), // 375px 기준 16px
    marginTop: rs(24), // 375px 기준 24px
  },
});
```

#### rs() 사용 기준

`rs()`는 375px 기준 디자인을 화면 너비에 맞춰 스케일링하는 함수입니다. 모든 값에 적용하면 안 되고, 아래 기준에 따라 선택적으로 사용합니다.

##### rs() 사용하는 경우

| 항목 | 예시 | 이유 |
|------|------|------|
| **터치 영역 (width/height)** | 버튼, 아이콘 버튼의 크기 | 큰 화면에서 터치 타겟이 너무 작아 보이지 않게 |
| **주요 컴포넌트 높이** | 검색바, 헤더, 카드 등 | 핵심 UI 요소의 비율 유지 |
| **아이콘 크기** | 컴포넌트 내부 아이콘 | 컴포넌트와 비례 유지 |
| **큰 간격 (20 이상)** | 섹션 간 여백 | 레이아웃 비율 유지 |

```typescript
// 사용 예시
backButton: {
  width: rs(40),
  height: rs(40),
},
searchBox: {
  height: rs(56),
},
```

##### rs() 사용하지 않는 경우

| 항목 | 예시 | 이유 |
|------|------|------|
| **fontSize** | `fontSize: 16` | RN Text는 시스템 접근성 설정을 따르는 것이 권장됨 |
| **borderWidth** | `borderWidth: 1` | 1~2px은 스케일링하면 흐려지거나 뭉개짐 |
| **borderRadius** | `borderRadius: 8` | 작은 값(4~12)은 고정이 자연스러움 |
| **작은 간격** | `padding: 8`, `gap: 12` | 미세 조정 값은 고정 |
| **그림자 값** | `shadowOffset`, `shadowRadius` | 스케일링하면 비율이 이상해짐 |

```typescript
// 고정값 예시
filterText: {
  fontSize: 14,        // 고정
},
filterButton: {
  borderRadius: 8,     // 고정
  borderWidth: 1,      // 고정
  paddingHorizontal: 16, // 고정 (작은 값)
  paddingVertical: 8,    // 고정 (작은 값)
},
```

##### 일관성 유지

동일한 역할의 요소에는 동일한 방식을 적용합니다.

```typescript
// 모든 터치 버튼에 일관되게 rs() 적용
backButton: { width: rs(40), height: rs(40) },
controlButton: { width: rs(44), height: rs(44) },  // 동일하게 rs() 사용
searchIconButton: { width: rs(40), height: rs(40) },
```

### SVG 아이콘 사용하기

```typescript
import NearDealLogo from '@/assets/images/logo/neardeal-logo.svg';
import { KakaoIcon } from '@/assets/images/icons/signup';

// 사용
<NearDealLogo width={216} height={73} />
<KakaoIcon width={24} height={24} />
```

---

## 주요 기능

### 1. 인증 시스템

- **학교 이메일 인증**: 대학 이메일로 회원가입
- **인증코드 발송**: 이메일로 5분 유효 인증코드 전송
- **소셜 로그인**: 카카오, 구글, 애플 로그인 지원 (구현 예정)
- **보안 토큰 저장**: Expo Secure Store 사용

### 2. 테마 시스템

- **컬러 팔레트**: 일관된 디자인 시스템
- **Themed 컴포넌트**: 자동으로 테마 적용되는 컴포넌트

### 3. 반응형 디자인

- **375px 기준**: Figma 디자인 기준
- **rs() 함수**: 디바이스 크기에 비례하여 스케일링
- **SafeArea**: 노치 및 하단 바 자동 처리

### 4. SVG 아이콘 시스템

- **컴포넌트 방식**: SVG를 React 컴포넌트로 사용
- **커스터마이징**: Props로 width, height, color 조절
- **타입 안전성**: TypeScript 지원

---

## 환경 변수

### 설정 파일 위치

[src/constants/env.ts](src/constants/env.ts)

### 기본 설정

```typescript
export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000",
  ASSET_BASE_URL: process.env.EXPO_PUBLIC_ASSET_URL || "http://localhost:3845",
};
```

### 환경 변수 사용하기

프로젝트 루트에 `.env` 파일 생성:

```env
EXPO_PUBLIC_API_URL=https://api.neardeal.com
EXPO_PUBLIC_ASSET_URL=https://assets.neardeal.com
```

> **주의**: Expo에서는 환경 변수 앞에 `EXPO_PUBLIC_` 접두사가 필요합니다.

---

## 스크립트

### 개발 서버

```bash
npm start
# Expo 개발 서버 시작
# QR 코드 스캔으로 Expo Go에서 실행 가능
```

### 플랫폼별 실행

```bash
npm run android   # Android 에뮬레이터/기기에서 실행
npm run ios       # iOS 시뮬레이터에서 실행 (macOS만)
npm run web       # 웹 브라우저에서 실행
```

### 코드 품질

```bash
npm run lint      # ESLint 검사
```

### 프로젝트 초기화

```bash
npm run reset-project
# 초기 템플릿 코드를 app-example로 이동
# 빈 app 폴더 생성
```

---

## 협업 가이드

### Git 브랜치 전략

```bash
master          # 메인 브랜치
develop         # 개발 브랜치
feature/xxx     # 기능 개발 브랜치
bugfix/xxx      # 버그 수정 브랜치
hotfix/xxx      # 긴급 수정 브랜치
```

### 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 업무, 패키지 매니저 설정 등

예시:
feat: 회원가입 화면 UI 구현
fix: 로그인 시 토큰 저장 오류 수정
docs: README에 환경 변수 설명 추가
```

### Pull Request 체크리스트

- [ ] ESLint 오류 없음 (`npm run lint`)
- [ ] TypeScript 타입 오류 없음
- [ ] 테스트 통과 (테스트 코드 작성 시)
- [ ] 새로운 화면/컴포넌트 추가 시 README 업데이트
- [ ] 환경 변수 추가 시 팀원에게 공유

---

## 문제 해결

### Metro Bundler 캐시 삭제

```bash
npx expo start -c
# 또는
npx expo start --clear
```

### node_modules 재설치

```bash
rm -rf node_modules
npm install
```

### iOS 시뮬레이터 빌드 오류

```bash
cd ios
pod install
cd ..
npm run ios
```

### Android 빌드 오류

```bash
cd android
./gradlew clean
cd ..
npm run android
```

---

## 참고 자료

### 공식 문서

- [Expo 문서](https://docs.expo.dev/)
- [React Native 문서](https://reactnative.dev/)
- [Expo Router 문서](https://docs.expo.dev/router/introduction/)
- [React Query 문서](https://tanstack.com/query/latest)
- [Zustand 문서](https://zustand-demo.pmnd.rs/)

### 유용한 링크

- [Expo GitHub](https://github.com/expo/expo)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

## 라이선스

이 프로젝트는 Public 프로젝트입니다.

---

## 팀 연락처

프로젝트 관련 문의사항이 있으시면 팀 리드에게 연락해주세요.

---

**마지막 업데이트**: 2026-01-20
