<template>
  <div>
    <!-- <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
          <component :is='Component'></component>
      </transition>
    </router-view> -->
    <router-view></router-view>
    <ScrollTop />
  </div>
</template>

<script>
import ScrollTop from 'primevue/scrolltop'
// import appConfig from "@/config/app"
// import Footer from "@/components/Footer.vue"
export default {
  components: {
    ScrollTop
    // Footer,
  },
}
</script>

<style lang="scss">
@import "@/assets/sass/app.scss";
.route-enter-from {
    opacity: 0;
}
.route-enter-active {
    transition: all 0.3s ease-out;
}
.route-leave-to {
    opacity: 0;
}
.route-leave-active {
    transition: all 0.3s ease-in;
}
</style>
