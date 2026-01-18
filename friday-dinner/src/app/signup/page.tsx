import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export const metadata = {
  title: '회원가입 | 금요모임',
  description: '금요모임에 가입하고 새로운 인연을 만나보세요',
};

export default function SignupPage() {
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
        <SignupForm />
      </main>
    </div>
  );
}
