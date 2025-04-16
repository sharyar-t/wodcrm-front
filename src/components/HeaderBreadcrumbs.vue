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
    if (typeof route.meta.breadcrumbs === "function") {
      return route.meta.breadcrumbs(route);
    }
    return route.meta.breadcrumbs;
  } else {
    return [];
  }
});
</script>

<template>
  <Breadcrumb v-if="routeBreadcrumbs.length > 0">
    <BreadcrumbList>
      <BreadcrumbItem v-for="item in routeBreadcrumbs" :key="item.label">
        <BreadcrumbLink as-child>
          <RouterLink :to="item.to">{{ item.label }}</RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
