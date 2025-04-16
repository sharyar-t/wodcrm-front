<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <RouterLink to="/dashboard">Dashboard</RouterLink> |
    <RouterLink to="/companies">Companies</RouterLink>
    <RouterView />
  </div>
</template>
