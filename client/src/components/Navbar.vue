<template>
    <div class="position-relative">
        <nav :class="bg" class="navbar navbar-expand-lg navbar-dark position-absolute top-0 start-0 w-100">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand" href="#">Labamen</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <router-link to="/" class="nav-link" exact><i class="pi pi-home me-1"></i>Home</router-link>
                        <a href="#aboutpage" class="nav-link" exact><i class="pi pi-microsoft me-1"></i>Article</a>
                        <template v-if="authenticated">
                            <template v-if="user.role == 'Admin'">
                                <router-link to="/article/add" class="nav-link" exact><i class="pi pi-upload me-1"></i>Add Article</router-link>
                            </template>
                            <router-link to="/profile" class="nav-link" exact><i class="pi pi-user me-1"></i>Profile</router-link>
                            <router-link to="/logout" class="nav-link" exact><i class="pi pi-sign-out me-1"></i>Logout</router-link>
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
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props:['bg'],
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