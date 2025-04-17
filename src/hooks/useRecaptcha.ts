import { useCallback } from "react";
import { RecaptchaHook } from "../types/recaptcha";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export const useRecaptcha = (): RecaptchaHook => {
  const executeRecaptcha = useCallback(async () => {
    try {
      // Replace 'YOUR_SITE_KEY' with your actual reCAPTCHA site key
      const siteKey = process.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY";

      return new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(siteKey, { action: "subscribe" })
            .then(resolve)
            .catch(reject);
        });
      });
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      throw error;
    }
  }, []);

  return {
    executeRecaptcha,
  };
};
