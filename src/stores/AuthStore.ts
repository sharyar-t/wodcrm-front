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

  function initialize() {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("userDetails");

    if (token && user) {
      try {
        userDetails.value = JSON.parse(user);
        isAuthenticated.value = true;
      } catch (e) {
        console.error("Ошибка при парсинге userDetails", e);
        logout();
      }
    } else {
      logout();
    }
  }

  return {
    userDetails,
    isAuthenticated,
    setUser,
    logout,
    initialize,
  };
});
