<script setup lang="ts">
import { RouterView } from "vue-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="p-4">
      <AppHeader />
      <div class="py-4">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
