function gtag(...args: any[]) {
  window.dataLayer.push(args);
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const config = useRuntimeConfig();
    const GA_ID = config.public.gaId;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    gtag('js', new Date());
    gtag('config', GA_ID);
  }
});
