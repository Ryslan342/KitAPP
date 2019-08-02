<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>
        <slot></slot>
      </ion-title>
    </ion-toolbar>
    <ion-toolbar v-if="$root.user">
      <ion-label>{{ $root.user.fullname.surname }} {{ $root.user.fullname.name}}</ion-label>
      <ion-lable slot="end">{{ $root.user.balance }}$</ion-lable>
    </ion-toolbar>
  </ion-header>
</template>