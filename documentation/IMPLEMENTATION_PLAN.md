# 구현 계획 (Implementation Plan)

> **MVP 전략**: 데이터베이스 없이 프론트엔드 먼저 구현하여 빠르게 프로토타입을 만들고 검증합니다.
> Mock 데이터와 localStorage를 활용하여 전체 UI/UX 플로우를 완성한 후, 추후 백엔드를 연동합니다.

---

## 1. 기술 스택

### Frontend (MVP)
| 구분 | 기술 | 선택 이유 |
|------|------|----------|
| Framework | Next.js 14 (App Router) | SSR/SSG 지원, SEO 최적화, 빠른 개발 |
| Language | TypeScript | 타입 안정성, 개발 생산성 |
| Styling | Tailwind CSS | 빠른 UI 개발, 반응형 용이 |
| UI Components | shadcn/ui | 커스터마이징 용이, 접근성 지원 |
| Form | React Hook Form + Zod | 폼 관리 및 유효성 검사 |
| State | Zustand | 간단한 전역 상태 관리 |
| Data | Mock Data + localStorage | DB 없이 프로토타입 구현 |

### Backend (Phase 2 - 추후 연동)
| 구분 | 기술 | 선택 이유 |
|------|------|----------|
| Backend | Supabase | 빠른 개발, 인증/DB/스토리지 통합 |
| Database | PostgreSQL (Supabase) | 관계형 데이터 |
| Auth | Supabase Auth | 소셜 로그인 지원 |
| Payment | 토스페이먼츠 | 국내 결제, 정기결제 지원 |

### Infrastructure
| 구분 | 기술 | 선택 이유 |
|------|------|----------|
| Hosting | Vercel | Next.js 최적화, 간편한 배포 |
| Domain | 별도 구매 | 브랜딩 |

---

## 2. 프로젝트 구조

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 랜딩페이지
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── onboarding/
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── complete/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── meetings/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── mypage/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   ├── common/             # 공통 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Logo.tsx
│   │   ├── landing/            # 랜딩페이지 컴포넌트
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Benefits.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── FAQ.tsx
│   │   ├── auth/               # 인증 컴포넌트
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── onboarding/         # 온보딩 컴포넌트
│   │   │   ├── ProfileStep1.tsx
│   │   │   ├── ProfileStep2.tsx
│   │   │   ├── ProfileStep3.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── dashboard/          # 대시보드 컴포넌트
│   │   │   ├── WeeklyMeetingCard.tsx
│   │   │   ├── MeetingStats.tsx
│   │   │   └── UpcomingMeetings.tsx
│   │   ├── meetings/           # 모임 컴포넌트
│   │   │   ├── MeetingDetail.tsx
│   │   │   └── MemberCard.tsx
│   │   └── mypage/             # 마이페이지 컴포넌트
│   │       ├── ProfileInfo.tsx
│   │       └── SubscriptionInfo.tsx
│   │
│   ├── lib/
│   │   └── utils.ts            # 유틸리티 함수
│   │
│   ├── data/                   # Mock 데이터
│   │   ├── mockUsers.ts
│   │   ├── mockMeetings.ts
│   │   └── mockRestaurants.ts
│   │
│   ├── stores/                 # Zustand Stores
│   │   ├── authStore.ts        # 인증 상태 (mock)
│   │   ├── userStore.ts        # 사용자 정보
│   │   └── meetingStore.ts     # 모임 상태
│   │
│   └── types/                  # TypeScript 타입
│       └── index.ts
│
├── public/
│   └── images/
│
└── 설정 파일들
    ├── next.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── package.json
```

---

## 3. Mock 데이터 구조

### 3.1 타입 정의 (types/index.ts)

```typescript
// 사용자 프로필
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  neighborhood: string;
  gender: 'male' | 'female' | 'other';
  ageGroup: string;
  jobCategory: string;
  interests: string[];
  drinkingPref: 'like' | 'moderate' | 'none';
  talkStyle: number; // 1-5
  moodPref: number; // 1-5
  bio?: string;
  isSubscribed: boolean;
  subscriptionExpiresAt?: string;
}

// 모임
export interface Meeting {
  id: string;
  date: string;
  applyDeadline: string;
  status: 'upcoming' | 'closed' | 'completed';
}

