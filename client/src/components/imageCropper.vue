<template>
    <div>
        <div class="modal fade" id="avatarModal" tabindex="-1" aria-labelledby="avatarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="avatarModalLabel"><i class="uil uil-user-circle me-1"></i>Change Avatar</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="row">
                            <div class="col">
                                <div class="avatarPreview rounded-circle shadow-sm mb-3">
                                    <template v-if="fileName">
                                        <img src="@/assets/images/file-upload.png" alt="" srcset="" class="w-100">
                                    </template>
                                    <template v-else>
                                        <div class="coverPreview shadow-sm mb-3 text-center">
                                            <template v-if="user.avatar">
                                                <img :src="apiURL+'images/avatars/'+user.avatar" class="w-100" alt="cover">
                                            </template>
                                            <template v-else>
                                                <img src="@/assets/images/no-avatar.png" class="w-100" alt="cover">
                                            </template>
                                        </div>
                                    </template>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="avatar">
                                        <span class="btn btn-sm bg-az"><i class="uil uil-export me-1"></i>Select Avatar</span>
                                        <button id="saveBtn" class="btn btn-sm btn-primary ms-2 d-none" @click="updateAvatar" :disabled="btnLoading">
                                            <div class="d-flex">
                                                <span>Simpan</span>
                                            </div>
                                        </button>
                                    </label>
                                    <input type="file" class="d-none" id="avatar" v-on:change="onImageChange">
                                </div>
                            </div>
                            <div id="cropper-canvas" class="col d-none">
                                <vue-cropper ref="cropper" alt="Crop Image" :background="false" :zoomable="true" :movable="false" :aspect-ratio="1 / 1" preview=".avatarPreview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import appConfig from "@/config/app"
import VueCropper from "vue-cropperjs"
export default {
    data() {
        return {
            fileName: "",
        };
    },
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    components: { VueCropper },
    computed: {
        ...mapGetters({
            btnLoading: "btnLoading",
            formErrors: "formErrors",
            user: "auth/user",
        }),
    },
    methods: {
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
                this.fileName = file[0].name;
                this.createImage(file[0]);
            } else {
                e.target.value = "";
                window.notyf.error("Avatar harus gambar (PNG, JPG, JPEG, GIF)");
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
        updateAvatar() {
            if (this.$refs.cropper.getCroppedCanvas() == null) {
                window.notyf.error("Pilih avatar terlebih dahulu");
            } else {
                this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
                    const data = new FormData();
                    data.append("avatar", blob, this.fileName);
                    this.$store
                        .dispatch("auth/updateAvatar", data)
                        .then((res) => {
                            if (res.status === 200) {
                                this.$refs.cropper.destroy();
                                this.$refs.modalClose.click();
                                let cropperCanvas =
                                document.getElementById("cropper-canvas");
                                cropperCanvas.classList.add("d-none");
                            }
                        });
                });
            }
        },
    },
};
</script>

<style lang="scss">
.avatarPreview {
    height: 150px !important;
    width: 150px !important;
    margin: 0 auto;
    overflow: hidden;
    background: #efece8;
}
.avatarPreview img {
    max-width: 100%;
}
</style>