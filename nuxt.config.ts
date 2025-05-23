// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      contentfulPreviewMode: process.env.CONTENTFUL_PREVIEW_MODE || 'false',
      contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || '',
      contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
      gaId: process.env.GA_ID || ''
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'One Haven',
      meta: [
        {
          name: 'description',
          content:
            'Discover One Haven Cafe & Game Shop in Colorado Springs, your safe, inclusive' +
            " space to enjoy handcrafted artisanal coffee, gluten-free pastries, and delicious food. Whether you're" +
            ' here for a relaxing cup of coffee, a friendly board game night, or an exciting Magic: The Gathering tournament or' +
            ' Dungeons & Dragons campaign, One Haven fosters a welcoming environment for everyone. We host weekly' +
            ' game nights, tournaments, and themed events designed to bring people together. With a focus on community,' +
            ' inclusivity, and good food, our cafe is the perfect place for gamers, creatives, and coffee lovers alike' +
            ' to connect and unwind. Come experience the warmth and camaraderie at One Haven — where everyone belongs!'
        }
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#000' }
      ]
    }
  },
  modules: ['@nuxtjs/google-fonts'],
  plugins: ['~/plugins/ga.client.ts'],
  googleFonts: {
    families: {
      Lato: [300, 400, 700],
      'Baskerville+Old+Face': [400, 700]
    },
    display: 'swap'
  }
});
