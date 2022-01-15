<template>
    <header>

        <div>
            <h1>{{ PageTitle }}</h1>
            <small>L'essentiel est là !</small>
        </div>

        <div>
            <figure>
                <router-link to="">
                    <img src="https://via.placeholder.com/48" alt="Profil">
                </router-link>
            </figure>
        </div>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const PageTitle = ref("PageTitle");
const route = useRoute();

watch(() => route.name, () => {
    definePageTitle();
});

definePageTitle();
function definePageTitle() {
    PageTitle.value = route.meta.title ?? "NaN";
}

</script>


<style lang="scss">
@import "../../assets/scss/base/_reset.scss";
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,400;0,600;0,700;1,100;1,400;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap');

html, body {
    font-family: 'Raleway', 'Roboto', sans-serif;
    color: $font-color;
}

a {
    transition: color .2s ease-in-out;
    color: $link-color;
    text-decoration: none;

    &:hover, &:active {
        transition: color .4s ease-in-out;
        color: $color-secondary;
    }
}

h1 {
    font-size: 1.6rem;
    font-weight: 700;
}

h2 {
    font-size: 1.4rem;
    font-weight: 600;
}

h3 {
    font-size: 1.2rem;
    font-weight: 400;
}

.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $color-primary;
    border-radius: 5px;
    background-color: $color-primary;
    color: $font-color;
    padding: 8px 12px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    opacity: 1;
    transition: color .2s ease-in-out;
    transition: box-shadow .2s ease-in-out;
    cursor: pointer;

    &:hover, &:active {
        border: 1px solid darken($color-primary, 5);
        color: $font-color;
        opacity: .9;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        transition: all .4s ease-in-out;
    }

    &--secondary {
        border: 1px solid $color-secondary;
        background-color: $color-secondary;
        color: $font-color;

        &:hover, &:active {
            border: 1px solid darken($color-secondary, 5);
            color: $font-color;
        }
    }

    &--success {
        border: 1px solid $color-success;
        background-color: $color-success;
        color: $color-primary;

        &:hover, &:active {
            border: 1px solid darken($color-success, 5);
            color: $color-primary;
        }
    }

    &--danger {
        border: 1px solid $color-danger;
        background-color: $color-danger;
        color: $color-primary;

        &:hover, &:active {
            border: 1px solid darken($color-danger, 5);
            color: $color-primary;
        }
    }

    &--warning {
        border: 1px solid $color-warning;
        background-color: $color-warning;
        color: $color-primary;

        &:hover, &:active {
            border: 1px solid darken($color-warning, 5);
            color: $color-primary;
        }
    }

    &--info {
        border: 1px solid $color-info;
        background-color: $color-info;
        color: $color-primary;

        &:hover, &:active {
            border: 1px solid darken($color-info, 5);
            color: $color-primary;
        }
    }
}

header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px;

    h1 {
        display: flex;
    }

    small {
        display: flex;
        margin-top: 5px;
        font-size: 1rem;
        color: $color-secondary;
    }

    figure {
        a {
            img {
                width: 48px;
                height: 48px;
                border-radius: 48px;
                transition: box-shadow .2s ease-in-out;
                box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

                &:hover, &:active {
                    transition: box-shadow .4s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }
            }
        }
    }
}

main {
    margin: 20px;
    min-height: 100vh;

    section {
        margin-top: 40px;

        h2 {
            margin-bottom: 40px;
        }
    }
}
</style>
