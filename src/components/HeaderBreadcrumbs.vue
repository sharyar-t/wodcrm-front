<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
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
      <template v-for="(item, index) in routeBreadcrumbs" :key="item.name">
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <RouterLink :to="item.path">{{ item.name }}</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index !== routeBreadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
