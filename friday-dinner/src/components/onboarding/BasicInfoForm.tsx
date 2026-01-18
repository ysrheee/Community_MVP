'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NEIGHBORHOODS, AGE_GROUPS } from '@/types';

const basicInfoSchema = z.object({
  phone: z.string().regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, '올바른 전화번호를 입력해주세요'),
  neighborhood: z.string().min(1, '활동 지역을 선택해주세요'),
  gender: z.enum(['male', 'female', 'other'], '성별을 선택해주세요'),
  ageGroup: z.string().min(1, '나이대를 선택해주세요'),
});

export type BasicInfoData = z.infer<typeof basicInfoSchema>;

interface BasicInfoFormProps {
  defaultValues?: Partial<BasicInfoData>;
  onNext: (data: BasicInfoData) => void;
}

export default function BasicInfoForm({ defaultValues, onNext }: BasicInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">기본 정보</h2>
        <p className="text-gray-600">모임 매칭에 필요한 기본 정보를 입력해주세요</p>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">휴대폰 번호</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="010-1234-5678"
          {...register('phone')}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
        <p className="text-xs text-gray-500">모임 안내 알림을 받으실 번호입니다</p>
      </div>

      {/* Neighborhood */}
      <div className="space-y-2">
        <Label htmlFor="neighborhood">주로 활동하는 지역</Label>
        <select
          id="neighborhood"
          {...register('neighborhood')}
          className={`w-full h-10 px-3 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.neighborhood ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <option value="">지역을 선택해주세요</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.neighborhood && (
          <p className="text-sm text-red-500">{errors.neighborhood.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label>성별</Label>
        <div className="flex gap-3">
          {[
            { value: 'male', label: '남성' },
            { value: 'female', label: '여성' },
            { value: 'other', label: '기타' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex-1 relative cursor-pointer"
            >
              <input
                type="radio"
                value={value}
                {...register('gender')}
                className="peer sr-only"
              />
              <div className="px-4 py-3 text-center border rounded-lg text-sm text-gray-700 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 transition-colors">
                {label}
              </div>
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      {/* Age Group */}
      <div className="space-y-2">
        <Label htmlFor="ageGroup">나이대</Label>
        <select
          id="ageGroup"
          {...register('ageGroup')}
          className={`w-full h-10 px-3 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.ageGroup ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <option value="">나이대를 선택해주세요</option>
          {AGE_GROUPS.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
        {errors.ageGroup && (
          <p className="text-sm text-red-500">{errors.ageGroup.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
        다음으로
      </Button>
    </form>
  );
}
