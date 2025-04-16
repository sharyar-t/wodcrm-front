<script setup lang="ts">
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs.vue";
import UserDropdown from "@/components/UserDropdown.vue";
</script>

<template>
  <header class="flex h-12 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <HeaderBreadcrumbs />
    <div class="ml-auto">
      <UserDropdown />
    </div>
  </header>
</template>
