<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { z } from "zod";
import AutoForm from "@/components/ui/auto-form/AutoForm.vue";
import Button from "@/components/ui/button/Button.vue";
import { toast } from "vue-sonner";
import { getCompany, updateCompany } from "@/services/CompaniesServices.ts";
import { useRouteParams } from "@vueuse/router";
import { computed } from "vue";

const router = useRouter();
const companyId = useRouteParams("id", 0, { transform: Number });

const { data: companyData, isLoading } = useQuery({
  queryKey: ["company", companyId],
  queryFn: () => getCompany(companyId.value),
  select: (data) => data.data,
});

const { mutateAsync: update } = useMutation({
  mutationFn: (values: z.infer<typeof formSchema>) => updateCompany(companyId.value, values),
  onSuccess: () => {
    toast.success("Company updated successfully");
    router.push("/companies");
  },
});

const formSchema = computed(() =>
  z.object({
    id: z.number().default(companyData.value.id),
    name: z.string().default(companyData.value.name),
    domain: z.string().default(companyData.value.domain),
    address: z.string().default(companyData.value.address),
    phone: z.string().default(companyData.value.phone),
    subscriptionStartDate: z.coerce.date(new Date(companyData.value.subscriptionStartDate)),
    subscriptionEndDate: z.coerce.date(new Date(companyData.value.subscriptionEndDate)),
    active: z.boolean().default(companyData.value.active),
  })
);

const handleSubmit = (values: z.infer<typeof formSchema>) => {
  update(values);
};
</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Edit Company</h1>

    <div v-if="isLoading && !companyData">Loading...</div>

    <AutoForm v-else class="w-2/3 space-y-6" :schema="formSchema" @submit="handleSubmit">
      <Button type="submit">Update</Button>
    </AutoForm>
  </div>
</template>
