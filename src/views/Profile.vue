<template>
    <section>
        <h2>Modifier mes informations</h2>

        <form action="POST" @submit.prevent="onSubmitEditUser">
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
                <button type="submit" class="btn">Modifier mes infos</button>
            </div>
        </form>

        <h2>Modifier mon mot de passe</h2>
        <form action="POST" @submit.prevent="onSubmitEditPassword">
            <div>
                <label for="password">Votre mot de passe</label>
                <input type="password" name="password" id="password" v-model="password" minlength="8" required>
            </div>

            <div>
                <label for="confirm_password">Confirmez le mot de passe</label>
                <input type="password" name="confirm_password" id="confirm_password" v-model="confirmPassword" minlength="8" required>
            </div>

            <div>
                <button type="submit" class="btn">Modifier mon mot de passe</button>
            </div>
        </form>

        <h2>Supprimer mon compte</h2>
        <p>Attention:: Toute vos données seront également supprimées définitivement de notre plateforme.</p>
        <form action="POST" @submit.prevent="onSubmitDeleteAccount">
            <div>
                <button type="submit" class="btn btn--danger">Supprimer mon compte et toute les données associées</button>
            </div>
        </form>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { mapActions, mapGetters } from '../lib';
import { handleErrorMessage } from '../mixins/Helper.mixin';
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast';
import { useRouter } from 'vue-router';

const { user } = mapGetters("user");
const { axios } = mapGetters("axios");
const { logout } = mapActions("user");
const { updateData, fetchSetData } = mapActions("user");
const router = useRouter();

let firstName = ref(user.value.firstName);
let lastName = ref(user.value.lastName);
let email = ref(user.value.email);
let password = ref(), confirmPassword = ref();

async function onSubmitEditUser() {
    try {
        if(firstName.value.length < 3)
            throw new Error("Veuillez indiquer un prénom d'au moins 3 caractères de longueur.")
        if(lastName.value.length < 3)
            throw new Error("Veuillez indiquer un nom d'au moins 3 caractères de longueur.")

        await updateData({ firstName: firstName.value, lastName: lastName.value, email: email.value });
        await fetchSetData();

        Toast.show({
            text: "Informations modifiées."
        });
    }catch(error) {
        const errorMessage = handleErrorMessage(error);
        Toast.show({
            text: "Erreur : " + errorMessage
        });
    }
}

async function onSubmitEditPassword() {
    try {
        console.log(password.value, confirmPassword.value)
        if(password.value !== confirmPassword.value)
            throw new Error("Les mots de passe ne correspondent pas !");
        if(password.value.length < 8)
            throw new Error("Veuillez indiquer un mot de passe d'au moins 8 caractères de longeur.")

        await updateData({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value });
        password.value = ""; confirmPassword.value = "";

        Toast.show({
            text: "Mot de passe modifié."
        });
    }catch(error) {
        password.value = ""; confirmPassword.value = "";
        const errorMessage = handleErrorMessage(error);
        Toast.show({
            text: "Erreur : " + errorMessage
        });
    }
}

async function onSubmitDeleteAccount() {
    try {
        const { value } = await Dialog.confirm({
            title: 'Supprimer mes données',
            message: `Êtes-vous sûr de vouloir supprimer toute vos données ?`,
        });

        if(!value)
            return;

        await axios.value.delete("/users/" + user.value.id);
        await logout();

        Toast.show({
            text: "Votre compte et toutes les données associées viennent d'être supprimées."
        });
        router.push({ name: "Login" });

    }catch(error) {
        const errorMessage = handleErrorMessage(error);
        Toast.show({
            text: "Erreur : " + errorMessage
        });
    }
}

</script>

<style lang="scss" scoped>
section {
    form {
        margin-bottom: 40px;

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