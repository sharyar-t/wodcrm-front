<script setup lang="ts">
import { useRoute } from "vue-router";
import { PhArrowFatLinesLeft, PhArrowsDownUp, PhTipJar } from "@phosphor-icons/vue";
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const links = [
  {
    to: { name: "Dashboard" },
    label: "Dashboard",
    icon: PhArrowsDownUp,
  },
  {
    to: { name: "Companies" },
    label: "Companies",
    icon: PhTipJar,
  },
];

const route = useRoute();
const { toggleSidebar } = useSidebar();
</script>

<template>
  <Sidebar class="rounded-lg">
    <SidebarHeader class="px-8 py-4 pr-6">
      <div class="text-2xl font-medium">wod CRM</div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="link in links" :key="link.label">
            <SidebarMenuButton as-child :is-active="link.to.name === route.name">
              <RouterLink :to="link.to">
                <component :is="link.icon" :size="48" />
                {{ link.label }}
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @click="toggleSidebar">
            <PhArrowFatLinesLeft />
            Minimize Sidebar
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
