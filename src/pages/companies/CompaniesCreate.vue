<script setup lang="ts">
import AutoForm from "@/components/ui/auto-form/AutoForm.vue";
import Button from "@/components/ui/button/Button.vue";
import { z } from "zod";
import { useMutation } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";
import { createCompany } from "@/services/CompaniesServices.ts";

const router = useRouter();

const formSchema = z.object({
  name: z.string(),
  domain: z.string(),
  address: z.string(),
  phone: z.string(),
  subscriptionStartDate: z.coerce.date(),
  subscriptionEndDate: z.coerce.date(),
  active: z.boolean().default(true),
});

const { mutateAsync: create } = useMutation({
  mutationFn: (values: z.infer<typeof formSchema>) => createCompany(values),
  onSuccess: () => {
    toast.success("Company created successfully");
    router.push("/companies");
  },
});

const handleSubmit = (values: z.infer<typeof formSchema>) => {
  create(values);
};
</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Company create</h1>
    <AutoForm class="w-2/3 space-y-6" :schema="formSchema" @submit="handleSubmit">
      <Button type="submit">Create</Button>
    </AutoForm>
  </div>
</template>
