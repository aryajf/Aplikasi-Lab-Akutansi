<template>
    <div>
    <Dialog header="Logout" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
        <div class="confirmation-content">
            <span class="align-base-center">Apakah kamu yakin ingin keluar?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="logout" class="p-button-text" autofocus />
        </template>
    </Dialog>
    <div class="position-relative">
        <nav :class="[bg, theme]" class="navbar navbar-expand-lg position-absolute top-0 start-0 w-100">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand" href="#">Labamen</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <router-link to="/" class="nav-link" exact><i class="pi pi-home me-1"></i>Home</router-link>
                        <router-link to="/article" class="nav-link" exact><i class="pi pi-microsoft me-1"></i>Article</router-link>
                        <template v-if="authenticated">
                            <router-link to="/profile" class="nav-link" exact><i class="pi pi-user me-1"></i>Profile</router-link>
                            <a href="#" @click="openConfirmation" class="nav-link" exact><i class="pi pi-sign-out me-1"></i>Logout</a>
                        </template>
                        <template v-else>
                            <router-link to="/register" class="nav-link" exact><i class="pi pi-user-plus me-1"></i>Register</router-link>
                            <router-link to="/login" class="nav-link" exact><i class="pi pi-sign-in me-1"></i>Login</router-link>
                        </template>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    </div>
</template>

<script>
import { useStore, mapGetters } from "vuex"
import { ref } from 'vue'
export default {
    setup(){
        const store = useStore()

        const displayConfirmation = ref(false)
        const openConfirmation = () => {
            displayConfirmation.value = true;
        }
        const closeConfirmation = () => {
            displayConfirmation.value = false;
        }
        const logout = () => {
            store.dispatch('auth/logout')
            displayConfirmation.value = false
        }
        return {displayConfirmation, openConfirmation, closeConfirmation, logout}
    },
    props:['bg', 'theme'],
    computed: {
        ...mapGetters({
            user: 'auth/user',
            authenticated: 'auth/authenticated'
        }),
    },
}
</script>

<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/navbar.scss";
</style>