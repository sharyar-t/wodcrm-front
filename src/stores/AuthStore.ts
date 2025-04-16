// stores/userStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const userDetails = ref(null);
  const isAuthenticated = ref(false);

  function setUser(details: any, token: string) {
    userDetails.value = details;
    isAuthenticated.value = true;

    // сохраняем отдельно
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userDetails", JSON.stringify(details));
  }

  function logout() {
    userDetails.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
  }

  return {
    userDetails,
    isAuthenticated,
    setUser,
    logout,
  };
});
