'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export default function OnboardingCompletePage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/login');
    }
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-orange-500">
            금요모임
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              프로필 설정 완료!
            </h1>
            <p className="text-gray-600">
              {user?.name}님, 환영합니다!
              <br />
              이제 금요모임을 시작할 준비가 되었어요
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8 text-left">
            <h3 className="font-medium text-gray-900 mb-4">내 프로필 요약</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">활동 지역</span>
                <span className="text-gray-900">{user?.neighborhood || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">나이대</span>
                <span className="text-gray-900">{user?.ageGroup || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">직업 분야</span>
                <span className="text-gray-900">{user?.jobCategory || '-'}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-500">관심사</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                  {user?.interests?.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                  {(user?.interests?.length || 0) > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{(user?.interests?.length || 0) - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-orange-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-medium text-orange-900 mb-3">다음 단계</h3>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">1.</span>
                <span>대시보드에서 이번 주 모임을 확인하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">2.</span>
                <span>모임 신청 후 목요일에 매칭 결과를 알려드려요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">3.</span>
                <span>금요일 저녁, 새로운 인연과 만나요!</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              대시보드로 이동
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/mypage')}
              className="w-full"
            >
              프로필 수정하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
