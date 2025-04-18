<script setup lang="ts">
import { CONTENTFUL_HOME_PAGE_ENTRY_ID } from '~/utils/constants';

import { useContentful } from '~/composables/useContentful';
import type { DayHoursEntry } from '~/types/contentful';

const storeHours = ref<DayHoursEntry[] | null>(null);

let contentfulClient: any;
(async (): Promise<any> => {
  try {
    contentfulClient = useContentful();
    if (contentfulClient) {
      try {
        const entry = await contentfulClient.getEntry(
          CONTENTFUL_HOME_PAGE_ENTRY_ID,
          { content_type: 'homePage', select: 'fields.storeHours' }
        );
        const fields = entry?.fields || {};

        if (fields.storeHours) {
          storeHours.value = fields.storeHours;
        }
      } catch (error) {
        console.error('Error fetching store hours:', error);
      }
    }
  } catch (error) {
    console.error('Failed to initialize Contentful client:', error);
  }
})();
</script>

<template>
  <Navbar />
  <SectionSlot color-primary="whitesmoke" max-width-size="medium">
    <div class="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date: 2025</strong>
      </p>

      <p>
        At One Haven, we respect your privacy. This Privacy Policy explains how
        we collect, use, and protect your information when you visit our
        website.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We use
        <strong>Google Analytics</strong>
        to collect basic information about how visitors use our site. This may
        include:
      </p>
      <ul>
        <li>Pages visited</li>
        <li>Time spent on pages</li>
        <li>Your general location (city/region)</li>
        <li>Device and browser type</li>
      </ul>
      <p>
        This data is collected
        <strong>anonymously</strong>
        and cannot be used to identify you personally.
      </p>

      <h2>How We Use Your Information</h2>
      <p>We use this information to:</p>
      <ul>
        <li>Understand how visitors interact with our website</li>
        <li>Improve the design, content, and performance of our site</li>
      </ul>
      <p>
        We do
        <strong>not</strong>
        sell, rent, or share your personal data.
      </p>

      <h2>Cookies</h2>
      <p>
        Google Analytics uses cookies to track user behavior. You can choose to
        disable cookies through your browser settings.
      </p>
      <p>
        To learn more about how Google collects and processes data, visit:
        <a
          href="https://policies.google.com/technologies/partner-sites"
          rel="noopener noreferrer"
          target="_blank">
          https://policies.google.com/technologies/partner-sites
        </a>
      </p>

      <h2>Opting Out</h2>
      <p>
        If you prefer not to be tracked by Google Analytics, you can use the
        <strong>Google Analytics Opt-out Browser Add-on</strong>
        :
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          rel="noopener noreferrer"
          target="_blank">
          https://tools.google.com/dlpage/gaoptout
        </a>
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, feel free to reach
        out at
        <a href="mailto:onehaven@gmail.com">onehaven@gmail.com</a>
        .
      </p>
    </div>
  </SectionSlot>
  <ContactUs
    id="contact"
    color-primary="dragonfly"
    color-secondary="whitesmoke"
    max-width-size="medium"
    separator-color="#104241"
    :separator-top="true"
    :store-hours="storeHours" />
</template>

<style scoped>
a {
  overflow-wrap: break-word;
}
</style>
