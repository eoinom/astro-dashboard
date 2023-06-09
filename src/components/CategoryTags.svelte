<script lang="ts">
  import Chip, { Set, Text } from '@smui/chips';
  import type { Product } from '../types/Product';

  export let products: Product[];

  let categories = products
    .map((product) => product.category)
    .filter((val, i, arr) => arr.indexOf(val) === i);

  let selected = Array.from(categories);
</script>

<h1>Categories</h1>

<Set chips={categories} let:chip filter bind:selected>
  <Chip {chip} touch>
    <Text>{chip}</Text>
  </Chip>
</Set>

