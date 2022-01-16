<template>
  <section>
    <h2>
      Liste de vos sociétés
      <button type="button" class="btn btn--success" @click="onCreateCompany">
        <FontAwesomeIcon icon="plus-square" />
      </button>
    </h2>

    <CompanyListItem v-for="item in companies" v-bind="item" :key="item.id" />
  </section>
</template>

<script setup>
import { LocalNotifications } from "@capacitor/local-notifications";
import { Toast } from "@capacitor/toast";
import { Dialog } from '@capacitor/dialog';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapState } from "../lib";
import CompanyListItem from "../components/CompanyListItem.vue";
import { handleErrorMessage } from "../mixins/Helper.mixin";

const { createCompany, fetchCompanies } = mapActions("company");
const { companies } = mapState("company");

requestNotificationPermission();
fetchCompanies();

async function onCreateCompany() {
  const { value, cancelled } = await Dialog.prompt({
    title: 'Créer une société',
    message: `Quel est le nom de votre société ?`,
  });

  if(cancelled)
    return;

  try {
    await createCompany(value);
    await fetchCompanies();

    Toast.show({
      text: 'Votre société as bien été ajoutée !',
    });
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    Toast.show({
      text: 'Erreur lors de la création de la société : ' + errorMessage,
    });
  }
}
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