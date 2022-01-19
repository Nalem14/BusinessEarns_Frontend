<template>
    <section>
        <h2>Entrez vos identifants</h2>

        <form action="POST" @submit.prevent="onSubmitLoginForm">
            <div>
                <label for="email">Votre e-mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    minlength="3"
                    required
                    autofocus
                />
            </div>

            <div>
                <label for="password">Votre mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    minlength="8"
                    required
                />
            </div>

            <div>
                <router-link :to="{ name: 'Register' }" class="btn btn--info">Nous rejoindre</router-link>
                <button type="submit" class="btn">Connexion</button>
            </div>
        </form>

        <p>
            Pas encore de compte ?
            <router-link :to="{ name: 'Register' }">Inscrivez-vous</router-link> sans attendre !
        </p>
    </section>
</template>

<script setup>
import { Toast } from '@capacitor/toast';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mapActions, mapGetters, mapState } from '../lib';
import { handleErrorMessage } from '../mixins/Helper.mixin.js';

const { login, authenticate, logout } = mapActions("user");
const { hasToken, isAuthenticated } = mapGetters("user");
const { _token } = mapState("user");
const route = useRoute();
const router = useRouter();

const email = ref();
const password = ref();

redirectIfLoggedin();
watch(() => isAuthenticated, () => {
    redirectIfLoggedin();
});


async function redirectIfLoggedin() {
    if (isAuthenticated.value) {
        router.push({ name: "Home" })
        console.log("isAuth", isAuthenticated.value)
        return;
    }

    const isTokenValid = await hasToken.value;
    const token = await _token.value;

    if (isTokenValid) {
        authenticate(token).then(() => {
             Toast.show({
                text: "Vous êtes déjà connecté, Bienvenue sur votre espace ! "
            });

            if(route.query.redirect && route.query.redirect.length > 0)
                router.push(route.query.redirect);
            else 
                router.push({ name: "Home" });
        })
        .catch((err) => {
            console.error(err)
            logout()
        })
    }
}

async function onSubmitLoginForm() {
    try {
        await login({ email: email.value, password: password.value });
        Toast.show({
            text: "Connexion réussi, Bienvenue sur votre espace ! "
        });

        setTimeout(() => {
            router.push({ name: "Home" })
        }, 500);
    } catch (error) {
        const errorMessage = handleErrorMessage(error);
        console.log(error);
        Toast.show({
            text: "Erreur : " + errorMessage
        });
    }
}
</script>

<style lang="scss" scoped>
section {
    form {
        div {
            display: flex;
            flex-direction: column;

            &:last-child {
                flex-direction: row;
                justify-content: space-between;
            }
        }
    }

    > p {
        margin-top: 40px;
        text-align: center;
    }
}
</style>