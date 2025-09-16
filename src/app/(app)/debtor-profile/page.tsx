import { enhanceDebtorProfile, type EnhanceDebtorProfileInput } from '@/ai/flows/debtor-profile-enhancement';
import { DebtorProfileForm } from '@/components/debtor-profile-form';

export default function DebtorProfilePage() {

  async function getEnhancedProfile(prevState: any, data: EnhanceDebtorProfileInput) {
    'use server';
    try {
      const result = await enhanceDebtorProfile(data);
      return { summary: result.summary };
    } catch (e) {
      console.error(e);
      return { error: 'Failed to enhance profile. Please try again.' };
    }
  }

  return <DebtorProfileForm getEnhancedProfile={getEnhancedProfile} />;
}
