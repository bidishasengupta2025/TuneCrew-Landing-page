declare global {
  interface Window {
    gtag: any;
  }
}

export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.gtag = window.gtag || function() {
      (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID);
  }
};

export const logPageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: window.location.pathname + window.location.search,
    });
  }
}; 