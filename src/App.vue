<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "@/components/ui/sonner";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <RouterView />
  <Toaster position="top-center" :rich-colors="true" />
  <VueQueryDevtools />
</template>
