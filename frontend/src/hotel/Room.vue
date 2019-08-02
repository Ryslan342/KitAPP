<template>
  <ion-content>
    <v-card v-bind:header="'Номер ' + room.number" v-if="room && !error">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              {{ room.description }}
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text>Статус</ion-text>
          </ion-col>
          <ion-col>
            <ion-text color="success" v-if="room.free">Свободен</ion-text>
            <ion-text color="danger" v-else>Занят</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Цена
          </ion-col>
          <ion-col>
            <ion-text v-if="$root.user.balance >= room.price">{{ room.price }}</ion-text>
            <ion-text v-else color="danger">{{ room.price }}</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button v-if="$root.user.balance >= room.price && room.free"
                        expand="block"
                        size="small"
                        v-on:click="orderRoom"
            >
              Бронировать
            </ion-button>
            <ion-button v-else
                        expand="block"
                        color="danger"
                        v-on:click="displayErrorOrder"
            >
              Бронировать
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </v-card>

    <v-error v-if="error">
      {{ error }}
    </v-error>
  </ion-content>
</template>

<script>
    import card from '../components/Card.vue'
    import error from "../components/Error.vue";
    import axios from 'axios'

    export default {
        name: "room",
        data() {
            return {
                error: null,

                room: null
            }
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.error = null;
                this.waiting = true;
                this.$http.get(`hotels/${ this.hotel._id }/rooms/${ this.roomId }`).then((res) => {
                    this.waiting = false;
                    this.room = res.data;
                }, (err) => {
                    this.waiting = false;
                    this.error = err.bodyText || err.status || " ";
                });
            },
            displayErrorOrder() {
                this.$ionic.alertController.create({
                    header: 'Ошибка',
                    message: 'Невозможно забронировать номер',
                    buttons: ['OK'],
                }).then(a => a.present());
            },
            displaySuccessfulOrder() {
                this.$ionic.alertController.create({
                    header: 'Уведомление',
                    message: 'Номер успешно забронирован',
                    buttons: ['OK'],
                }).then(a => a.present());
            },
            orderRoom() {
                this.$ionic.loadingController.create({
                    message: 'Loading',
                    duration: this.timeout,
                }).then((waiting) => {
                    waiting.present();
                    this.$http.post(`hotels/${ this.hotel._id }/rooms/${ this.room._id }/order`, {}).then((res) => {
                        waiting.dismiss();
                        this.room.free = false;
                        this.displaySuccessfulOrder();
                        this.$root.checkLoginAndUpdateUserData();
                    }, (err) => {
                        waiting.dismiss();
                        this.displayErrorOrder();
                    });
                });
            }
        },
        props: ["roomId", "hotel"],
        components: {
            "v-card": card,
            "v-error": error
        }
    }
</script>