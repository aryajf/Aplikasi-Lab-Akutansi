<template>
  <div>
    <navbar />
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
          <component :is='Component'></component>
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script>
// import appConfig from "@/config/app"
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss">
@import "@/assets/sass/app.scss";
.route-enter-from {
    opacity: 0;
    transform: translate(0, 25px);
}
.route-enter-active {
    transition: all 0.3s ease-out;
}
.route-leave-to {
    opacity: 0;
    transform: translateX(0, -25px);
}
.route-leave-active {
    transition: all 0.3s ease-in;
}
</style>
