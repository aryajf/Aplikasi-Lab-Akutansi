<template>
    <div id="register" class="container-fluid">
        <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
            <div class="card" data-aos="fade-down" data-aos-offset="-500" data-aos-duration="1500" style="width: 40rem;">
                <div class="card-body">
                    <form @submit.prevent="register">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <router-link to="/">
                        <Button class="p-button-text" label="Back to home" icon="pi pi-arrow-left" iconPos="left" /></router-link>
                        </div>
                        <div class="col-md-4 d-flex justify-content-center">
                            <SelectButton :class="{'p-invalid': formErrors.role && formErrors.role.length > 0}" v-model="form.role" :options="roleList" />
                            <small class="p-error" v-if="formErrors.role">*{{formErrors.role[0]}}</small>
                        </div>
                        <div class="col-md-4 d-flex justify-content-end">
                            <router-link to="/login">
                        <Button class="p-button-text" label="Go To Login" icon="pi pi-arrow-right" iconPos="right" /></router-link>
                        </div>
                    </div>
                    <h5 class="card-title">Register</h5>
                    <hr>
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-float-label p-input-icon-left w-100">
                                <i class="pi pi-user" />
                                <InputText :class="{'p-invalid': formErrors.nama && formErrors.nama.length > 0}" class="w-100" id="nama" type="text" v-model="form.nama" />
                                <label for="nama">Nama</label>
                            </span>
                            <small class="p-error" v-if="formErrors.nama">*{{formErrors.nama[0]}}</small>
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
                        <div class="col text-end align-self-end">
                            <Button class="p-button-success" type="submit" label="Submit" iconPos="right" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'" />
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vueRecaptcha from "vue3-recaptcha2"
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import InputText from 'primevue/inputtext'
import { mapGetters } from "vuex"

export default {
    data(){
        return {
            form:{
                nama: '',
                email: '',
                password: '',
                role: 'Member',
                confirmPassword: '',
                tokenRecaptcha: null,
            },
			roleList: ['Member', 'Admin']
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
        Button,
        SelectButton,
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/register.scss";
</style>