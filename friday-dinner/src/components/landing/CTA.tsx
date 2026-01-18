import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-orange-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          이번 주 금요일,
          <br />
          새로운 인연을 만나보세요
        </h2>
        <p className="text-orange-100 text-lg mb-8">
          수요일까지 신청하면 이번 주 금요일 모임에 참여할 수 있어요
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
          >
            지금 시작하기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
