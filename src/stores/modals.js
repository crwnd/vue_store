import { ref } from "vue";
import { defineStore } from 'pinia';

export const useModalsStore = defineStore('modals', () => {
    const openedModal = ref(undefined);

    function closeModals() {
        openedModal.value = undefined;
    }

    return {
        openedModal,
        closeModals
    };
});