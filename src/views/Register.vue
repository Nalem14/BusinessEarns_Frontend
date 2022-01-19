<template>
    <section>
        <h2>Remplissez les champs</h2>

        <form action="POST" @submit.prevent="onSubmitRegisterForm">
            <div>
                <label for="firstName">Votre prénom</label>
                <input type="text" name="firstName" id="firstName" v-model="firstName" minlength="3" required autofocus>
            </div>

            <div>
                <label for="lastName">Votre nom</label>
                <input type="text" name="lastName" id="lastName" v-model="lastName" minlength="3" required>
            </div>

            <div>
                <label for="email">Votre e-mail</label>
                <input type="email" name="email" id="email" v-model="email" minlength="3" required>
            </div>

            <div>
                <label for="password">Votre mot de passe</label>
                <input type="password" name="password" id="password" v-model="password" minlength="8" required>
            </div>

            <div>
                <label for="confirm_password">Confirmez le mot de passe</label>
                <input type="password" name="confirm_password" id="confirm_password" v-model="confirmPassword" minlength="8" required>
            </div>

            <div>
                <router-link :to='{ name: "Login" }' class="btn btn--info">Retour</router-link>
                <button type="submit" class="btn">Créer mon compte</button>
            </div>
        </form>

        <p>Déjà inscrit ? <router-link :to='{ name: "Login" }'>Connectez-vous</router-link> pour accéder à l'application.</p>
    </section>
</template>

<script setup>
import { Toast } from '@capacitor/toast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mapActions } from '../lib';
import { handleErrorMessage } from '../mixins/Helper.mixin.js';

const router = useRouter();
const { create } = mapActions("user");
const firstName = ref();
const lastName = ref();
const email = ref();
const password = ref();
const confirmPassword = ref();

async function onSubmitRegisterForm() {
    try {
        if(password.value !== confirmPassword.value)
            throw new Error("Les mots de passe ne correspondent pas !");

        await create({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value });

        Toast.show({
            text: "Compte créé, connectez-vous à l'aide de vos identifiants !"
        });
        router.push({ name: "Login" })
    }catch(error) {
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