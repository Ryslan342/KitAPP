<template>
  <div class="ion-page">
    <v-header v-if="!error">
      Отели ({{ hotels.length }});
    </v-header>

    <ion-content class="ion-padding" v-if="!error">
      <v-card v-for="(hotel, index) of hotels"
              v-on:headerClick="$router.push('/hotels/' + hotel._id)"
              v-bind:header="hotel.name"
      >
        {{ hotel.description }}
      </v-card>
    </ion-content>

    <v-error v-if="error">
      {{ error }}
    </v-error>
  </div>
</template>

<script>
    import card from '../components/Card.vue'
    import header from '../components/Header.vue'
    import error from "../components/Error.vue";

    export default {
        name: "home",
        data: function () {
            return {
                waiting: false,
                error: false,

                hotels: []
            };
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.waiting = true;
                this.error = null;

                this.waiting = true;
                this.$http.get("/hotels/").then((res) => {
                    this.waiting = false;
                    this.hotels = res.data;
                }, (err) => {
                    this.waiting = false;
                    this.error = err.bodyText || err.status || " ";
                });
            }
        },
        components: {
            "v-card": card,
            "v-header": header,
            "v-error": error
        }
    };
</script>