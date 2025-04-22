import { useCallback } from "react";
import { AnalyticsHook } from "../types/analytics";

export const useAnalytics = (): AnalyticsHook => {
  const trackScreenView = useCallback((screenName: string) => {
    // Implement your analytics tracking here
    // This could be Google Analytics, Firebase Analytics, or any other analytics service
    console.log(`Screen view tracked: ${screenName}`);
  }, []);

  return {
    trackScreenView,
  };
};
