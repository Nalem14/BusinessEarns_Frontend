<template>
  <section>
    <h2>
      Liste de vos sociétés
      <button type="button" class="btn btn--success">
        <FontAwesomeIcon icon="plus-square" />
      </button>
    </h2>

    <article>
      <div>
        <h3>Ma compagnie</h3>
        <div>
          <ul>
            <li>Objectif <span>300€</span></li>
            <li>Ce mois-ci <span>150€</span></li>
            <li>Le mois dernier <span>150€</span></li>
          </ul>
        </div>
      </div>

      <div>
        <router-link to class="btn">
          <FontAwesomeIcon icon="plus-square" />
          Revenu
        </router-link>
        <router-link to class="btn">
          <FontAwesomeIcon icon="chart-line" />
          Stats
        </router-link>
        <router-link to class="btn">
          <FontAwesomeIcon icon="edit" />
          Modifier
        </router-link>
      </div>
    </article>
  </section>
</template>

<script setup>
import { LocalNotifications } from "@capacitor/local-notifications";
import { Toast } from "@capacitor/toast";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Toast.show({
  text: 'Hello!',
});

checkNotificationScheduled();
async function checkNotificationScheduled() {
  const pendings = await LocalNotifications.getPending();
  const perms = await LocalNotifications.checkPermissions();
  if (perms.display === "prompt") {
    setTimeout(() => {
      LocalNotifications.requestPermissions().then(status => {
        if (status.display !== 'granted') {
          throw new Error('User denied permissions!');
        }
      })
    }, 3500)
  }

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

  article {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: $color-primary;
    border-radius: 15px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    margin-bottom: 20px;

    h3 {
      display: flex;
      margin-bottom: 10px;
      flex-basis: 100%;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        width: 40%;
        border-bottom: 2px solid lighten($color-secondary, 15);
      }
    }

    & > div {
      display: flex;
      flex-direction: column;
      margin: 10px;
    }

    & > div:first-child {
      flex: 8;

      & > div {
        ul {
          li {
            display: flex;
            justify-content: space-between;
            font-size: 1rem;
          }
        }
      }
    }

    & > div:last-child {
      margin: 0;
      flex: 4;
      flex-direction: column;
      justify-content: space-between;

      .btn {
        display: flex;
        flex-basis: 100%;
        border-radius: 0;
        padding: 0;
        min-height: 32px;
        box-shadow: rgba(17, 17, 26, 0.1) -1px 0px 0px;
        justify-content: flex-start;

        svg {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>