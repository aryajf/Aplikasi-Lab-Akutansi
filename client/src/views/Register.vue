<template>
    <div id="register" class="container-fluid">
        <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
            <div class="card" data-aos="fade-down" data-aos-offset="-500" data-aos-duration="1500" style="width: 30rem;">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col d-flex justify-content-center">
                            <router-link to="/">
                        <Button label="Back to home" icon="pi pi-arrow-left" iconPos="left" /></router-link>
                        </div>
                    </div>
                    <h5 class="card-title">Register</h5>
                    <hr>
                    <form @submit.prevent="register">
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-float-label p-input-icon-left">
                                <i class="pi pi-user" />
                                <InputText :class="{'p-invalid': formErrors.nama && formErrors.nama.length > 0}" class="w-100" id="nama" type="text" v-model="form.nama" />
                                <label for="nama">Nama</label>
                            </span>
                            <small class="p-error" v-if="formErrors.nama">*{{formErrors.nama[0]}}</small>
                        </div>
                        <div class="col">
                            <span class="p-field p-float-label">
                                <InputNumber :class="{'p-invalid': formErrors.phone && formErrors.phone.length > 0}" v-model="form.phone" mode="decimal" :useGrouping="false" id="phone" class="w-100" placeholder="Number Phone" />
                            </span>
                            <small class="p-error" v-if="formErrors.phone">*{{formErrors.phone[0]}}</small>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-field p-float-label p-input-icon-left w-100">
                                <i class="uil uil-at"/>
                                <InputText :class="{'p-invalid': formErrors.email && formErrors.email.length > 0}" class="w-100" id="email" type="email" v-model="form.email" />
                                <label for="email">Email</label>
                            </span>
                        </div>
                        <small class="p-error" v-if="formErrors.email">*{{formErrors.email[0]}}</small>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-field p-float-label p-input-icon-left w-100">
                                <i class="pi pi-map-marker"></i>        
                                <Textarea :class="{'p-invalid': formErrors.alamat && formErrors.alamat.length > 0}" id="alamat" v-model="form.alamat" :autoResize="true" rows="2" cols="30" class="w-100" />
                                <label for="alamat">Alamat</label>
                            </span>
                            <small class="p-error" v-if="formErrors.alamat">*{{formErrors.alamat[0]}}</small>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-field p-float-label p-input-icon-left w-100">
                                <i class="pi pi-lock"></i>
                                <InputText :class="{'p-invalid': formErrors.password && formErrors.password.length > 0}" id="password" class="w-100" type="password" v-model="form.password" />
                                <label for="password">Password</label>
                            </span>
                            <small class="p-error" v-if="formErrors.password">*{{formErrors.password[0]}}</small>
                        </div>
                        <div class="col">
                            <span class="p-field p-float-label p-input-icon-left w-100">
                                <i class="pi pi-lock"></i>
                                <InputText :class="{'p-invalid': formErrors.confirmPassword && formErrors.confirmPassword.length > 0}" id="confirm-password" class="w-100" type="password" v-model="form.confirmPassword" />
                                <label for="confirm-password">Confirm Password</label>
                            </span>
                            <small class="p-error" v-if="formErrors.confirmPassword">*{{formErrors.confirmPassword[0]}}</small>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <vue-recaptcha siteKey="6LfAcS0bAAAAAE5NZh-WTsC7VxEK7cBWjXGDi3gm" size="normal" theme="light" :tabindex="0" @verify="recaptchaVerified" @expire="recaptchaExpired" @fail="recaptchaFailed" ref="vueRecaptcha"></vue-recaptcha>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <Button class="p-button-success" type="submit" label="Submit" iconPos="right" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'" />
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <img data-aos="fade-left" data-aos-offset="-500" data-aos-duration="1500" id="register-img-1" src="@/assets/images/asisten.png" alt="">
        <img data-aos="fade-down-right" data-aos-offset="-500" data-aos-duration="1500" id="register-img-2" src="@/assets/images/register.png" alt="">
    </div>
</template>

<script>
import vueRecaptcha from "vue3-recaptcha2"
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { mapGetters } from "vuex"
// import passingThree from "@/components/loadings/passingThree"

export default {
    data(){
        return {
            form:{
                nama: '',
                phone: null,
                email: '',
                alamat: '',
                password: '',
                confirmPassword: '',
                tokenRecaptcha: null,
            }
        }
    },
    computed: {
        ...mapGetters({
            btnLoading: "btnLoading",
            formErrors: "formErrors",
        }),
    },
    methods: {
        register: function(){
            this.$store.dispatch('auth/register', this.form)
            this.form.tokenRecaptcha = null
            this.recaptchaExpired()
        },
        recaptchaVerified: function(response) {
            this.form.tokenRecaptcha = response;
        },
        recaptchaExpired: function() {
            this.$refs.vueRecaptcha.reset();
        },
        recaptchaFailed: function() {},
    },
    components:{
        vueRecaptcha,
        InputText,
        InputNumber,
        Textarea,
        Button,
        // passingThree,
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/register.scss";
</style>