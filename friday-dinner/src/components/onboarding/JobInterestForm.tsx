'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { JOB_CATEGORIES, INTEREST_OPTIONS } from '@/types';

const jobInterestSchema = z.object({
  jobCategory: z.string().min(1, '직업 분야를 선택해주세요'),
  interests: z.array(z.string()).min(1, '최소 1개의 관심사를 선택해주세요').max(5, '최대 5개까지 선택 가능합니다'),
});

export type JobInterestData = z.infer<typeof jobInterestSchema>;

interface JobInterestFormProps {
  defaultValues?: Partial<JobInterestData>;
  onBack: () => void;
  onNext: (data: JobInterestData) => void;
}

export default function JobInterestForm({ defaultValues, onBack, onNext }: JobInterestFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JobInterestData>({
    resolver: zodResolver(jobInterestSchema),
    defaultValues: {
      jobCategory: defaultValues?.jobCategory || '',
      interests: defaultValues?.interests || [],
    },
  });

  const selectedInterests = watch('interests') || [];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setValue('interests', selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 5) {
      setValue('interests', [...selectedInterests, interest]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">직업 & 관심사</h2>
        <p className="text-gray-600">비슷한 관심사를 가진 분들과 매칭해드려요</p>
      </div>

      {/* Job Category */}
      <div className="space-y-2">
        <Label htmlFor="jobCategory">직업 분야</Label>
        <select
          id="jobCategory"
          {...register('jobCategory')}
          className={`w-full h-10 px-3 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.jobCategory ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <option value="">직업 분야를 선택해주세요</option>
          {JOB_CATEGORIES.map((job) => (
            <option key={job} value={job}>
              {job}
            </option>
          ))}
        </select>
        {errors.jobCategory && (
          <p className="text-sm text-red-500">{errors.jobCategory.message}</p>
        )}
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>관심사</Label>
          <span className="text-sm text-gray-500">
            {selectedInterests.length}/5 선택
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="text-sm text-red-500">{errors.interests.message}</p>
        )}
        <p className="text-xs text-gray-500">최대 5개까지 선택할 수 있어요</p>
      </div>

      {/* Hidden input for form registration */}
      <input type="hidden" {...register('interests')} />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          이전
        </Button>
        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
          다음으로
        </Button>
      </div>
    </form>
  );
}
