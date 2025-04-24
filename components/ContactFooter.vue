<script setup lang="ts">
defineProps<{
  currentDate: number | undefined;
  instagramIcon: string;
  discordIcon: string;
  setInstagramIcon: (src: string) => void;
  setDiscordIcon: (src: string) => void;
  customClass?: string;
}>();
</script>

<template>
  <div class="footer-container" :class="customClass">
    <div>
      <p class="footer-text copy-right-text">
        {{ `© ${currentDate} One Haven. All rights reserved.` }}
      </p>
      <a class="footer-text" href="/privacy">Privacy Policy</a>
    </div>
    <div class="social-container">
      <a
        class="social-icon-container"
        href="https://www.instagram.com/one_haven5956/"
        target="_blank"
        @blur="setInstagramIcon('/img/social-icons/Instagram_Glyph_White.svg')"
        @focus="
          setInstagramIcon('/img/social-icons/Instagram_Glyph_Gradient.svg')
        "
        @mouseenter="
          setInstagramIcon('/img/social-icons/Instagram_Glyph_Gradient.svg')
        "
        @mouseleave="
          setInstagramIcon('/img/social-icons/Instagram_Glyph_White.svg')
        ">
        <img
          alt="Link to the One Haven Instagram"
          class="social-icon"
          :src="instagramIcon" />
      </a>
      <a
        class="social-icon-container"
        href="https://discord.gg/FWnQzgjr"
        target="_blank"
        @blur="setDiscordIcon('/img/social-icons/Discord-Symbol-White.svg')"
        @focus="setDiscordIcon('/img/social-icons/Discord-Symbol-Blurple.svg')"
        @mouseenter="
          setDiscordIcon('/img/social-icons/Discord-Symbol-Blurple.svg')
        "
        @mouseleave="
          setDiscordIcon('/img/social-icons/Discord-Symbol-White.svg')
        ">
        <img
          alt="Link to join the One Haven Discord"
          class="social-icon"
          :src="discordIcon" />
      </a>
    </div>
  </div>
</template>

<style scoped>
p,
a {
  color: white;
}
.footer-text {
  font-size: 14px;
  margin: 0;
}
.copy-right-text {
  padding-bottom: 5px;
}
.footer-container {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
.social-container {
  gap: 15px;
  height: 100%;
  display: flex;
  align-items: center;
}
.social-icon {
  height: 30px;
}
@media (max-width: 768px) {
  .social-container {
    gap: 10px;
  }
}
</style>
