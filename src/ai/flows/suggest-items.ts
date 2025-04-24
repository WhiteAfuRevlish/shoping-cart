// src/ai/flows/suggest-items.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting items to a user based on their past shopping habits.
 *
 * The flow takes a user ID as input and returns a list of suggested items.
 *
 * - suggestItems - A function that handles the item suggestion process.
 * - SuggestItemsInput - The input type for the suggestItems function.
 * - SuggestItemsOutput - The return type for the suggestItems function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestItemsInputSchema = z.object({
  userId: z.string().describe('The ID of the user to suggest items for.'),
});
export type SuggestItemsInput = z.infer<typeof SuggestItemsInputSchema>;

const SuggestItemsOutputSchema = z.object({
  suggestedItems: z.array(
    z.string().describe('A list of items suggested for the user to add.')
  ).describe('The list of items suggested for the user to add to their shopping list.')
});
export type SuggestItemsOutput = z.infer<typeof SuggestItemsOutputSchema>;

export async function suggestItems(input: SuggestItemsInput): Promise<SuggestItemsOutput> {
  return suggestItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestItemsPrompt',
  input: {
    schema: z.object({
      userId: z.string().describe('The ID of the user to suggest items for.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedItems: z.array(
        z.string().describe('An item that the user might want to add.')
      ).describe('The list of items suggested for the user to add to their shopping list.')
    }),
  },
  prompt: `You are a shopping assistant AI that suggests items to users based on their past shopping habits.

  Analyze the user's past shopping history and determine which items they are likely to need again. Return a list of those items.
  Do not suggest items that the user has never purchased before.

  Consider things like:
  * Frequency of purchase
  * Time since last purchase
  * Day of the week of purchase

  Suggest a maximum of 5 items.

  Here is the user's ID: {{{userId}}}
  `,
});

const suggestItemsFlow = ai.defineFlow<
  typeof SuggestItemsInputSchema,
  typeof SuggestItemsOutputSchema
>({
  name: 'suggestItemsFlow',
  inputSchema: SuggestItemsInputSchema,
  outputSchema: SuggestItemsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  // TODO: Integrate with Firestore to fetch user's past shopping data instead of relying only on LLM.
  return output!;
});
