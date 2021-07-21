<template>
    <div id="article">
        <Dialog header="Full Preview" v-model:visible="displayMaximizable" :style="{width: '50vw'}" :maximizable="true" :modal="true">
            <div id="show-article" class="show-article">
                <div class="row">
                    <div class="col-12">
                        <template v-if="imagePreview">
                            <img :src="imagePreview" alt="" srcset="" class="w-100">
                        </template>
                        <template v-else>
                            <div class="coverPreview shadow-sm mb-3 text-center">
                                <template v-if="article.cover">
                                    <img :src="apiURL+'images/articles/'+article.cover" class="w-100" alt="cover">
                                </template>
                                <template v-else>
                                    <img src="@/assets/images/image-not-available.png" class="w-100" alt="cover">
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="row show-article-header">
                    <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">{{article.title}}</h1>
                    <h3 data-aos="zoom-in-up" data-aos-duration="1500" class="d-flex align-items-center justify-content-center">{{article.short_desc}}</h3>
                </div>
                <div class="row">
                    <div v-html="article.long_desc"></div>
                </div>
            </div>
        </Dialog>
        <!-- CROP COVER MODAL -->
        <div class="modal fade" id="cropModal" tabindex="-1" aria-labelledby="cropModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cropModalLabel"><i class="uil uil-image-edit me-1"></i>Choose Cover</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="coverPreview shadow-sm mb-3 text-center">
                            <template v-if="article.cover">
                                <img :src="apiURL+'images/articles/'+article.cover" class="w-100" alt="cover">
                            </template>
                            <template v-else>
                                <img src="@/assets/images/image-not-available.png" class="w-100" alt="cover">
                            </template>
                        </div>
                        <div class="form-group mb-3">
                            <label for="cover">
                                <span class="btn btn-sm bg-az"><i class="uil uil-export me-1"></i>Pilih Cover</span>
                                <button id="saveBtn" class="btn btn-sm btn-primary ms-2 d-none" data-bs-dismiss="modal" @click="cropCover" :disabled="btnLoading">
                                    <div class="d-flex">
                                        <span>Simpan</span>
                                        <template v-if="btnLoading">
                                        </template>
                                        <template v-else><i class="uil uil-save ms-1"></i></template>
                                    </div>
                                </button>
                            </label>
                            <input type="file" class="d-none" id="cover" v-on:change="onImageChange">
                        </div>
                        <div id="cropper-canvas" class="d-none">
                            <vue-cropper ref="cropper" alt="Crop Image" :background="false" :zoomable="true" :movable="false" :aspect-ratio="16 / 9" preview=".coverPreview" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
          <h1 data-aos="zoom-in" data-aos-duration="1000" class="d-flex align-items-center justify-content-center">Create Article</h1>
        </div>
        <div class="container">
        <div class="row pt-4 pb-3">
            <div class="col-md-8">
                <form @submit.prevent="update">
                <div class="row mb-4">
                    <div class="col">
                        <template v-if='imagePreview'>
                            <img :src="imagePreview" alt="image" class="added-image w-100">
                            <label data-bs-toggle="modal" data-bs-target="#cropModal" class="my-2">
                                <span class="btn bg-secondary text-white btn-sm">Ganti Cover<i class="uil uil-image-upload ms-1"></i></span>
                            </label>
                        </template>

                        <template v-else>
                            <label data-bs-toggle="modal" data-bs-target="#cropModal" class="file-upload-cover bg-light cursor-pointer d-block">
                                <img src="@/assets/images/file-upload.png" alt="Picture Add" class="default-image">
                                <p>
                                    Upload Cover
                                    <span class="text-danger d-block" v-if="formErrors.cover">*{{formErrors.cover[0]}}</span>
                                </p>
                            </label>
                        </template>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col">
                        <span class="p-field p-float-label p-input-icon-right w-100">
                            <i class="pi pi-paperclip"></i>
                            <InputText id="title" :class="{'p-invalid': formErrors.title && formErrors.title.length > 0}" v-model="article.title" class="w-100" type="text" />
                            <label for="title">Judul Artikel</label>
                        </span>
                        <small class="p-error" v-if="formErrors.title">*{{formErrors.title[0]}}</small>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col">
                        <span class="p-field p-float-label p-input-icon-right w-100">
                            <i class="pi pi-pencil"></i>
                            <InputText id="short_desc" :class="{'p-invalid': formErrors.short_desc && formErrors.short_desc.length > 0}" v-model="article.short_desc" class="w-100" type="text" />
                            <label for="short_desc">Deskripsi pendek</label>
                        </span>
                        <small class="p-error" v-if="formErrors.short_desc">*{{formErrors.short_desc[0]}}</small>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col editor-container">
                        <Editor :class="{'p-invalid': formErrors.long_desc && formErrors.long_desc.length > 0}" v-model="article.long_desc" editorStyle="height: 320px">
                        </Editor>
                        <small class="p-error" v-if="formErrors.long_desc">*{{formErrors.long_desc[0]}}</small>
                    </div>
                </div>
                <div class="row my-2">
                    <div class="col">
                        <Button class="p-button-success" type="submit" label="Update" iconPos="right" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'" />
                    </div>
                </div>
                </form>
            </div>
            <div class="col">
                <div class="row justify-content-center">
                    <h3 class="text-center mb-3">Card Preview</h3>
                    <div class="card mb-3" style="width: 20rem;">
                        <div class="card-body">
                        <template v-if="imagePreview">
                            <img :src="imagePreview" alt="" srcset="" class="w-100">
                        </template>
                        <template v-else>
                            <div class="coverPreview shadow-sm mb-3 text-center">
                                <template v-if="article.cover">
                                    <img :src="apiURL+'images/articles/'+article.cover" class="w-100" alt="cover">
                                </template>
                                <template v-else>
                                    <img src="@/assets/images/image-not-available.png" class="w-100" alt="cover">
                                </template>
                            </div>
                        </template>
                        <h5 class="card-title">{{article.title}}</h5>
                        <p class="card-text">{{article.short_desc}}</p>
                        <Button label="Read More" icon="pi pi-external-link" @click="openMaximizable" />
                        </div>
                    </div>
                </div>
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
import { ref } from 'vue'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import Navbar from "@/components/Navbar.vue"
import VueCropper from "vue-cropperjs"
import { mapGetters } from "vuex"
export default {
    setup(){
        const displayMaximizable = ref(false)
        const openMaximizable = () => {
            displayMaximizable.value = true
        }
        const closeMaximizable = () => {
            displayMaximizable.value = false
        }
        return {
            apiURL: appConfig.apiURL,
            displayMaximizable,
            openMaximizable,
            closeMaximizable
        }
    },
    data(){
        return{
            form:{
                cover: ''
            },
            coverName: "",
            imagePreview: "",
        }
    },
    computed: {
        ...mapGetters({
            btnLoading: "btnLoading",
            formErrors: "formErrors",
            article: "article/article"
        }),
    },
    created(){
      this.getArticle()
    },
    methods:{
        getArticle(){
            this.$store.dispatch('article/show', this.$route.params.slug)
        },
        onImageChange(e) {
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                return;
            }
            let fileType = file[0].type;
            if (
                fileType == "image/png" ||
                fileType == "image/jpg" ||
                fileType == "image/jpeg" ||
                fileType == "image/gif"
            ) {
                this.coverName = file[0].name;
                this.createImage(file[0]);
            } else {
                e.target.value = "";
                window.notyf.error("Cover harus gambar (PNG, JPG, JPEG, GIF)");
            }
        },
        createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let saveBtn = document.getElementById("saveBtn");
                let cropperCanvas = document.getElementById("cropper-canvas");
                saveBtn.classList.remove("d-none");
                cropperCanvas.classList.remove("d-none");
                this.$refs.cropper.replace(e.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropCover() {
            this.imagePreview = this.$refs.cropper
                .getCroppedCanvas()
                .toDataURL();
            this.form.cover = this.$refs.cropper
                .getCroppedCanvas()
                .toBlob((blob) => {
                    this.form.cover = blob;
                });
        },
        update() {
            const cover = new File([this.form.cover], this.coverName, {
                lastModified: this.form.cover.lastModified,
                type: this.form.cover.type,
            });
            const data = new FormData()
            data.append("cover", cover)
            data.append("title", this.article.title)
            data.append("short_desc", this.article.short_desc)
            data.append("long_desc", this.article.long_desc)

            this.$store.dispatch("article/update", [
                this.$route.params.slug,
                data
            ])
        },
    },
    components:{
      Navbar,
      InputText,
      Editor,
      VueCropper,
    }
}
</script>
<style lang="scss">
@import "@/assets/sass/app.scss";
@import "@/assets/sass/article/create.scss";
</style>