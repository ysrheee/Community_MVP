import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="font-bold text-xl text-white">금요일의 식탁</span>
            </div>
            <p className="text-sm leading-relaxed">
              매주 금요일, 취향이 맞는 동네 이웃들과 함께하는 저녁식사.
              <br />
              새로운 인연을 만들어보세요.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  이용 방법
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  가격 안내
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <a href="mailto:hello@fridaydinner.kr" className="hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© 2025 금요일의 식탁. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
