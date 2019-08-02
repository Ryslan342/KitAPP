<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title v-on:click="$emit('headerClick')">{{ header }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <slot></slot>
    </ion-card-content>
  </ion-card>
</template>

<script>
    export  default {
        name: "v-card",
        props: ["header"]
    }
</script>