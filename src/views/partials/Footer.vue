<template>
  <section id="bottom-nav">
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'Companies' }">
            <FontAwesomeIcon icon="th-list" />
            <span>Sociétés</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'Home' }">
            <FontAwesomeIcon icon="home" />
            <span>Home</span>
          </router-link>
        </li>

        <li>
          <router-link to="/tst">
            <FontAwesomeIcon icon="home" />
            <span>Home</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
  <footer>
    <p>&copy; 2022 - Tout droits réservés</p>
    <p>Business Earns</p>
  </footer>
</template>

<script setup>import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style lang="scss">
section#bottom-nav {
  width: 100%;
  position: fixed;
  bottom: 0;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    background-color: $color-primary;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px 20px;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px; height: 64px;
        font-size: 1.4rem;

        a {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: $font-color;

          &.router-link-active {
            color: $color-primary;
            background-color: $font-color;
            border-radius: 5px;
            box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
              rgba(17, 17, 26, 0.1) 0px 16px 56px,
              rgba(17, 17, 26, 0.1) 0px 24px 80px;
          }

          & svg {
            margin: 5px;
          }

          & span {
            font-size: 0.8rem;
            margin: 5px;
          }
        }
      }
    }
  }
}

footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  margin-bottom: 70px;

  p:first-child {
    margin-top: 20px;
  }

  p {
    font-style: italic;
    font-weight: 600;
    font-size: 0.9rem;
  }
}
</style>