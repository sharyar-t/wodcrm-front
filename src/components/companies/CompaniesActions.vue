<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PhDotsThree } from "@phosphor-icons/vue";
import type { Company } from "@/types.ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteCompany } from "@/services/CompaniesServices.ts";
import { useRouter } from "vue-router";

interface DataTableRowActionsProps {
  row: Row<Company>;
}

const props = defineProps<DataTableRowActionsProps>();
const queryClient = useQueryClient();
const router = useRouter();

const { mutate } = useMutation({
  mutationFn: (id: number) => deleteCompany(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["companies"] });
  },
});

function confirmDelete() {
  mutate(props.row.original.id);
}

function goToEdit() {
  router.push({
    name: "CompaniesUpdate",
    params: {
      id: props.row.original.id,
    },
  });
}
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="data-[state=open]:bg-muted flex h-8 w-8 p-0">
          <PhDotsThree :size="32" weight="bold" />
          <span class="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem @click="goToEdit">Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DialogTrigger as-child>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently delete this file from
            our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="destructive" @click="confirmDelete">Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DropdownMenu>
  </Dialog>
</template>
