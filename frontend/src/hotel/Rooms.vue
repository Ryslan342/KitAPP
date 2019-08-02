<template>
  <ion-content>
    <v-card v-for="room of rooms" v-if="!error"
            v-bind:header="`Номер ${ room.number }`"
            v-on:headerClick="$router.push(`/hotels/${ hotel._id }/room/${ room._id }`)"
    >
        {{ room.description }}
    </v-card>

    <v-error v-if="error">
      {{ error }}
    </v-error>
  </ion-content>
</template>

<script>
    import card from '../components/Card.vue'
    import error from "../components/Error.vue";

    export default {
        name: "rooms",
        data() {
            return {
                waiting: false,
                error: null,

                rooms: []
            };
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.waiting = true;
                this.error = null;
                this.$http.get(`/hotels/${ this.hotel._id }/rooms/`).then((res) => {
                    this.waiting = false;
                    this.rooms = res.data;
                }, (err) => {
                    this.waiting = false;
                    this.error = err.bodyText || err.status || " ";
                });
            }
        },
        props: ["hotel"],
        components: {
            "v-card": card,
            "v-error": error
        }
    }
</script>