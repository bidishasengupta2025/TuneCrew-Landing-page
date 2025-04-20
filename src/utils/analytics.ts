import ReactGA from 'react-ga4';
import config from "@/data.json";

export const initGA = () => {
  
  const {GA_MEASUREMENT_ID } = config.googleAnalytics;
  if (typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const logPageView = () => {
  if (typeof window !== 'undefined') {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  }
};

export const logEvent = ({
    category,
    action,
    label,
    value,
  }: {
    category: string;
    action: string;
    label?: string;
    value?: number;
  }) => {
    if (typeof window !== 'undefined') {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
    }
  };
