<template>
  <section>
    <h2>Statistiques global</h2>

    <EarnsLineChartVue title="Gains sur les 7 dernier jours (/jour)" perType="day" :fromDate="moment().subtract(7, 'day')" />
    <EarnsLineChartVue title="Gains sur les 12 derniers mois (/mois)" perType="month" :fromDate="moment().subtract(12, 'month')" />
  </section>
</template>

<script setup>
import { LocalNotifications } from "@capacitor/local-notifications";
import { Toast } from "@capacitor/toast";
import { Dialog } from '@capacitor/dialog';
import EarnsLineChartVue from "../components/EarnsLineChart.vue";
import { moment } from "../mixins/Helper.mixin";

requestNotificationPermission();

async function requestNotificationPermission() {
  const perms = await LocalNotifications.checkPermissions();
  if (perms.display !== "prompt")
    return;

  const wantNotification = await Dialog.confirm({
    title: 'Me notifier',
    message: `Voulez-vous recevoir une notification de rappel chaque jour afin d'ajouter vos gains ?`,
  });

  if (!wantNotification.value)
    return;

  const status = await LocalNotifications.requestPermissions();
  if (status.display !== 'granted') {
    throw new Error('User denied permissions!');
  } else {
    await checkNotificationScheduled();
    Toast.show({
      text: 'Merci ! Nous vous rappellerons chaque jour d\'ajouter vos gains.',
    });
  }
}
async function checkNotificationScheduled() {
  const pendings = await LocalNotifications.getPending();
  console.log("PENDING NOTIF", pendings);

  if (pendings.notifications.length === 0) {
    LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: "Test",
          body: "Ma notif de texte",
          schedule: {
            every: "day",
            count: 1,
            repeats: true,
            allowWhileIdle: true
          },
          ongoing: true,
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
section {
  h2 {
    display: flex;
    justify-content: space-between;
    position: relative;

    button {
      position: absolute;
      right: 0;
      top: -0.4rem;
      font-size: 1.4rem;
    }
  }
}
</style>