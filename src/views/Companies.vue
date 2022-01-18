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
import { Toast } from "@capacitor/toast";
import { Dialog } from '@capacitor/dialog';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapActions, mapState } from "../lib";
import CompanyListItem from "../components/CompanyListItem.vue";
import { handleErrorMessage } from "../mixins/Helper.mixin";

const { createCompany, fetchCompanies } = mapActions("company");
const { companies } = mapState("company");

if(companies.value.length === 0)
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