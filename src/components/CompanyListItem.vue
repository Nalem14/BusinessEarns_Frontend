<template>
    <article>
        <div>
            <h3>{{ name }}</h3>
            <div>
                <ul>
                    <li>
                        Objectif /mois
                        <span>{{ dailyObjective ?? 0 }}€</span>
                    </li>
                    <li>
                        Ce mois-ci
                        <span v-if="earns !== null">{{ earnThisMonth(earns) }}€</span>
                    </li>
                    <li>
                        Le mois dernier
                        <span v-if="earns !== null">{{ earnLastMonth(earns) }}€</span>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <router-link :to="{ name: 'CompanyEarns', params: { id: id } }" class="btn">
                <FontAwesomeIcon icon="plus-square" />Revenu
            </router-link>
            <router-link :to="{ name: 'CompanyStats', params: { id: id } }" class="btn">
                <FontAwesomeIcon icon="chart-line" />Stats
            </router-link>
            <router-link :to="{ name: 'Company', params: { id: id } }" class="btn">
                <FontAwesomeIcon icon="edit" />Modifier
            </router-link>
        </div>
    </article>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, onMounted } from 'vue';
import { mapActions, mapGetters } from '../lib';

const { fetchEarns } = mapActions("company");
const { earnThisMonth, earnLastMonth } = mapGetters("company");
const earns = ref(null);
const props = defineProps({
    id: Number,
    name: String,
    dailyObjective: Number,
    createdAt: String,
    updatedAt: String,
    userId: Number
});

onMounted(() => {
    initDatas();
})

async function initDatas() {
    earns.value = await fetchEarns(props.id);
}
</script>

<style lang="scss">
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
                    font-weight: 100;
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
</style>