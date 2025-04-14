<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isVisible = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  const firstSection = document.querySelector('section');
  if (!firstSection) return;
  const firstSectionHeight = firstSection.offsetHeight;
  isVisible.value = scrollY > firstSectionHeight - 50;
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
      <div class="logo">One Haven</div>
      <ul class="nav-links" :class="{ open: isMobileMenuOpen }">
        <li><a href="#gamesAndEvents">Calendar</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button class="hamburger" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(245, 245, 245, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
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
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links li a:hover {
  color: #104241;
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
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 2rem;
    display: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
