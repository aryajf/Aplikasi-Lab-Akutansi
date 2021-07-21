<template>
  <div v-if="articles.article">
    <navbar bg="bg-navbar" theme="navbar-dark"/>
    <div class="homepage py-5">
      <div class="container">
        <div class="row homepage-header">
          <div class="col-md-7">
          <h1 data-aos="fade-right" data-aos-duration="1000">Welcome to Labamen</h1>
          <h3 data-aos="fade-right" data-aos-duration="1500">Laboratorium Akuntansi Menengah</h3>
          </div>
          <div class="col-md-4">
            <img data-aos="fade-left" data-aos-duration="1500" id="homepage-1" src="@/assets/images/homepage-3.png" alt="">
          </div>
        </div>
      </div>
      <svg id="homepage-bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,160L14.1,176C28.2,192,56,224,85,202.7C112.9,181,141,107,169,85.3C197.6,64,226,96,254,96C282.4,96,311,64,339,58.7C367.1,53,395,75,424,69.3C451.8,64,480,32,508,26.7C536.5,21,565,43,593,48C621.2,53,649,43,678,53.3C705.9,64,734,96,762,96C790.6,96,819,64,847,85.3C875.3,107,904,181,932,186.7C960,192,988,128,1016,117.3C1044.7,107,1073,149,1101,176C1129.4,203,1158,213,1186,224C1214.1,235,1242,245,1271,256C1298.8,267,1327,277,1355,256C1383.5,235,1412,181,1426,154.7L1440,128L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"></path></svg>
    </div>
    <div id="teampage" class="d-flex align-items-center teampage">
      <div class="container">
        <div class="row teampage-header">
          <div class="col text-end" style="overflow:hidden" data-aos="fade-left" data-aos-duration="500">
            <h3>Staff | <VueJsCounter style="display:inline;" start="0" end="4" duration="5000"/></h3>
            <h3>Asisten | <VueJsCounter style="display:inline;" start="0" end="63" duration="5000"/></h3>
            <h3>Team IT | <VueJsCounter style="display:inline;" start="0" end="7" duration="5000"/></h3>
          </div>
          <div class="col align-self-center" style="overflow:hidden">
            <h1 data-aos="fade-right" data-aos-duration="500">Our Teams</h1>
          </div>
        </div>
      </div>
      <div data-aos="fade-right" data-aos-offset="350" data-aos-duration="500" id="teampage-laptop-left">
        <div class="container-fluid">
        <h5>
          <div class="pb-2">Pendaftaran</div>
          <a href="https://oprecruitment.ak-menengah.com/" target="_blank"><Button class="bg-retro" icon="pi pi-search" iconPos="right" label="Daftar disini" /></a>
        </h5>
        <img src="@/assets/images/laptop-left.png" alt="">
        </div>
      </div>
      <div data-aos="fade-right" data-aos-offset="-50" data-aos-duration="500" id="teampage-laptop-right">
        <div class="container-fluid">
        <h6>
          <div class="pb-2">Info Selengkapnya</div>
          <a href="https://ak-menengah.com/" target="_blank"><Button class="bg-retro" icon="pi pi-search" iconPos="right" label="Klik Disini" /></a>
        </h6>
        <img src="@/assets/images/laptop-right.png" alt="">
        </div>
      </div>
      <img id="teampage-arrow-up-left" data-aos="fade-up" data-aos-offset="350" data-aos-duration="500" src="@/assets/images/arrow-up-left.png" style="z-index:-1;" alt="">
      <img id="teampage-arrow-bottom-right" data-aos="fade-down" data-aos-offset="50" data-aos-duration="500" src="@/assets/images/arrow-bottom-right.png" style="z-index:-1;" alt="">
    </div>
    <div id="aboutpage" class="aboutpage pb-5">
      <div class="container">
        <div class="row aboutpage-header">
          <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Our News & Article</h1>
          <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">Disini kami menyajikan info & artikel terbaru kami</h3>
        </div>
        <div class="container">
          <div class="row" v-if="articles.article.length != 0">
            <div class="col" v-for="item in articles.article" :key="item.id">
              <div data-aos="fade-up" data-aos-offset="400" class="card mb-3" style="width: 20rem;">
                <img :src="apiURL+'images/articles/'+item.cover" class="card-img-top" :alt="item.title">
                <div class="card-body">
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">{{item.short_desc}}</p>
                  <router-link :to="'/article/'+item.slug"><Button label="Read" icon="pi pi-check" /></router-link>
                </div>
              </div>
            </div>
            <div class="col-12">
              <router-link style="text-decoration:none;" to="/article"><Button label="Read More Articles" icon="pi pi-arrow-right" class="p-button-text" iconPos="right" autofocus /></router-link>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col">
              <div class="alert alert-info">Artikel belum ditambahkan</div>
            </div>
          </div>
        </div>
      </div>
      <svg id="aboutpage-bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <linearGradient x1="0" y1="100%" x2="100%" y2="100%" id="gradient">
        <stop stop-color="#1C96BF" offset="0%"/>
        <stop stop-color="#2038B5" offset="100%"/>
      </linearGradient>
      <path fill="url(#gradient)" fill-opacity="1" d="M0,192L18.5,197.3C36.9,203,74,213,111,197.3C147.7,181,185,139,222,101.3C258.5,64,295,32,332,69.3C369.2,107,406,213,443,224C480,235,517,149,554,149.3C590.8,149,628,235,665,266.7C701.5,299,738,277,775,245.3C812.3,213,849,171,886,170.7C923.1,171,960,213,997,213.3C1033.8,213,1071,171,1108,133.3C1144.6,96,1182,64,1218,58.7C1255.4,53,1292,75,1329,74.7C1366.2,75,1403,53,1422,42.7L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
    </div>
    <div class="contact py-5">
      <div class="container">
        <div class="row contact-header">
          <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Contact Us</h1>
          <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">(021)-653-2678</h3>
          <div data-aos="zoom-in-up" data-aos-duration="1750" class="text-center">
              <a href="https://www.instagram.com/labamen_ug/" target="_blank" class="me-3"><i class="uil uil-instagram"></i></a>
              <a href="http://bit.ly/Labamen_UG" target="_blank" class="me-3"><i class="uil uil-youtube"></i></a>
              <a href="https://www.linkedin.com/company/labamen" target="_blank" class="me-3"><i class="uil uil-linkedin"></i></a>
          </div>
        </div>
      </div>
      <svg id="contact-bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,192L18.5,197.3C36.9,203,74,213,111,197.3C147.7,181,185,139,222,101.3C258.5,64,295,32,332,69.3C369.2,107,406,213,443,224C480,235,517,149,554,149.3C590.8,149,628,235,665,266.7C701.5,299,738,277,775,245.3C812.3,213,849,171,886,170.7C923.1,171,960,213,997,213.3C1033.8,213,1071,171,1108,133.3C1144.6,96,1182,64,1218,58.7C1255.4,53,1292,75,1329,74.7C1366.2,75,1403,53,1422,42.7L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
      <img id="contact-bottom-1" data-aos-offset="-200" data-aos="fade-up-right" data-aos-duration="1000" src="@/assets/images/homepage-5.png" alt="">
      <img id="contact-bottom-2" data-aos-offset="-200" data-aos="fade-up" class="ms-auto me-auto" data-aos-duration="1500" src="@/assets/images/homepage-1.png" alt="">
      <img id="contact-bottom-3" data-aos-offset="-200" data-aos="fade-up-left" data-aos-duration="1000" src="@/assets/images/homepage-2.png" alt="">
    </div>
  </div>
</template>

<script>
import appConfig from "@/config/app"
import Button from 'primevue/button'
import Mixins from "@/mixins"
import Navbar from "@/components/Navbar.vue"
import { mapGetters } from "vuex"
export default {
    setup() {
      return {
        apiURL: appConfig.apiURL,
      }
    },
    mixins: [Mixins],
    components:{
      Navbar,
      Button
    },
    computed: {
      ...mapGetters({
          articles: "article/articles",
      }),
    },
    created(){
      this.$store.dispatch('article/index')
    }
}
</script>

<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/home.scss";
</style>
