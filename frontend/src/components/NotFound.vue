<template>
  <div class="ion-page">
    <v-header>
      Ошибка 404
    </v-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>Данной страницы не существует</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <router-link to="/">
              <ion-button expand="block">Главная</ion-button>
            </router-link>
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
        components: {
            "v-header": header
        }
    }
</script>