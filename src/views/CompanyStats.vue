<template>
    <section>
        <h2>Statistiques global</h2>

        <form action="POST" @submit.prevent>
            <div>
                <button type="button" @click="exportToCsv" class="btn btn--success">Exporter au format CSV</button>
            </div>

            <div>
                <select name="perType" id="perType" class="btn btn--secondary" @change="changeType">
                    <option value="day">Grouper par jour</option>
                    <option value="month">Grouper par mois</option>
                    <option value="year">Grouper par année</option>
                </select>
            </div>

            <div>
                <label for="fromDate">Date à partir de</label>
                <input type="date" name="fromDate" id="fromDate" v-model="fromDate" />
            </div>

            <div>
                <label for="toDate">Date jusqu'au</label>
                <input type="date" name="toDate" id="toDate" v-model="toDate" />
            </div>
        </form>

        <EarnsLineChartVue
            v-if="company !== null"
            :perType="perType"
            :fromDate="fromDate"
            :toDate="toDate"
            :companies="[company]"
            ref="statsRef"
        />
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import EarnsLineChartVue from "../components/EarnsLineChart.vue";
import { mapActions } from "../lib";
import { moment } from "../mixins/Helper.mixin";
import { json2csv, json2csvAsync } from 'json-2-csv';

const { getCompany } = mapActions("company");
const route = useRoute();
const perType = ref("day");
const statsRef = ref();
const fromDate = ref(moment().subtract(7, "day").format("YYYY-MM-DD"));
const toDate = ref(moment().endOf("day").format("YYYY-MM-DD"));
const company = ref(null);

onMounted(async () => {
    company.value = await getCompany(route.params.id);
});

function changeType(e) {
    perType.value = e.target.value;
}
async function exportToCsv() {
    let document = [];
    for(let i = 0; i < statsRef.value.statsData.datasets.length; i++) {
        const data = statsRef.value.statsData.datasets[i];

        let tmp = {
            society: data.label,
        };

        for(let j = 0; j < statsRef.value.statsData.labels.length; j++) {
            const label = statsRef.value.statsData.labels[j];
            tmp[label] = data.data[j];
        }

        document.push(tmp);
    }

    const csv = await json2csvAsync(document);

    var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    window.open(encodedUri);
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

        & div {
            display: flex;
            flex-direction: column;

            .btn {
                margin-bottom: 15px;
            }
        }
    }
}
</style>