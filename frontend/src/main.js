import Vue from 'vue'
import App from './App.vue'
import router from './router'
import resource from 'vue-resource'
import axios from 'axios'

import '@ionic/core/css/ionic.bundle.css';
import './plugins/ionic.js'
Vue.config.productionTip = false


const apiURL= "http://localhost:8083/";
Vue.use(resource);
Vue.http.options.root = apiURL;

Vue.http.interceptors.push(function(request) {
    request.url = apiURL + request.url;
    request.headers.set("Auth-Login", localStorage.getItem("Login"));
    request.headers.set("Auth-Password", localStorage.getItem("Password"));

    return () => {};
});

window.vue = new Vue({
    router,
    render: h => h(App),
    data: {
        user: null
    },
    created() {
        this.checkLoginAndUpdateUserData();
    },
    methods: {
        checkLoginAndUpdateUserData() {
            this.$http.get("sign/user").then((res) => {
                this.$root.user = res.data;
            }, (err) => {
                if (!err) {
                    return 0;
                }

                if (err.status === 401) {
                    return this.$router.push("/login");
                } else {
                    this.$router.push("/login");
                }
            });
        }
    }
}).$mount('#app')
