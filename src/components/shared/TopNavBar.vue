<template>
 <b-navbar :shadow="true" :fixed-top="true" type="is-light">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/about' }">
                About
            </b-navbar-item>
            
            <b-navbar-item v-show="$store.state.signedIn" tag="router-link" :to="{ path: '/dash' }">
                Dashboard
            </b-navbar-item>
            
            </template>
            <template slot="end">
            <b-navbar-item tag="div" >
                <div class="buttons">
                    <a class="button is-primary is-light" v-if="!$store.state.signedIn" @click="$router.push('authenticate')">
                        Log in
                    </a>
                    <a class="button is-danger is-light" v-else @click="signOut($store, $router)">
                        Log out
                    </a>
                </div>
            </b-navbar-item>
        </template>
        

    </b-navbar>
</template>

<script>
export default {
    name: 'TopNavBar',
    methods: {
        signOut: (s, r) => {
            s.dispatch('signOut');
            r.push('/');
        }
    }
}
</script>
