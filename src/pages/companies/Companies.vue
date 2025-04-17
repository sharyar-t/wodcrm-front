<script setup lang="ts">
import { ref, h } from "vue";
import Button from "@/components/ui/button/Button.vue";
import { PhPlusCircle } from "@phosphor-icons/vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { Table, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableHeader from "@/components/ui/table/TableHeader.vue";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import CompaniesActions from "@/components/companies/CompaniesActions.vue";
import { getCompanies } from "@/services/CompaniesServices.ts";

const page = ref(0);

const { data: companies } = useQuery({
  queryKey: ["companies", page],
  queryFn: () => getCompanies(page.value),
  select: (data) => data.data.content,
  placeholderData: keepPreviousData,
});

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "domain",
    header: "Domain",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "subscriptionStartDate",
    header: "Subscription Start Date",
  },
  {
    accessorKey: "subscriptionEndDate",
    header: "Subscription End Date",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => h(CompaniesActions, { row }),
  },
];

const search = ref("");

const table = useVueTable({
  get data() {
    return companies;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  manualPagination: true,
  state: {
    get globalFilter() {
      return search.value;
    },
  },
});
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
    <div>
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="text-preset-5 text-grey-500 font-normal"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="flex items-center justify-end space-x-2 py-4">
        <div class="text-muted-foreground flex-1 text-sm">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="space-x-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