// 식당
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  neighborhood: string;
  cuisineType: string;
}

// 모임 그룹
export interface MeetingGroup {
  id: string;
  meetingId: string;
  restaurant: Restaurant;
  members: User[];
}

// 신청 내역
export interface MeetingApplication {
  id: string;
  meetingId: string;
  userId: string;
  status: 'applied' | 'matched' | 'cancelled';
  createdAt: string;
}
```

### 3.2 Mock 데이터 예시

```typescript
// data/mockMeetings.ts
export const mockMeetings: Meeting[] = [
  {
    id: '1',
    date: '2025-01-24',
    applyDeadline: '2025-01-22T23:59:59',
    status: 'upcoming',
  },
  {
    id: '2',
    date: '2025-01-31',
    applyDeadline: '2025-01-29T23:59:59',
    status: 'upcoming',
  },
];

// data/mockRestaurants.ts
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '트라토리아 성수',
    address: '서울 성동구 성수이로 123',
    phone: '02-1234-5678',
    mapUrl: 'https://map.kakao.com/...',
    neighborhood: '성수동',
    cuisineType: '이탈리안',
  },
];
```

---

## 4. 구현 단계 (Phases)

### Phase 1: 프로젝트 세팅 및 랜딩페이지 (MVP)

#### 1.1 프로젝트 초기 설정
- [ ] Next.js 14 프로젝트 생성
- [ ] TypeScript 설정
- [ ] Tailwind CSS 설정
- [ ] shadcn/ui 설치 및 설정
- [ ] 프로젝트 폴더 구조 생성
- [ ] 타입 정의 파일 생성

#### 1.2 랜딩페이지 구현
- [ ] 헤더 컴포넌트 (로고, 네비게이션, CTA 버튼)
- [ ] 히어로 섹션 (메인 카피, CTA)
- [ ] 서비스 소개 섹션 (3단계 설명)
- [ ] 이런 분께 추천 섹션
- [ ] 우리가 준비해드려요 섹션
- [ ] 가격 안내 섹션
- [ ] FAQ 섹션 (아코디언)
- [ ] 푸터 컴포넌트
- [ ] 반응형 대응 (모바일 우선)
- [ ] SEO 메타태그 설정

---

### Phase 2: 인증 UI 및 온보딩 (Mock)

#### 2.1 인증 화면 (UI Only)
- [ ] 로그인 페이지 UI
- [ ] 회원가입 페이지 UI
- [ ] 소셜 로그인 버튼 (UI만)
- [ ] Mock 인증 로직 (Zustand + localStorage)

#### 2.2 온보딩 플로우
- [ ] 프로그레스 바 컴포넌트
- [ ] Step 1: 기본정보 입력 폼
- [ ] Step 2: 직업/관심사 선택 폼
- [ ] Step 3: 성향 선택 폼
- [ ] 온보딩 완료 페이지
- [ ] 폼 유효성 검사 (Zod)
- [ ] localStorage에 프로필 저장

---

### Phase 3: 대시보드 및 핵심 기능 (Mock)

#### 3.1 대시보드
- [ ] 대시보드 레이아웃
- [ ] 하단 네비게이션 (모바일)
- [ ] 이번 주 모임 신청 카드
- [ ] 모임 현황 통계 카드
- [ ] 다가오는/지난 모임 목록

#### 3.2 모임 신청
- [ ] 모임 신청 버튼 및 로직 (Mock)
- [ ] 신청 마감 시간 체크
- [ ] 신청 취소 기능 (Mock)
- [ ] 신청 상태 표시

#### 3.3 모임 상세
- [ ] 모임 정보 표시
- [ ] 식당 정보 카드 (지도 링크)
- [ ] 함께하는 멤버 프로필 카드

#### 3.4 마이페이지
- [ ] 프로필 정보 표시
- [ ] 프로필 수정 기능
- [ ] 구독 정보 표시 (Mock)
- [ ] 각종 설정 메뉴

---

### Phase 4: 백엔드 연동 (추후)

#### 4.1 Supabase 연동
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 테이블 생성
- [ ] Mock 데이터 → Supabase 마이그레이션
- [ ] Supabase 클라이언트 설정

#### 4.2 실제 인증 연동
- [ ] Supabase Auth 연동
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] 세션 관리

#### 4.3 결제 시스템 연동
- [ ] 토스페이먼츠 연동
- [ ] 정기결제 구현

---

## 5. Zustand Store 설계

### 5.1 Auth Store (Mock)

```typescript
// stores/authStore.ts
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
}
```

### 5.2 User Store

```typescript
// stores/userStore.ts
interface UserState {
  profile: User | null;
  setProfile: (profile: User) => void;
  updateProfile: (updates: Partial<User>) => void;
  clearProfile: () => void;
}
```

### 5.3 Meeting Store

```typescript
// stores/meetingStore.ts
interface MeetingState {
  meetings: Meeting[];
  applications: MeetingApplication[];
  applyMeeting: (meetingId: string) => void;
  cancelApplication: (meetingId: string) => void;
  getMyApplications: () => MeetingApplication[];
}
```

---

## 6. 주요 페이지 라우팅

| 경로 | 페이지 | 인증 필요 | 설명 |
|------|--------|----------|------|
| `/` | 랜딩페이지 | X | 서비스 소개 |
| `/login` | 로그인 | X | 로그인 폼 |
| `/signup` | 회원가입 | X | 회원가입 폼 |
| `/onboarding/profile` | 프로필 설정 | O | 온보딩 3단계 |
| `/onboarding/complete` | 온보딩 완료 | O | 완료 안내 |
| `/dashboard` | 대시보드 | O | 메인 화면 |
| `/meetings/[id]` | 모임 상세 | O | 모임 정보 |
| `/mypage` | 마이페이지 | O | 내 정보 |

---

## 7. 컴포넌트 체크리스트

### 공통 컴포넌트
- [ ] Button (Primary, Secondary, Ghost)
- [ ] Input (Text, Select, Checkbox, Radio)
- [ ] Card
- [ ] Modal
- [ ] Toast/Alert
- [ ] Loading Spinner
- [ ] Header
- [ ] Footer
- [ ] BottomNavigation

### 랜딩페이지
- [ ] HeroSection
- [ ] HowItWorks
- [ ] TargetAudience
- [ ] Benefits
- [ ] PricingCard
- [ ] FAQAccordion

### 인증
- [ ] LoginForm
- [ ] SignupForm
- [ ] SocialLoginButtons

### 온보딩
- [ ] ProgressBar
- [ ] BasicInfoForm
- [ ] JobInterestForm
- [ ] PersonalityForm

### 대시보드
- [ ] WeeklyMeetingCard
- [ ] StatsCard
- [ ] MeetingListItem

### 모임
- [ ] MeetingHeader
- [ ] RestaurantCard
- [ ] MemberProfileCard

### 마이페이지
- [ ] ProfileCard
- [ ] SubscriptionCard
- [ ] MenuList

---

## 8. 환경 변수 (MVP)

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=금요모임
```

