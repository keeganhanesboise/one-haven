<template>
  <SectionSlot>
    <div class="hero-container">
      <div class="hero-content-container">
        <div class="hero-img-container">
          <img id="hero-img" alt="" src="/img/coffee-mug-magic-one-haven.svg" />
        </div>
        <div class="logo-container">
          <h1 class="sr-only">Welcome to One Haven Cafe & Game Shop</h1>
          <img
            id="logo"
            alt="One Haven Cafe & Game Shop Logo"
            class="is-displayed-desktop"
            src="/img/one-haven-logo-desktop.svg" />
          <img
            id="logo-mobile"
            alt="One Haven Cafe & Game Shop Logo"
            class="is-displayed-mobile"
            src="/img/one-haven-logo-mobile.svg" />
          <ul class="call-to-actions">
            <li class="cta-link"><a href="/#menu">Coffee</a></li>
            <li class="cta-link"><a href="/#gamesAndEvents">Gaming</a></li>
            <li class="cta-link"><a href="/#menu">Food</a></li>
          </ul>
        </div>
      </div>
    </div>
  </SectionSlot>
</template>

<style scoped>
#hero-img {
  width: 100%;
  max-width: 500px;
}
#logo {
  padding-bottom: 20px;
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
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  gap: 50px;
}
.hero-img-container {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-container {
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: center;
}
.call-to-actions {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding-inline-start: 0;
}
.call-to-actions > li {
  display: flex;
  align-content: center;
  cursor: pointer;
  list-style: none;
}
@media (min-width: 1024px) {
  .call-to-actions > li > a {
    padding: 20px;
  }
  #logo {
    padding-bottom: 0;
  }
}
.cta-link {
  text-decoration: none;
  transition: transform 0.2s ease;
}
.cta-link:hover {
  transform: translateY(-2px);
}
@media (max-width: 480px) {
  #hero-img {
    width: 75%;
    min-height: auto;
  }
  .hero-content-container {
    flex-direction: column;
    gap: 30px;
  }
  .hero-img-container {
    width: 100%;
  }
  .call-to-actions {
    gap: 10px;
    justify-content: space-between;
  }
  .logo-container {
    gap: 10px;
    width: 50%;
  }
}
</style>
