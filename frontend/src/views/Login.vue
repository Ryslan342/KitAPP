<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Вход в систему</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item v-bind:style="{ color: (error === 'NOT_FOUND_ERROR')?'red':''}">
        <ion-label position="floating">Login</ion-label>
        <ion-input v-model:value="login"
                   v-on:ionChange="login =  $event.target.value"
                   v-bind:readonly="waiting"
        ></ion-input>
      </ion-item>
      <ion-item v-bind:style="{ color: (error === 'INVALID_PASSWORD_ERROR')?'red':''}">
        <ion-label position="floating">Пароль</ion-label>
        <ion-input type="password"
                   v-model:value="password"
                   v-on:ionChange="password =  $event.target.value"
                   v-bind:readonly="waiting"
        ></ion-input>
      </ion-item>

      <ion-button expand="block" v-on:click="loginIn()">Войти</ion-button>
    </ion-content>
  </div>
</template>

<script>
    export default {
        name: "login",
        data: function () {
            return {
                waiting: false,
                error: false,

                login: "",
                password: ""
            }
        },
        methods: {
            loginIn() {
                const loginData = {
                    login: this.login,
                    password: this.password
                };

                this.waiting = true;
                this.error = null;

                return this.$ionic.loadingController.create({
                    message: 'Loading',
                    duration: this.timeout,
                }).then(waiting => {
                    waiting.present();

                    this.$http.post("sign/in", loginData).then((res) => {
                        waiting.dismiss();
                        this.$root.user = res.data;

                        this.waiting = false;

                        localStorage.setItem("Login", loginData.login);
                        localStorage.setItem("Password", loginData.password);

                        this.$router.push("/");
                    }, (err) => {
                        waiting.dismiss();
                        this.waiting = false;

                        if (!err) {
                            this.error = err.bodyText || err.status
                        } else {
                            this.error = err.status;
                        }
                        this.error = err.bodyText;
                    });
                });

            }
        }
    }
</script>