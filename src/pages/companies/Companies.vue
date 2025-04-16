<script setup lang="ts">
import api from "@/api";
import Button from "@/components/ui/button/Button.vue";
import { PhPlusCircle } from "@phosphor-icons/vue";
import { useQuery } from "@tanstack/vue-query";

const result = useQuery({ queryKey: ["todos"], queryFn: () => api.get("/api/companies") });

console.log(result);
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Companies</h1>
      <Button as-child>
        <RouterLink to="/companies/create">
          <PhPlusCircle class="mr-1 size-4" />
          Create
        </RouterLink>
      </Button>
    </div>
  </div>
</template>
