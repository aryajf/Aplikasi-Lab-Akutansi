<template>
    <div>
        <!-- UPLOAD IMAGE MODAL -->
        <imageCropper />
        <div id="profile" class="container-fluid">
            <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
                <div class="card" style="width:40%;" data-aos="fade-down" data-aos-offset="-500" data-aos-duration="1500">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <router-link to="/">
                                            <Button label="Back to home" class="p-button-text" icon="pi pi-arrow-left" iconPos="left" />
                                        </router-link>
                                    </div>
                                    <div class="col">
                                        <h5 class="card-title text-end">Change Password</h5>
                                    </div>
                                </div>
                                <hr>
                                <form @submit.prevent="changePassword">
                                <div class="row my-4">
                                    <div class="col">
                                        <span class="p-field p-float-label p-input-icon-left w-100">
                                            <i class="pi pi-lock"></i>
                                            <InputText :class="{'p-invalid': formErrors.oldPassword && formErrors.oldPassword.length > 0}" class="w-100" id="oldPassword" type="password" v-model="form.oldPassword" />
                                            <label for="oldPassword">Masukkan Password Lama</label>
                                        </span>
                                    </div>
                                    <small class="p-error" v-if="formErrors.oldPassword">*{{formErrors.oldPassword[0]}}</small>
                                </div>
                                <div class="row my-4">
                                    <div class="col">
                                        <span class="p-field p-float-label p-input-icon-left w-100">
                                            <i class="pi pi-lock"></i>
                                            <InputText :class="{'p-invalid': formErrors.newPassword && formErrors.newPassword.length > 0}" class="w-100" id="newPassword" type="password" v-model="form.newPassword" />
                                            <label for="newPassword">Masukkan Password Baru</label>
                                        </span>
                                    </div>
                                    <small class="p-error" v-if="formErrors.newPassword">*{{formErrors.newPassword[0]}}</small>
                                </div>
                                <div class="row my-4">
                                    <div class="col">
                                        <span class="p-field p-float-label p-input-icon-left w-100">
                                            <i class="pi pi-lock"></i>
                                            <InputText :class="{'p-invalid': formErrors.confirmNewPassword && formErrors.confirmNewPassword.length > 0}" class="w-100" id="confirmNewPassword" type="password" v-model="form.confirmNewPassword" />
                                            <label for="confirmNewPassword">Masukkan Kembali Password Baru</label>
                                        </span>
                                    </div>
                                    <small class="p-error" v-if="formErrors.confirmNewPassword">*{{formErrors.confirmNewPassword[0]}}</small>
                                </div>
                                <div class="row my-4">
                                    <div class="col">
                                        <Button class="p-button-success" type="submit" label="Submit" iconPos="right" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'" />
                                    </div>
                                </div>
                                <div class="row my-4">
                                    <router-link to="/profile">
                                        <Button label="Back to Change Profile" class="p-button-text" icon="pi pi-arrow-left" iconPos="left" />
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
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import imageCropper from "@/components/imageCropper.vue";
import { mapGetters } from "vuex"
import Mixins from "@/mixins"

export default {
    mixins: [Mixins],
    data(){
        return {
            form:{
                oldPassword:null,
                newPassword:null,
                confirmNewPassword:null
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
        changePassword: function(){
            this.$store.dispatch('auth/changePassword', this.form)
        },
    },
    components:{
        InputText,
        Button,
        imageCropper
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/profile.scss";
</style>