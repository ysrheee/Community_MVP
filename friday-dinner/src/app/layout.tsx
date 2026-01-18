import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "금요일의 식탁 | 동네 이웃과 함께하는 금요일 저녁",
  description: "매주 금요일, 취향이 맞는 6명의 동네 이웃들과 근사한 맛집에서 저녁식사를 함께하세요. 예약과 매칭은 저희가 준비해드려요.",
  keywords: ["금요일 모임", "동네 모임", "소셜 다이닝", "맛집 모임", "네트워킹"],
  openGraph: {
    title: "금요일의 식탁 | 동네 이웃과 함께하는 금요일 저녁",
    description: "매주 금요일, 취향이 맞는 6명의 동네 이웃들과 근사한 맛집에서 저녁식사를 함께하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
