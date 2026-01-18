import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎉</span>
            <span>매주 금요일, 새로운 인연이 시작됩니다</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            금요일 저녁,
            <br />
            <span className="text-orange-500">동네 이웃</span>과 함께
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            취향이 맞는 6명의 이웃들과 근사한 동네 맛집에서
            <br className="hidden md:block" />
            매주 금요일 저녁식사를 함께하세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-6 w-full sm:w-auto">
                지금 시작하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                자세히 알아보기
              </Button>
            </a>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>월 29,900원</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>예약/준비는 저희가</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>취향 맞춤 매칭</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 relative">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"
              alt="친구들과 함께하는 저녁 식사"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-lg md:text-xl font-medium drop-shadow-lg">
                매주 금요일, 새로운 사람들과의 특별한 저녁
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
