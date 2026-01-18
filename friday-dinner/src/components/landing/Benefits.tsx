import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: '취향 맞춤 매칭',
    description: '관심사, 직업, 성향을 기반으로 잘 맞는 분들을 연결해드려요',
  },
  {
    icon: MapPin,
    title: '엄선된 동네 맛집',
    description: '저희가 직접 선정한 분위기 좋은 맛집에서 식사해요',
  },
  {
    icon: Calendar,
    title: '예약/준비 걱정 없이',
    description: '식당 예약부터 테이블 세팅까지 모두 준비해드려요',
  },
  {
    icon: Sparkles,
    title: '새로운 인연',
    description: '같은 동네에 사는 다양한 분들과 자연스럽게 친해져요',
  },
];

const targetAudience = [
  '동네에서 새로운 사람들을 만나고 싶은 분',
  '금요일 저녁 혼자 밥 먹기 싫은 분',
  '예약/준비 없이 편하게 모임에 참여하고 싶은 분',
  '취향이 맞는 사람들과 대화하고 싶은 분',
];

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Benefits Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            저희가 준비해드려요
          </h2>
          <p className="text-gray-600 text-lg">
            편하게 오셔서 즐기기만 하세요
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 text-orange-500 mb-4">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              이런 분께 추천해요
            </h3>
            <ul className="space-y-4">
              {targetAudience.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-sm font-medium">
                    ✓
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
