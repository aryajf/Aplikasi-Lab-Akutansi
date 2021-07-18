<template>
    <div id="article">
        <navbar bg="" theme="navbar-light"/>
        
        <div id="aboutpage" class="aboutpage py-5">
        <div class="container pt-5">
            <div class="container">
            <div class="row">
                <div class="col-12">
                    <img src="@/assets/images/tes1.jpg" class="d-block w-100" alt="">
                </div>
            </div>
            <div class="row aboutpage-header">
                <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Our News & Article</h1>
                <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">Disini kami menyajikan info & artikel terbaru kami</h3>
            </div>
          <div class="row">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit mollitia, quaerat placeat quibusdam, minima ipsam doloremque voluptatum, sunt rerum iure impedit. Magnam, a dolores veniam dolor iusto atque accusamus? Qui.</p>
          </div>
        </div>
      </div>
      <svg id="aboutpage-bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <linearGradient x1="0" y1="100%" x2="100%" y2="100%" id="gradient">
        <stop stop-color="#ddd" offset="0%"/>
        <stop stop-color="#eee" offset="100%"/>
      </linearGradient>
      <path fill="url(#gradient)" fill-opacity="1" d="M0,192L18.5,197.3C36.9,203,74,213,111,197.3C147.7,181,185,139,222,101.3C258.5,64,295,32,332,69.3C369.2,107,406,213,443,224C480,235,517,149,554,149.3C590.8,149,628,235,665,266.7C701.5,299,738,277,775,245.3C812.3,213,849,171,886,170.7C923.1,171,960,213,997,213.3C1033.8,213,1071,171,1108,133.3C1144.6,96,1182,64,1218,58.7C1255.4,53,1292,75,1329,74.7C1366.2,75,1403,53,1422,42.7L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
    </div>
    </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue"
export default {
    components:{
      Navbar,
    }
}
</script>
<style lang="scss">
@import "@/assets/sass/app.scss";
@import "@/assets/sass/article/Index.scss";
</style>