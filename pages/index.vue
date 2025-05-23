<script setup lang="ts">
import type { Asset } from 'contentful';

import { CONTENTFUL_HOME_PAGE_ENTRY_ID } from '~/utils/constants';

import { useContentful } from '~/composables/useContentful';
import { useRichTextRenderer } from '~/composables/useRichTextRenderer';
import type { DayHoursEntry, HomePageEntry } from '~/types/contentful';

const homePageContent = ref<HomePageEntry | null>(null);
const gamesAndEventsInfo = ref('');
const menus = ref<string[]>([]);
const aboutUsInfo = ref('');
const aboutUsImage = ref('');
const imageCarousel = ref(['']);
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
  <Navbar :hide-initially="true" />
  <HeroImg id="heroImg" color-primary="whitesmoke" />
  <GamesAndEvents
    id="gamesAndEvents"
    color-primary="lilac"
    color-secondary="whitesmoke"
    :games-and-events-info="gamesAndEventsInfo"
    :separator-bottom="true"
    separator-color="#6b667a"
    :separator-top="true" />
  <Menu v-if="menus" id="menu" color-primary="whitesmoke" :menus="menus" />
  <AboutUs
    v-if="aboutUsImage && aboutUsInfo"
    id="about"
    :about-us-image="aboutUsImage"
    :about-us-info="aboutUsInfo"
    color-primary="cranberry"
    color-secondary="whitesmoke"
    max-width-size="medium"
    :separator-bottom="true"
    separator-color="#a63d40"
    :separator-top="true" />
  <ImgCarousel
    id="imgCarousel"
    color-primary="whitesmoke"
    :images="imageCarousel" />
  <ContactUs
    id="contact"
    color-primary="dragonfly"
    color-secondary="whitesmoke"
    max-width-size="medium"
    separator-color="#104241"
    :separator-top="true"
    :store-hours="storeHours" />
</template>
