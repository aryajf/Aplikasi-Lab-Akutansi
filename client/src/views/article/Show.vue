<template>
    <div id="article">
        <navbar bg="" theme="navbar-light"/>
        <div id="show-article" class="show-article py-5">
        <div class="container pt-5">
            <div class="container">
            <div class="row">
                <div class="col-12">
                    <img v-if="article.cover" :src="apiURL+'images/articles/'+article.cover" class="d-block w-100" alt="">
                </div>
            </div>
            <div class="row show-article-header">
                <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">{{article.title}}</h1>
                <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">{{article.short_desc}}</h3>
            </div>
          <div class="row">
            <div v-html="article.long_desc"></div>
          </div>
          <div class="row">
            <h5 class="mt-5 mb-3">Komentar :</h5>
            <div class="mb-3" v-if="authenticated">
              <form @submit.prevent="postComment">
                <div class="col-12 editor-container">
                  <Editor :class="{'p-invalid': formErrors.message && formErrors.message.length > 0}" placeholder="Tulis Komentar kamu" v-model="message" editorStyle="height: 200px">
                    <template #toolbar>
                      <span class="ql-formats">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                      </span>
                    </template>
                  </Editor>
                  <small class="p-error" v-if="formErrors.message">*{{formErrors.message[0]}}</small>
                </div>
                <div class="col-12 mt-2 text-end">
                  <Button type="submit" label="Send Message" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-send'" iconPos="right" autofocus />
                </div>
              </form>
            </div>
            <div v-else>
              <div class="alert alert-info text-center">Login terlebih dahulu agar bisa berkomentar</div>
            </div>
            <template v-if="article.comment">
            <template v-if="article.comment.length !== 0">
              <div class="container" style="overflow-y:auto;height:100vh">
                <div class="row" v-for="item in article.comment" :key="item.id">
                  <div class="col-md-2 my-3">
                    <img v-if="item.user.avatar" :src="apiURL+'images/avatars/'+item.user.avatar" style="border:0;" class="img-thumbnail rounded-circle" :alt="item.user.nama">
                    <img v-else src="@/assets/images/no-avatar.png" style="border:0;" class="img-thumbnail" :alt="item.user.nama">
                  </div>
                  <div class="col-md-10 align-self-center">
                    <div class="row">
                      <div class="col">
                        <h5>{{item.user.nama}}</h5>
                      </div>
                      <div class="col">
                        <div class="text-end">
                          <small>{{DateFormatAgo(item.updatedAt)}}</small>
                        </div>
                      </div>
                    </div>
                    <div v-html="item.message"></div>
                  </div>
                  <hr class="my-3">
                </div>
              </div>
            </template>
            <div v-else class="alert alert-info text-center">Belum ada yang berkomentar di artikel ini</div>
            </template>
          </div>
        </div>
      </div>
      <svg id="show-article-bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
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
import Navbar from "@/components/Navbar.vue"
import Mixins from "@/mixins"
import Editor from 'primevue/editor'
import { mapGetters } from "vuex"
export default {
    mixins: [Mixins],
    setup() {
      return {
        apiURL: appConfig.apiURL,
      }
    },
    data(){
      return{
        message: ''
      }
    },
    components:{
      Navbar,
      Editor
    },
    computed: {
      ...mapGetters({
        article: "article/article",
        authenticated: "auth/authenticated",
        user: "auth/user",
        btnLoading: "btnLoading",
        formErrors: "formErrors",
      }),
    },
    created(){
      this.getArticle()
    },
    methods: {
      getArticle(){
        this.$store.dispatch('article/show', this.$route.params.slug).then(res => {
          if(res.status == 404){
            this.$router.push({name:'not-found'})
          }
        })
      },
      postComment(){
        this.$store.dispatch('comment/create', {slug:this.$route.params.slug, message:this.message}).then(res => {
          if(res.status == 201){
            this.message = ''
          }
        })
      }
    },
}
</script>
<style lang="scss">
@import "@/assets/sass/app.scss";
@import "@/assets/sass/article/show.scss";
</style>