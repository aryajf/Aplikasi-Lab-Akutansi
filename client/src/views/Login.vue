<template>
    <div id="register" class="container-fluid">
        <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
            <div class="card" style="width: 30rem;">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col d-flex justify-content-center">
                            <router-link to="/">
                        <Button label="Back to home" icon="pi pi-arrow-left" iconPos="left" /></router-link>
                        </div>
                    </div>
                    <h5 class="card-title">Login</h5>
                    <hr>
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-float-label p-input-icon-left w-100">
                                <i class="uil uil-at"/>
                                <InputText class="w-100" id="email" type="email" v-model="value2" />
                                <label for="email">Email</label>
                            </span>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <span class="p-float-label p-input-icon-left w-100">
                                <i class="pi pi-lock"></i>
                                <InputText id="password" class="w-100" type="password" v-model="value2" />
                                <label for="password">Password</label>
                            </span>
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col">
                            <Button class="p-button-success" label="Submit" icon="pi pi-check" iconPos="right" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img data-aos="fade-left" data-aos-offset="-200" data-aos-duration="1500" id="register-img-1" src="@/assets/images/asisten.png" alt="">
        <img data-aos="fade-down-right" data-aos-offset="-200" data-aos-duration="1500" id="register-img-2" src="@/assets/images/register.png" alt="">
    </div>
</template>
<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
export default {
    components:{
        InputText,
        Button
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/register.scss";
</style>