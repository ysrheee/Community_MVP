import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const features = [
  '매주 금요일 모임 참가 자격',
  '취향 기반 맞춤 매칭',
  '동네 맛집 예약 및 준비',
  '모임 정보 사전 안내',
  '언제든 해지 가능',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            가격 안내
          </h2>
          <p className="text-gray-600 text-lg">
            부담 없는 가격으로 시작하세요
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
            {/* Plan Name */}
            <div className="text-center mb-6">
              <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-4">
                월간 구독
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">29,900</span>
                <span className="text-xl">원</span>
                <span className="text-white/80">/월</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/signup" className="block">
              <Button
                size="lg"
                className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold text-lg py-6"
              >
                구독 시작하기
              </Button>
            </Link>
          </div>

          {/* Note */}
          <p className="text-center text-gray-500 text-sm mt-6">
            * 식사 및 음료 비용은 각자 부담입니다
          </p>
        </div>
      </div>
    </section>
  );
}
