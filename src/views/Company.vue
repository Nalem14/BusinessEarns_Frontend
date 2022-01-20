<template>
    <section>
        <h2>
            {{ company.name }}
            <button type="button" class="btn btn--danger" @click="onDeleteCompany">
                <FontAwesomeIcon icon="trash-alt" />
            </button>
        </h2>

        <form action="POST" @submit.prevent="onUpdateCompany">
            <div>
                <label for="name">Nom de la société</label>
                <input type="text" name="name" id="name" minlength="3" v-model="companyName" required>
            </div>

            <div>
                <label for="objective">Objectif mensuel</label>
                <input type="text" name="objective" id="objective" v-model="companyObjective" required>
            </div>

            <div>
                <button type="submit" class="btn">Modifier les infos</button>
            </div>
        </form>
    </section>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mapActions } from '../lib';
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast';


const { getCompany, updateCompany, deleteCompany } = mapActions("company");
const route = useRoute();
const router = useRouter();
const company = ref({
    name: "",
    objective: 0
});

const companyName = ref();
const companyObjective = ref();

initDatas();

async function initDatas() {
    company.value = await getCompany(route.params.id);
    companyName.value = company.value.name;
    companyObjective.value = company.value.dailyObjective;
}
async function onUpdateCompany() {
    if(companyName.value.length < 3) {
        Toast.show({
            text: "Veuillez indiquer un nom d'au moins 3 caractères de longueur."
        });
        return;
    }
    
    await updateCompany({ 
        id: route.params.id,
        name: companyName.value,
        objective: companyObjective.value
    });

    company.value = await getCompany(route.params.id);

    Toast.show({
        text: "Société modifiée."
    });
}
async function onDeleteCompany() {
    const { value } = await Dialog.confirm({
        title: 'Supprimer la société ?',
        message: `Confirmer la suppression ? Toute les données seront définitivement supprimées !`,
    });

    if (!value)
        return;

    await deleteCompany(route.params.id);
    router.push({ name: "Home" });
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