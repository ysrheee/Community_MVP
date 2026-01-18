import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export const metadata = {
  title: '로그인 | 금요모임',
  description: '금요모임에 로그인하세요',
};

export default function LoginPage() {
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
        <LoginForm />
      </main>
    </div>
  );
}
