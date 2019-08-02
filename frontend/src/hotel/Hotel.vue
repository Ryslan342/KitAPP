<template>
  <div class="ion-page">
    <v-header>
      {{ ((hotel)?hotel.name:"") }}
    </v-header>

    <router-view v-bind:hotel="hotel" v-if="hotel"></router-view>
  </div>
</template>

<script>
    import card from '../components/Card.vue';
    import header from '../components/Header.vue';

    export  default {
        name: "hotel",

        data: function () {
            return {
                waiting: false,
                error: false,

                hotel: null,
            }
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.waiting = true;
                this.error = null;
                this.$http.get("/hotels/" + this.id).then((res) => {
                    this.waiting = false;
                    this.hotel = res.data;
                }, (err) => {
                    this.waiting = false;
                    this.error = err.status;
                });
            }
        },
        props: ["id"],
        components: {
            "v-card": card,
            "v-header": header,
        }
    }
</script>
