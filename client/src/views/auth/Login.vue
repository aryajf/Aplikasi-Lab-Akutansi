<template>
    <div id="login" class="container-fluid">
        <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
            <div class="card" data-aos="fade-down" data-aos-offset="-500" data-aos-duration="1500" style="width: 30rem;">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col d-flex justify-content-center">
                            <router-link to="/">
                                <Button label="Back to home" icon="pi pi-arrow-left" iconPos="left" />
                            </router-link>
                        </div>
                    </div>
                    <h5 class="card-title">Login</h5>
                    <hr>
                    <form @submit.prevent="login">
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
                                <i class="pi pi-lock"></i>
                                <InputText :class="{'p-invalid': formErrors.password && formErrors.password.length > 0}" id="password" class="w-100" type="password" v-model="form.password" />
                                <label for="password">Password</label>
                            </span>
                            <small class="p-error" v-if="formErrors.password">*{{formErrors.password[0]}}</small>
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
                    <div class="row my-4">
                        <div class="col">
                            <router-link style="text-decoration:none;" to="/register">Belum pernah login? buat akun disini</router-link>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <img data-aos="fade-left" data-aos-offset="-500" data-aos-duration="1500" id="login-img-1" src="@/assets/images/asisten.png" alt="">
        <img data-aos="fade-down-right" data-aos-offset="-500" data-aos-duration="1500" id="login-img-2" src="@/assets/images/register.png" alt="">
    </div>
</template>

<script>
import vueRecaptcha from "vue3-recaptcha2"
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { mapGetters } from "vuex"

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
        login: function(){
            this.$store.dispatch('auth/login', this.form)
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
        Button,
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/login.scss";
</style>