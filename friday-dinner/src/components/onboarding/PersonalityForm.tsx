'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const personalitySchema = z.object({
  drinkingPref: z.enum(['like', 'moderate', 'none'], '음주 선호를 선택해주세요'),
  talkStyle: z.number().min(1).max(5),
  moodPref: z.number().min(1).max(5),
  bio: z.string().max(200, '최대 200자까지 입력 가능합니다').optional(),
});

export type PersonalityData = z.infer<typeof personalitySchema>;

interface PersonalityFormProps {
  defaultValues?: Partial<PersonalityData>;
  onBack: () => void;
  onSubmit: (data: PersonalityData) => void;
  isLoading?: boolean;
}

export default function PersonalityForm({ defaultValues, onBack, onSubmit, isLoading }: PersonalityFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalityData>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      drinkingPref: defaultValues?.drinkingPref,
      talkStyle: defaultValues?.talkStyle || 3,
      moodPref: defaultValues?.moodPref || 3,
      bio: defaultValues?.bio || '',
    },
  });

  const talkStyle = watch('talkStyle');
  const moodPref = watch('moodPref');
  const bio = watch('bio') || '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">나의 성향</h2>
        <p className="text-gray-600">더 잘 맞는 분들을 매칭해드릴게요</p>
      </div>

      {/* Drinking Preference */}
      <div className="space-y-3">
        <Label>음주 선호</Label>
        <div className="flex gap-2">
          {[
            { value: 'like', label: '술 좋아해요', emoji: '🍺' },
            { value: 'moderate', label: '가볍게', emoji: '🍷' },
            { value: 'none', label: '안 마셔요', emoji: '🧃' },
          ].map(({ value, label, emoji }) => (
            <label key={value} className="flex-1 cursor-pointer">
              <input
                type="radio"
                value={value}
                {...register('drinkingPref')}
                className="peer sr-only"
              />
              <div className="px-3 py-3 text-center border rounded-lg text-sm peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-colors">
                <span className="text-lg">{emoji}</span>
                <p className="mt-1 text-gray-700 peer-checked:text-orange-600">{label}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.drinkingPref && (
          <p className="text-sm text-red-500">{errors.drinkingPref.message}</p>
        )}
      </div>

      {/* Talk Style Slider */}
      <div className="space-y-3">
        <Label>대화 스타일</Label>
        <div className="px-2">
          <input
            type="range"
            min="1"
            max="5"
            {...register('talkStyle', { valueAsNumber: true })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span className={talkStyle <= 2 ? 'text-orange-500 font-medium' : ''}>말하기 좋아함</span>
            <span className={talkStyle >= 4 ? 'text-orange-500 font-medium' : ''}>듣기 좋아함</span>
          </div>
        </div>
      </div>

      {/* Mood Preference Slider */}
      <div className="space-y-3">
        <Label>선호하는 분위기</Label>
        <div className="px-2">
          <input
            type="range"
            min="1"
            max="5"
            {...register('moodPref', { valueAsNumber: true })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span className={moodPref <= 2 ? 'text-orange-500 font-medium' : ''}>활발한 분위기</span>
            <span className={moodPref >= 4 ? 'text-orange-500 font-medium' : ''}>차분한 분위기</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="bio">자기소개 (선택)</Label>
          <span className="text-xs text-gray-500">{bio.length}/200</span>
        </div>
        <textarea
          id="bio"
          {...register('bio')}
          rows={3}
          placeholder="간단하게 자신을 소개해주세요"
          className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
        {errors.bio && (
          <p className="text-sm text-red-500">{errors.bio.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isLoading}
        >
          이전
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-orange-500 hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading ? '저장 중...' : '완료'}
        </Button>
      </div>
    </form>
  );
}
