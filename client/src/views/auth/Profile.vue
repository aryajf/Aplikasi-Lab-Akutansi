<template>
    <div>
        <!-- UPLOAD IMAGE MODAL -->
        <imageCropper />
        <div id="profile" class="container-fluid">
            <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
                <div class="card" style="width:90%;" data-aos="fade-down" data-aos-offset="-500" data-aos-duration="1500">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div v-if="user.avatar" class="avatar">
                                    <button class="btn rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#avatarModal"><i class="uil uil-pen"></i></button>
                                    <img class="rounded-circle shadow-sm" :src="apiURL+'images/avatars/'+user.avatar" alt="avatar">
                                </div>
                                <div v-else class="avatar">
                                    <button class="btn rounded-circle shadow" data-bs-toggle="modal" data-bs-target="#avatarModal"><i class="uil uil-pen"></i></button>
                                    <img class="rounded-circle shadow-sm" src="@/assets/images/no-avatar.png" alt="avatar">
                                </div>
                                <p class="text-center fw-bolder">{{user.nama}}</p>
                                <div class="text-center text-wa">
                                Online berakhir dalam
                                <span class="fw-bold d-block">
                                    <vue-countdown v-if="user.token_expired_at" :time="countDown(user.token_expired_at)" v-slot="{ hours, minutes, seconds }">{{ hours }} jam, {{ minutes }} menit, {{ seconds }} detik.</vue-countdown>
                                </span>
                            </div>
                            </div>
                            <div class="col-md-6 my-2">
                                <div class="row">
                                    <div class="col">
                                        <router-link to="/">
                                            <Button label="Back to home" class="p-button-text" icon="pi pi-arrow-left" iconPos="left" />
                                            </router-link>
                                    </div>
                                    <div class="col">
                                        <h5 class="card-title text-end">Update Profile</h5>
                                    </div>
                                </div>
                                <hr>
                                <form @submit.prevent="updateProfile">
                                <div class="row my-4">
                                    <div class="col">
                                        <span class="p-field p-float-label p-input-icon-left w-100">
                                            <i class="pi pi-user"></i>
                                            <InputText :class="{'p-invalid': formErrors.nama && formErrors.nama.length > 0}" class="w-100" id="nama" type="nama" v-model="user.nama" />
                                            <label for="nama">Nama</label>
                                        </span>
                                    </div>
                                    <small class="p-error" v-if="formErrors.nama">*{{formErrors.nama[0]}}</small>
                                    <div class="col">
                                        <span class="p-field p-float-label p-input-icon-left w-100">
                                            <i class="pi pi-phone"></i>
                                            <InputText :class="{'p-invalid': formErrors.phone && formErrors.phone.length > 0}" id="phone" class="w-100" type="phone" v-model="user.phone" />
                                            <label for="phone">Number phone</label>
                                        </span>
                                        <small class="p-error" v-if="formErrors.phone">*{{formErrors.phone[0]}}</small>
                                    </div>
                                </div>
                                <div class="row my-4">
                                    <div class="col">
                                        <span class="p-field p-float-label p-input-icon-left w-100">
                                            <i class="pi pi-map-marker"></i>        
                                            <Textarea :class="{'p-invalid': formErrors.alamat && formErrors.alamat.length > 0}" id="alamat" v-model="user.alamat" :autoResize="true" rows="4" cols="30" class="w-100" />
                                            <label for="alamat">Alamat</label>
                                        </span>
                                        <small class="p-error" v-if="formErrors.alamat">*{{formErrors.alamat[0]}}</small>
                                    </div>
                                </div>
                                <div class="row my-4">
                                    <div class="col">
                                        <Button class="p-button-success" type="submit" label="Submit" iconPos="right" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'" />
                                    </div>
                                </div>
                                <div class="row my-4">
                                    <router-link to="/profile/password">
                                        <Button label="Change Password" class="p-button-text" icon="pi pi-arrow-right" iconPos="right" />
                                    </router-link>
                                </div>
                                </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appConfig from "@/config/app"
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import imageCropper from "@/components/imageCropper.vue"
import { mapGetters } from "vuex"
import Mixins from "@/mixins"

export default {
    mixins: [Mixins],
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    data(){
        return {
            form:{
            }
        }
    },
    computed: {
        ...mapGetters({
            btnLoading: "btnLoading",
            formErrors: "formErrors",
            user: "auth/user",
        }),
    },
    methods: {
        updateProfile: function(){
            this.$store.dispatch('auth/updateProfile', this.user)
        },
    },
    components:{
        InputText,
        Button,
        Textarea,
        imageCropper
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/profile.scss";
</style>