---

## 9. 배포 체크리스트 (MVP)

### 배포 전
- [ ] 환경 변수 설정 (Vercel)
- [ ] 빌드 테스트
- [ ] 도메인 연결 (선택)

### 배포 후
- [ ] 모바일 반응형 테스트
- [ ] 주요 플로우 테스트
- [ ] 성능 체크 (Lighthouse)

---

## 10. 추후 백엔드 연동 시 데이터베이스 스키마 (참고용)

```sql
-- 추후 Supabase 연동 시 사용할 스키마

-- profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  neighborhood VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  age_group VARCHAR(20),
  job_category VARCHAR(50),
  interests TEXT[],
  drinking_pref VARCHAR(20),
  talk_style INTEGER,
  mood_pref INTEGER,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_key VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- meetings
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  apply_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- restaurants
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  map_url TEXT,
  neighborhood VARCHAR(100) NOT NULL,
  cuisine_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- meeting_applies
CREATE TABLE meeting_applies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'applied',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, meeting_id)
);

-- meeting_groups
CREATE TABLE meeting_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE,
  group_number INTEGER NOT NULL,
  restaurant_id UUID REFERENCES restaurants(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- group_members
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES meeting_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);
```

---

*문서 버전: 1.1*
*최종 수정일: 2025년 1월*
*변경사항: DB 없이 Mock 데이터 기반 MVP 구현으로 전략 변경*
