<template>
    <header>
        <div>
            <h1>{{ PageTitle }}</h1>
            <small>{{ PageDesc }}</small>
        </div>

        <div>
            <figure>
                <router-link :to="{ name: 'Profile' }">
                    <vue-gravatar :email="user.email" :size="48" />
                </router-link>
            </figure>
        </div>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from '../../lib';

const PageTitle = ref();
const PageDesc = ref();
const route = useRoute();
const { user } = mapGetters("user");

watch(() => route.name, () => {
    definePageTitleDesc(route);
})

definePageTitleDesc(route);
async function definePageTitleDesc(_route) {
    PageTitle.value = _route.meta.title ?? "NaN";
    PageDesc.value = _route.meta.description ?? "";
}

</script>


<style lang="scss">
@import "../../assets/scss/base/_reset.scss";
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,400;0,600;0,700;1,100;1,400;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap');

html, body {
    font-family: 'Raleway', 'Roboto', sans-serif;
    color: $font-color;
    max-width: 800px;
    margin: 0 auto;
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
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;

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
    min-height: 80vh;

    section {
        margin-top: 40px;

        h2 {
            margin-bottom: 40px;
        }
    }
}

label {
    font-weight: 600;
}

input {
    &[type=text], &[type=password], &[type=email] {
        display: flex;
        height: 28px;
        width: 100%;
        margin-bottom: 15px;
        margin-top: 5px;
        border: none;
        border-radius: 10px;
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

    }
}
</style>
