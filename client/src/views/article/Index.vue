<template>
    <div id="article" v-if="articles.article">
        <navbar bg="" theme="navbar-light"/>
        <div id="aboutpage" class="aboutpage pb-5">
        <svg id="wave-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <linearGradient x1="0" y1="100%" x2="100%" y2="100%" id="gradient">
                <stop stop-color="#ddd" offset="0%"/>
                <stop stop-color="#eee" offset="100%"/>
            </linearGradient>
            <path fill="url(#gradient)" fill-opacity="1" d="M0,192L16,176C32,160,64,128,96,144C128,160,160,224,192,245.3C224,267,256,245,288,208C320,171,352,117,384,106.7C416,96,448,128,480,128C512,128,544,96,576,74.7C608,53,640,43,672,64C704,85,736,139,768,176C800,213,832,235,864,213.3C896,192,928,128,960,117.3C992,107,1024,149,1056,149.3C1088,149,1120,107,1152,85.3C1184,64,1216,64,1248,85.3C1280,107,1312,149,1344,170.7C1376,192,1408,192,1424,192L1440,192L1440,0L1424,0C1408,0,1376,0,1344,0C1312,0,1280,0,1248,0C1216,0,1184,0,1152,0C1120,0,1088,0,1056,0C1024,0,992,0,960,0C928,0,896,0,864,0C832,0,800,0,768,0C736,0,704,0,672,0C640,0,608,0,576,0C544,0,512,0,480,0C448,0,416,0,384,0C352,0,320,0,288,0C256,0,224,0,192,0C160,0,128,0,96,0C64,0,32,0,16,0L0,0Z"></path>
        </svg>
      <div class="container">
        <div class="row aboutpage-header">
          <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Our News & Article</h1>
          <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">Disini kami menyajikan info & artikel terbaru kami</h3>
        </div>
        <div class="container">
          <div class="row" v-if="articles.article.length != 0">
            <div class="col-12">
                <div id="carouselExampleDark" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div v-for="(item, index) in articles.article" :class="index == 0 ? 'active' : '' " :key="item.id" class="carousel-item" data-bs-interval="10000">
                          <img :src="apiURL+'images/article/'+item.cover" class="d-block w-100" alt="">
                          <div class="carousel-caption d-none d-md-block">
                              <router-link :to="'/article/'+item.slug"><h4>{{item.title}}</h4></router-link>
                              <p>{{item.short_desc}}</p>
                          </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>
            </div>
        </div>
        <div class="row pt-4 pb-3">
            <div v-if="authenticated && user.role == 'Admin'" class="col">
                <span class="p-float-label p-input-icon-right">
                    <router-link to="/article/create" style="text-decoration:none;">
                      <Button label="Tambah Artikel" icon="pi pi-plus" iconPos="left" />
                    </router-link>
                </span>
            </div>
            <div class="col d-flex justify-content-end">
                <span class="p-float-label p-input-icon-right">
                    <i :class="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-search'" />
                    <InputText class="fw-bold w-100 py-3" id="search" type="text" v-model="keyword" :disabled="btnLoading" />
                    <label for="search">Search Article & News</label>
                </span>
            </div>
        </div>
          <div class="row" v-if="articles.article.length != 0">
            <div class="col d-flex justify-content-center" v-for="item in articles.article" :key="item.id">
              <div class="card mb-3" style="width: 20rem;">
                <img v-if="item.cover" :src="apiURL+'images/article/'+item.cover" class="card-img-top" :alt="item.title">
                <div class="card-body">
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">{{item.short_desc}}</p>
                  <router-link :to="'/article/'+item.slug"><Button label="Read" icon="pi pi-check" /></router-link>
                </div>
              </div>
            </div>
            <Paginator v-if="articles" @page="changePage($event)"  v-model:rows="articles.limitItems" :totalRecords="articles.totalItems" />
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
        <stop stop-color="#ddd" offset="0%"/>
        <stop stop-color="#eee" offset="100%"/>
      </linearGradient>
      <path fill="url(#gradient)" fill-opacity="1" d="M0,192L18.5,197.3C36.9,203,74,213,111,197.3C147.7,181,185,139,222,101.3C258.5,64,295,32,332,69.3C369.2,107,406,213,443,224C480,235,517,149,554,149.3C590.8,149,628,235,665,266.7C701.5,299,738,277,775,245.3C812.3,213,849,171,886,170.7C923.1,171,960,213,997,213.3C1033.8,213,1071,171,1108,133.3C1144.6,96,1182,64,1218,58.7C1255.4,53,1292,75,1329,74.7C1366.2,75,1403,53,1422,42.7L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
    </div>
    </div>
</template>
<script>
import appConfig from "@/config/app"
import InputText from 'primevue/inputtext'
import Navbar from "@/components/Navbar.vue"
import { mapGetters } from "vuex"
export default {
    setup() {
      return {
        apiURL: appConfig.apiURL,
        keyword: null,
        paginationSearch: false,
      }
    },
    watch: {
      keyword() {
        this.search();
      },
    },
    components:{
      Navbar,
      InputText,
    },
    computed: {
      ...mapGetters({
        articles: "article/articles",
        authenticated: "auth/authenticated",
        user: "auth/user",
      }),
    },
    created(){
      this.getArticles()
    },
    methods:{
      getArticles(){
        this.paginationSearch = false
        this.$store.dispatch('article/index')
      },
      changePage(event) {
        if (this.paginationSearch == true) {
          const data = { keyword: this.keyword, page: event.page }
          this.$store.dispatch("article/search", data)
        } else {
          this.$store.dispatch("article/index", event.page)
        }
      },
      search() {
        this.paginationSearch = true;
        if (this.keyword != "") {
          this.$store.dispatch("proposal/searchProposal", this.keyword).then((res) => {
            this.alertSearch = res.message
          })
        } else {
          this.alertSearch = null
          this.getArticles()
        }
      },
    }
}
</script>
<style lang="scss">
@import "@/assets/sass/app.scss";
@import "@/assets/sass/article/index.scss";
</style>