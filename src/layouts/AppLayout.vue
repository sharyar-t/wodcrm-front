<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-muted flex min-h-svh w-full flex-col">
    <RouterLink to="/dashboard">Dashboard</RouterLink> |
    <RouterLink to="/companies">Companies</RouterLink>
    <RouterView />
  </div>
</template>
