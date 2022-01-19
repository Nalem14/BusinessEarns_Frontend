<template>
    <LineChart
        v-if="statsData.labels.length > 0"
        :chartData="statsData"
        :options="options"
        :config="options"
    />
</template>

<script setup>
import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';
import { ref, watch } from "vue";
import { moment, randomColor } from '../mixins/Helper.mixin';
import { mapActions, mapGetters, mapState } from '../lib';

Chart.register(...registerables);

const { earnByDate } = mapGetters("company");
const { companies } = mapState("company");
const { fetchCompanies, fetchEarns } = mapActions("company");
const props = defineProps({
    title: {
        type: String,
        default: "Gains sur la période",
        required: false
    },
    fromDate: {
        type: [Object,String],
        default() {
            return moment().startOf("month");
        },
        required: false
    },
    toDate: {
        type: [Object,String],
        default() {
            return moment().endOf("day");
        },
        required: false
    },
    companies: {
        type: Array,
        default: [],
        required: false
    },
    earnsHistory: {
        type: Array,
        default: [],
        required: false
    },
    perType: {
        type: String,
        default: "day",
        required: false,
        validator(value) {
            // The value must match one of these strings
            return ['day', 'month', 'year'].includes(value)
        }
    }
});
const statsData = ref({
    labels: [],
    datasets: [],
});
const options = ref({
    responsive: true,
    tension: 1,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: props.title
        },
    },
});

init();
defineExpose({
    statsData
});

// Update datas on change
watch(() => props.fromDate + props.toDate + props.perType, () => {
    init();
})

async function init() {
    let myCompanies = props.companies;
    if (props.companies.length === 0) {
        await fetchCompanies(); // Ensure companies is loaded
        myCompanies = companies.value;
    }

    // Define base datas
    let from = props.fromDate;
    let to = props.toDate;

    // Ensure date is moment object
    if(moment.isMoment(from) === false)
        from = moment(from).startOf('day');
    if(moment.isMoment(to) === false)
        to = moment(to).endOf("day");

    let dateFormat = () => {
        if (props.perType === "day")
            return "DD/MM/YYYY";
        if (props.perType === "month")
            return "MM/YYYY";
        if (props.perType === "year")
            return "YYYY";
    };
    let objectData = {
        labels: [],
        datasets: [],
    }
    let numberOfKeys = to.diff(from, props.perType) + 1;
    let dateWorking = moment(from);


    // Prepare objective data
    let objectiveData = {
        data: [],
        label: "Objectif",
        backgroundColor: randomColor(),
        tension: 0.3,
        showLine: true
    };
    // Create all needed fields for objective
    for (let j = 0; j < numberOfKeys; j++)
        objectiveData.data[j] = 0;


    for (let i = 0; i < numberOfKeys; i++) {
        // Set labels 
        let label = dateWorking.format(dateFormat()).toString();
        objectData.labels.push(label);
        dateWorking = dateWorking.add(1, props.perType);
    }


    // Prepare average data
    let averageData = {
        data: [],
        label: "Moyenne",
        backgroundColor: randomColor(),
        tension: 0.3,
        showLine: true
    };
    for (let j = 0; j < numberOfKeys; j++)
        averageData.data[j] = 0;

    // tmp average data
    let tmpAverage = {
        amounts: [],
        counts: []
    };
    for (let j = 0; j < numberOfKeys; j++) {
        tmpAverage.amounts[j] = 0;
        tmpAverage.counts[j] = 0;
    }

    // Get data for each companies
    myCompanies.forEach(async (company, companyIndex) => {

        // Create per company object
        if (objectData.datasets[companyIndex] === undefined) {
            objectData.datasets[companyIndex] = {
                data: [],
                label: company.name,
                backgroundColor: randomColor(),
                tension: 0.3,
                showLine: true
            };
        }

        // Set company objective data
        objectData.labels.forEach((label, index) => {
            let objective = company.dailyObjective; // Is in month. TODO:: Rename db field

            // Calculate objective about perType prop
            if(props.perType === "day")
                objective /= 30;
            else if(props.perType === "year")
                objective *= 12;

            objectiveData.data[index] = objective;
        })

        // Create all needed fields per labels with default value
        for (let j = 0; j < numberOfKeys; j++)
            objectData.datasets[companyIndex].data[j] = 0;

        // Get all company earns
        const companyEarns = props.earnsHistory.length > 0 ? props.earnsHistory : await fetchEarns(company.id);
        const groupedEarns = earnByDate.value(from, to, companyEarns, true); // Get earns by date from this company

        // For each earn entry, construct the ObjectData
        for (let index = 0; index < groupedEarns.length; index++) {
            const earn = groupedEarns[index];
            earn.amount = parseFloat(earn.amount.toString()); // Ensure is float value
            const date = moment(earn.createdAt).format(dateFormat()).toString();

            // Get corresponding label key
            const key = objectData.labels.indexOf(date);
            objectData.datasets[companyIndex].data[key] += earn.amount || 0;

            // Add tmp average
            tmpAverage.amounts[key] += earn.amount || 0;
            tmpAverage.counts[key]++;
        }


        // If each companies is looped, set the statsData to our temporary objectData constructed
        if (companyIndex === myCompanies.length - 1) {

            // Define total average per period type
            for(let k = 0; k < tmpAverage.counts.length; k++) {
                let currAvg = tmpAverage.amounts[k];
                let count = tmpAverage.counts[k];
                let avg = currAvg / count;

                if(isNaN(avg))
                    avg = 0;

                averageData.data[k] = avg;
            }
            objectData.datasets.push(averageData)

            // Add objective data
            objectData.datasets.push(objectiveData)

            // Set all stats datas
            statsData.value = objectData;
        }
    })
}
</script>