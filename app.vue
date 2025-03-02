<template>
  <div class="bg-black">
    <Nsitegateway v-if="data.gateway" />
    <Nsitehex v-if="data.singlesite" />
  </div>
</template>
<script setup>

import data from "~/config/project";

</script>

<style>
body {
  background-color: black;
  color: white;
}
</style>