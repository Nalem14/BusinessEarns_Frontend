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
import { useRouter } from 'vue-router';
import { mapActions } from '../lib';
import { handleErrorMessage } from '../mixins/Helper.mixin.js';

const router = useRouter();
const { create } = mapActions("user");
const props = defineProps({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String
});

async function onSubmitRegisterForm() {
    try {
        if(props.password !== props.confirmPassword)
            throw new Error("Les mots de passe ne correspondent pas !");
        if(props.password.length < 8)
            throw new Error("Veuillez indiquer un mot de passe d'au moins 8 caractères de longeur.")
        if(props.firstName.length < 3)
            throw new Error("Veuillez indiquer un prénom d'au moins 3 caractères de longueur.")
        if(props.lastName.length < 3)
            throw new Error("Veuillez indiquer un nom d'au moins 3 caractères de longueur.")

        await create({ firstName: props.firstName, lastName: props.lastName, email: props.email, password: props.password });

        Toast.show({
            text: "Compte créé, connctez-vous à l'aide de vos identifiants !"
        });
        router.push({ name: "Login" })
    }catch(error) {
        const errorMessage = handleErrorMessage(error);
        console.log(errorMessage);
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