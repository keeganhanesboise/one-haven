<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hideInitially?: boolean;
  }>(),
  {
    hideInitially: false
  }
);

const isVisible = ref(!props.hideInitially);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  if (props.hideInitially) {
    const scrollY = window.scrollY;
    const firstSection = document.querySelector('section');
    if (!firstSection) return;
    const firstSectionHeight = firstSection.offsetHeight;
    isVisible.value = scrollY > firstSectionHeight - 50;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav :class="['navbar', { visible: isVisible }]">
    <div class="navbar-content">
      <a class="logo" href="/">One Haven</a>
      <button class="hamburger" @click="toggleMobileMenu">
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
      </button>
      <ul class="nav-links-desktop">
        <li class="nav-link"><a href="/#gamesAndEvents">Calendar</a></li>
        <li class="nav-link"><a href="/#menu">Menu</a></li>
        <li class="nav-link"><a href="/#about">About Us</a></li>
        <li class="nav-link"><a href="/#contact">Contact</a></li>
      </ul>
    </div>
    <ul class="nav-links-mobile" :class="{ open: isMobileMenuOpen }">
      <li class="nav-link">
        <a href="/#gamesAndEvents" @click="toggleMobileMenu">Calendar</a>
      </li>
      <li class="nav-link">
        <a href="/#menu" @click="toggleMobileMenu">Menu</a>
      </li>
      <li class="nav-link">
        <a href="/#about" @click="toggleMobileMenu">About Us</a>
      </li>
      <li class="nav-link">
        <a href="/#contact" @click="toggleMobileMenu">Contact</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(245, 245, 245, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
  transform: translateY(-100%);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.navbar.visible {
  transform: translateY(0);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
  padding: 5px;
}

.nav-links-mobile,
.nav-links-desktop {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links-desktop {
  display: flex;
  gap: 2rem;
}

.nav-links-mobile {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 2rem;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.4s ease,
    padding 0.4s ease;
}

.nav-links-mobile.open {
  max-height: 300px;
  padding: 1rem 2rem;
}

.nav-link {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.nav-links-mobile a,
.nav-links-desktop a {
  display: block;
  padding: 5px;
  width: 100%;
  color: inherit;
  text-decoration: none;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-links-mobile {
    display: flex;
  }

  .hamburger {
    display: flex;
  }

  .nav-links-desktop {
    display: none;
  }

  .nav-link {
    width: 100%;
  }
}
</style>
