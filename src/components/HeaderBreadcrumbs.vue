<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { RouterLink } from "vue-router";

const route = useRoute();

const routeBreadcrumbs = computed(() => {
  if ("breadcrumbs" in route.meta && route.meta.breadcrumbs && route.meta.breadcrumbs.length > 0) {
    return route.meta.breadcrumbs;
  }
  return [];
});
</script>

<template>
  <Breadcrumb v-if="routeBreadcrumbs.length > 0">
    <BreadcrumbList>
      <BreadcrumbItem v-for="item in routeBreadcrumbs" :key="item.name">
        <BreadcrumbLink as-child>
          <RouterLink :to="item.path">{{ item.name }}</RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
