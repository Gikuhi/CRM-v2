'use server';
/**
 * @fileOverview Enhances debtor profiles with relevant information from available databases.
 *
 * - enhanceDebtorProfile - A function that enhances debtor profiles.
 * - EnhanceDebtorProfileInput - The input type for the enhanceDebtorProfile function.
 * - EnhanceDebtorProfileOutput - The return type for the enhanceDebtorProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const EnhanceDebtorProfileInputSchema = z.object({
  debtorName: z.string().describe('The name of the debtor.'),
  debtorContactInfo: z.string().describe('The contact information of the debtor.'),
  debtDetails: z.string().describe('Details about the debt owed by the debtor.'),
  availableDatabaseInfo: z
    .string()
    .describe(
      'Information from available databases, including credit history, past payment behavior, and other relevant details.'
    ),
});
export type EnhanceDebtorProfileInput = z.infer<typeof EnhanceDebtorProfileInputSchema>;

const EnhanceDebtorProfileOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the debtor’s profile, including key information relevant to debt collection, such as payment history, financial stability, and potential communication strategies.'
    ),
});
export type EnhanceDebtorProfileOutput = z.infer<typeof EnhanceDebtorProfileOutputSchema>;

export async function enhanceDebtorProfile(
  input: EnhanceDebtorProfileInput
): Promise<EnhanceDebtorProfileOutput> {
  return enhanceDebtorProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceDebtorProfilePrompt',
  input: {schema: EnhanceDebtorProfileInputSchema},
  output: {schema: EnhanceDebtorProfileOutputSchema},
  prompt: `You are an AI assistant designed to provide a summary of the debtor profile.

  Debtor Name: {{{debtorName}}}
  Debtor Contact Info: {{{debtorContactInfo}}}
  Debt Details: {{{debtDetails}}}
  Available Database Info: {{{availableDatabaseInfo}}}

  Based on the information provided, generate a concise summary of the debtor’s profile, including key information relevant to debt collection. The summary should provide insights into the debtor's payment history, financial stability, and potential communication strategies.
  `,
});

const enhanceDebtorProfileFlow = ai.defineFlow(
  {
    name: 'enhanceDebtorProfileFlow',
    inputSchema: EnhanceDebtorProfileInputSchema,
    outputSchema: EnhanceDebtorProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
