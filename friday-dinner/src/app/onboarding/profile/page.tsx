'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import ProgressBar from '@/components/onboarding/ProgressBar';
import BasicInfoForm, { BasicInfoData } from '@/components/onboarding/BasicInfoForm';
import JobInterestForm, { JobInterestData } from '@/components/onboarding/JobInterestForm';
import PersonalityForm, { PersonalityData } from '@/components/onboarding/PersonalityForm';

type OnboardingData = BasicInfoData & JobInterestData & PersonalityData;

export default function OnboardingProfilePage() {
  const router = useRouter();
  const { isLoggedIn, user, completeOnboarding } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/login');
    }
  }, [mounted, isLoggedIn, router]);

  const handleStep1Next = (data: BasicInfoData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep2Next = (data: JobInterestData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleStep3Submit = async (data: PersonalityData) => {
    setIsLoading(true);
    const completeData = { ...formData, ...data };

    // Save to auth store (and localStorage via persist)
    completeOnboarding(completeData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsLoading(false);
    router.push('/onboarding/complete');
  };

  if (!mounted) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

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
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={3} />
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {currentStep === 1 && (
              <BasicInfoForm
                defaultValues={{
                  phone: user?.phone || '',
                  neighborhood: user?.neighborhood || '',
                  gender: user?.gender,
                  ageGroup: user?.ageGroup || '',
                }}
                onNext={handleStep1Next}
              />
            )}

            {currentStep === 2 && (
              <JobInterestForm
                defaultValues={{
                  jobCategory: formData.jobCategory || user?.jobCategory || '',
                  interests: formData.interests || user?.interests || [],
                }}
                onBack={handleStep2Back}
                onNext={handleStep2Next}
              />
            )}

            {currentStep === 3 && (
              <PersonalityForm
                defaultValues={{
                  drinkingPref: formData.drinkingPref || user?.drinkingPref,
                  talkStyle: formData.talkStyle || user?.talkStyle || 3,
                  moodPref: formData.moodPref || user?.moodPref || 3,
                  bio: formData.bio || user?.bio || '',
                }}
                onBack={handleStep3Back}
                onSubmit={handleStep3Submit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
