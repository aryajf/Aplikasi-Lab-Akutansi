<template>
    <div>
        <div id="verified" class="container-fluid">
            <div style="height:100vh;" class="row align-middle align-items-center d-flex justify-content-center">
                <div class="card" data-aos="fade-down" data-aos-offset="-500" data-aos-duration="1500">
                    <div class="card-body">
                            <div class="row">
                                <h1 class="text-center">Verifikasi Akun</h1>
                            </div>
                            <div class="row">
                                <div class="text-center"><img src="@/assets/images/verified.png" alt=""></div>
                            </div>
                            <div class="row">
                                <div class="text-center"><Button @click="verifyEmail" label="Klik disini untuk melanjutkan" iconPos="right" class="p-button-success" :disabled="btnLoading" :icon="btnLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'"/></div>
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
import { mapGetters } from "vuex"
import Mixins from "@/mixins"
export default {
    mixins: [Mixins],
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    computed: {
        ...mapGetters({
            btnLoading: "btnLoading",
        }),
    },
    methods: {
        verifyEmail: function(){
            this.$store.dispatch('auth/verifyEmail', {email: this.$route.params.email, token: this.$route.params.token})
        },
    },
    components:{
        Button,
    }
}
</script>
<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/verified.scss";
</style>