<template>
    <section>
        <h2>
            {{ company.name }}
            <button type="button" class="btn btn--success" @click="onAddAmount">
                <FontAwesomeIcon icon="plus-square" />
            </button>
        </h2>

        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Montant</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="earn in earns" :key="earn.id">
                    <CompanyEarnItem v-bind="earn" @edit-earn="onEditAmount" @delete-earn="onDeleteAmount" />
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { mapActions } from '../lib';
import CompanyEarnItem from '../components/CompanyEarnItem.vue';
import { Dialog } from '@capacitor/dialog';


const { fetchEarns, getCompany, createEarn, updateEarn, deleteEarn } = mapActions("company");
const earns = ref([]);
const route = useRoute();
const company = ref({
    name: ""
});

initDatas();

async function initDatas() {
    company.value = await getCompany(route.params.id);
    earns.value = await fetchEarns(route.params.id);
    earns.value.reverse()
}
async function onAddAmount() {
    const { value, cancelled } = await Dialog.prompt({
        title: 'Ajouter un revenu',
        message: `Quel est le montant du revenu ?`,
    });

    if (cancelled)
        return;

    const response = await createEarn({ companyId: route.params.id, amount: value });
    earns.value = [response.data, ...earns.value];
}
async function onEditAmount(id) {
    const { value, cancelled } = await Dialog.prompt({
        title: 'Modifier un revenu',
        message: `Quel est le montant du revenu ?`,
    });

    if (cancelled)
        return;

    await updateEarn({ companyId: route.params.id, earnId: id, amount: value });
    earns.value = earns.value.map(e => {
        if(e.id === id) {
            e.amount = value
        }

        return e;
    })
}
async function onDeleteAmount(id) {
    const { value } = await Dialog.confirm({
        title: 'Supprimer un revenu',
        message: `Voulez-vous vraiment supprimer ce revenu ?`,
    });

    if (!value)
        return;

    await deleteEarn({ companyId: route.params.id, earnId: id });
    earns.value = earns.value.filter(e => e.id !== id);
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