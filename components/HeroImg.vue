<template>
  <SectionSlot id="heroImg" color="whitesmoke" >
    <div class="hero-container">
      <div class="hero-content-container">
        <div class="hero-img-container">
          <img id="hero-img-desktop" src="/img/coffee-mug-magic-one-haven.svg" alt="">
        </div>
        <div class="logo-container">
          <h1 class="sr-only">Welcome to One Haven Cafe & Game Shop</h1>
          <img id="logo" class="is-displayed-desktop" src="/img/one-haven-logo-desktop.svg" alt="One Haven Cafe & Game Shop Logo" />
          <img id="logo-mobile" class="is-displayed-mobile" src="/img/one-haven-logo-mobile.svg" alt="One Haven Cafe & Game Shop Logo" />
          <ul class="call-to-actions">
            <li><a>Coffee</a></li>
            <li><a>Gaming</a></li>
            <li><a>Food</a></li>
          </ul>
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
  #hero-img-desktop {
    width: 100%;
    max-width: 500px;
  }
  #logo {
    padding: 20px;
    max-width: 500px;
  }
  .hero-container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .hero-content-container {
    display: flex;
    align-items: center;
    max-width: 1200px;
    width: 100%;
  }
  .hero-img-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-container {
    display: flex;
    flex-direction: column;
    width: 50%;
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

  @media (max-width: 480px) {
    #hero-img-desktop {
      min-height: auto;
    }
    .hero-content-container {
      flex-direction: column;
      gap: 30px;
    }
    .hero-img-container {
      width: 100%;
    }
  }
</style>
<script setup lang="ts">
</script>