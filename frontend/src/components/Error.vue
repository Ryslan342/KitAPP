<template>
  <div class="ion-page">
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text >Произошла ошибка {{ error }}</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <router-link to="/">
              <ion-button expand="block">Главная</ion-button>
            </router-link>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" v-on:click="$router.back()">Назад</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script>
    import header from './Header.vue'

    export default {
        name: "NotFound",
        props: ["error"],
        components: {
            "v-header": header
        }
    }
</script>