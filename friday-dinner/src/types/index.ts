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
  talkStyle: number; // 1-5 (1: 말하기 좋아함, 5: 듣기 좋아함)
  moodPref: number; // 1-5 (1: 활발한 분위기, 5: 차분한 분위기)
  bio?: string;
  isSubscribed: boolean;
  subscriptionExpiresAt?: string;
  createdAt: string;
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
  imageUrl?: string;
}

// 모임 그룹
export interface MeetingGroup {
  id: string;
  meetingId: string;
  restaurant: Restaurant;
  members: User[];
  time: string;
}

// 신청 내역
export interface MeetingApplication {
  id: string;
  meetingId: string;
  userId: string;
  status: 'applied' | 'matched' | 'cancelled';
  createdAt: string;
}

// FAQ 아이템
export interface FAQItem {
  question: string;
  answer: string;
}

// 관심사 옵션
export const INTEREST_OPTIONS = [
  '음식', '여행', '운동', '독서', '영화',
  '음악', '사진', '게임', '반려동물', '와인',
  '테크', '창업', '예술', '요리', '등산'
] as const;

// 직업 카테고리
export const JOB_CATEGORIES = [
  'IT/개발', '디자인', '마케팅', '금융', '교육',
  '의료', '법률', '미디어', '자영업', '프리랜서',
  '공무원', '연구', '기타'
] as const;

// 나이대
export const AGE_GROUPS = [
  '20대 초반', '20대 중반', '20대 후반',
  '30대 초반', '30대 중반', '30대 후반',
  '40대', '50대 이상'
] as const;

// 동네 목록 (MVP용)
export const NEIGHBORHOODS = [
  '성수동', '망원동', '합정동', '연남동', '을지로',
  '익선동', '한남동', '이태원', '압구정', '청담동'
] as const;
