<script setup lang="ts">
import type { Asset } from 'contentful';

import { CONTENTFUL_HOME_PAGE_ENTRY_ID } from '~/utils/constants';

import { useContentful } from '~/composables/useContentful';
import { useRichTextRenderer } from '~/composables/useRichTextRenderer';
import type { DayHoursEntry, HomePageEntry } from '~/types/contentful';

const homePageContent = ref<HomePageEntry | null>(null);
const gamesAndEventsInfo = ref('');
const menus = ref(['']);
const aboutUsInfo = ref('');
const aboutUsImage = ref('');
const imageCarousel = ref(['']);
const address = ref('');
const storeHours = ref<DayHoursEntry[] | null>(null);

const createImageArray = (assets: Asset[]) => {
  const imageArray: string[] = [];
  assets.forEach((asset) => {
    let url: string = '';
    if (asset && asset.fields.file?.url) {
      url = asset.fields.file.url as string;
    }
    imageArray.push(url);
  });
  return imageArray;
};

let contentfulClient: any;
(async (): Promise<any> => {
  try {
    contentfulClient = useContentful();
    if (contentfulClient) {
      try {
        const entry = await contentfulClient.getEntry(
          CONTENTFUL_HOME_PAGE_ENTRY_ID
        );
        const fields = entry?.fields || {};
        homePageContent.value = entry;

        if (fields.gamesAndEventsInfo) {
          gamesAndEventsInfo.value = useRichTextRenderer(
            fields.gamesAndEventsInfo,
            {}
          );
        }
        if (fields.menus) {
          menus.value = createImageArray(fields.menus);
        }
        if (fields.aboutUsInfo) {
          aboutUsInfo.value = useRichTextRenderer(fields.aboutUsInfo, {});
        }
        if (fields.aboutUsImage) {
          let url: string = '';
          if (fields.aboutUsImage && fields.aboutUsImage.fields.file?.url) {
            url = fields.aboutUsImage.fields.file.url as string;
          }
          aboutUsImage.value = url;
        }
        if (fields.imageCarousel) {
          imageCarousel.value = createImageArray(fields.imageCarousel);
        }
        if (fields.address) {
          address.value = useRichTextRenderer(fields.address, {});
        }
        if (fields.storeHours) {
          storeHours.value = fields.storeHours;
        }
      } catch (error) {
        console.error('Error fetching home page:', error);
      }
    }
  } catch (error) {
    console.error('Failed to initialize Contentful client:', error);
  }
})();
</script>

<template>
  <div>
    <Navbar />
    <HeroImg id="heroImg" color-primary="whitesmoke" />
    <GamesAndEvents
      id="gamesAndEvents"
      color-primary="lilac"
      color-secondary="whitesmoke"
      :games-and-events-info="gamesAndEventsInfo"
      section-separator-svg="/img/section-curve/lilac.svg"
      section-separator-svg-bottom="/img/section-curve/lilac-bottom.svg" />
    <Menu id="menu" color-primary="whitesmoke" :menus="menus" />
    <AboutUs
      id="about"
      :about-us-image="aboutUsImage"
      :about-us-info="aboutUsInfo"
      color-primary="cranberry"
      color-secondary="whitesmoke"
      max-width-size="medium"
      section-separator-svg="/img/section-curve/cranberry.svg"
      section-separator-svg-bottom="/img/section-curve/cranberry-bottom.svg" />
    <ImgCarousel
      id="imgCarousel"
      color-primary="whitesmoke"
      :images="imageCarousel" />
    <ContactUs
      id="contact"
      :address="address"
      color-primary="dragonfly"
      color-secondary="whitesmoke"
      max-width-size="medium"
      section-separator-svg="/img/section-curve/dragonfly.svg"
      :store-hours="storeHours" />
  </div>
</template>
