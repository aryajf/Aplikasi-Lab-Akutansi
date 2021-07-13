<template>
    <div class="position-relative">
        <nav class="navbar navbar-expand-lg navbar-dark position-absolute top-0 start-0 w-100">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand" href="#">Labamen</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <router-link to="/" class="nav-link" exact><i class="pi pi-home me-1"></i>Home</router-link>
                        <router-link to="/login" class="nav-link" exact><i class="pi pi-sign-in me-1"></i>Login</router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
    @import "@/assets/sass/app.scss";
    @import "@/assets/sass/navbar.scss";
</style>