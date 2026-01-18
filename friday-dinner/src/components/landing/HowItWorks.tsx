import { UserPlus, Users, Utensils } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: 'STEP 1',
    title: '구독 신청',
    description: '월 29,900원으로 구독하고\n간단한 프로필을 작성해주세요',
  },
  {
    icon: Users,
    step: 'STEP 2',
    title: '매칭 완료',
    description: '매주 수요일까지 신청하면\n취향 맞는 6명이 매칭돼요',
  },
  {
    icon: Utensils,
    step: 'STEP 3',
    title: '모임 참석',
    description: '금요일 저녁, 준비된 맛집에서\n즐거운 식사를 함께하세요',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            이렇게 진행돼요
          </h2>
          <p className="text-gray-600 text-lg">
            복잡한 준비 없이, 신청만 하면 끝!
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-500 mb-6">
                <item.icon className="w-10 h-10" />
              </div>

              {/* Step Badge */}
              <div className="text-orange-500 font-semibold text-sm mb-2">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 whitespace-pre-line">
                {item.description}
              </p>

              {/* Connector Line (hidden on mobile, only between items) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-orange-200 -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
