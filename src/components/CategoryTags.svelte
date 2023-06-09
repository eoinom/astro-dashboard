<script lang="ts">
  import Chip, { Set, Text } from '@smui/chips';
  import type { Product } from '../types/Product';
  import { hiddenCategories } from '../state';

  export let products: Product[];

  let categories = products
    .map((product) => product.category)
    .filter((val, i, arr) => arr.indexOf(val) === i);

  let selected = Array.from(categories);

  function updateSelection() {
    hiddenCategories.set(
      categories.filter((category) => !selected.includes(category))
    );
  }
</script>

<h1>Categories</h1>

<Set 
  chips={categories} 
  let:chip 
  filter 
  bind:selected
  on:click={updateSelection}
>
  <Chip {chip} touch>
    <Text>{chip}</Text>
  </Chip>
</Set>

