<template>
  <div>
    <div class="homepage py-5">
      <div class="container">
        <div class="row homepage-header">
          <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Selamat Datang Di Website</h1>
          <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">Laboratorium Akuntansi Menengah</h3>
        </div>
      </div>
      <img id="homepage-bottom-1" data-aos-offset="-500" data-aos="fade-up-right" data-aos-duration="1000" src="@/assets/images/homepage-5.png" alt="">
      <img id="homepage-bottom-2" data-aos-offset="-500" data-aos="fade-up" class="ms-auto me-auto" data-aos-duration="1500" src="@/assets/images/homepage-1.png" alt="">
      <img id="homepage-bottom-3" data-aos-offset="-500" data-aos="fade-up-left" data-aos-duration="1000" src="@/assets/images/homepage-2.png" alt="">
    </div>
    <div class="aboutpage py-5">
      <div class="container">
        <div class="row homepage-header">
          <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Selamat Datang Di Website</h1>
          <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">Laboratorium Akuntansi Menengah</h3>
        </div>
      </div>
      <svg id="homepage-bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,96L34.3,106.7C68.6,117,137,139,206,165.3C274.3,192,343,224,411,234.7C480,245,549,235,617,218.7C685.7,203,754,181,823,176C891.4,171,960,181,1029,181.3C1097.1,181,1166,171,1234,176C1302.9,181,1371,203,1406,213.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
      <img id="homepage-bottom-1" data-aos-offset="-500" data-aos="fade-up-right" data-aos-duration="1000" src="@/assets/images/homepage-5.png" alt="">
      <img id="homepage-bottom-2" data-aos-offset="-500" data-aos="fade-up" class="ms-auto me-auto" data-aos-duration="1500" src="@/assets/images/homepage-1.png" alt="">
      <img id="homepage-bottom-3" data-aos-offset="-500" data-aos="fade-up-left" data-aos-duration="1000" src="@/assets/images/homepage-2.png" alt="">
    </div>
  </div>
</template>

<script>
import Mixins from "@/mixins"
export default {
    mixins: [Mixins],
}
</script>

<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/home.scss";
</style>
