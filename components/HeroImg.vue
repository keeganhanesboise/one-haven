<template>
  <SectionSlot id="heroImg" color="whitesmoke" >
    <div class="hero-container">
      <img id="hero-img-desktop" src="/img/coffee-mug-magic-one-haven.svg" alt="">
      <div class="logo-container">
        <h1 id="siteTitle">One Haven</h1>
        <ul class="call-to-actions">
          <li><a>Coffee</a></li>
          <li><a>Gaming</a></li>
          <li><a>Food</a></li>
        </ul>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
  #hero-img-desktop {
    width: 50%;
    max-height: 1200px;
    min-height: 600px;
    max-width: 800px;
  }
  #siteTitle {
    text-align: center;
  }
  .hero-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
  }
  .logo-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .call-to-actions {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    max-width: 300px;
    padding-inline-start: 0;
  }
  .call-to-actions > li {
    list-style: none;
  }
</style>
<script setup lang="ts">
</script>