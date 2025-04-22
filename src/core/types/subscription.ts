export interface SubscriptionHook {
  subscribe: (
    email: string,
    captchaToken: string
  ) => Promise<{ success: boolean }>;
}
