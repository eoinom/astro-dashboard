<script setup lang="ts">
import { hiddenCategories } from "../state";
import type { Product } from "../types/Product"
import { useStore } from '@nanostores/vue';


type Props = {
    products: Product[];
}

const { products } = defineProps<Props>();
const $hiddenCategories = useStore(hiddenCategories);
</script>


<template>
    <h1>Overview</h1>

    <v-container>
    <v-row dense>
        <v-col cols="12">
        <v-card>
            <v-card-text>
            <div>Total stock</div>
            <p class="text-h4 text--primary">
                <!-- Calculating stock with the value from store -->
                {{
                products
                    .filter(
                    (product) => !$hiddenCategories.includes(product.category),
                    )
                    .reduce((acc, curr) => acc + curr.stock, 0)
                }}
            </p>
            </v-card-text>
        </v-card>
        </v-col>

        <v-col cols="12">
        <v-card>
            <v-card-text>
            <div>Total brands</div>
            <p class="text-h4 text--primary">
                <!-- Calculating brand amount with the value from store -->
                {{
                products
                    .filter(
                    (product) => !$hiddenCategories.includes(product.category),
                    )
                    .filter((product, i, array) => array.indexOf(product) === i)
                    .length
                }}
            </p>
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>
    </v-container>
</template>
