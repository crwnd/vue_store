import { ref, computed, watch } from "vue";
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false);
    const sessions = ref([]);
    const name = ref("...");
    const currentSessionID = ref(-1);

    async function SignIn(submitEvent) {
        let email = submitEvent.target.elements.email.value;
        let pass = submitEvent.target.elements.pass.value;
        let json = await (
            await fetch("https://api.crwnd.dev/auth/signin/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    password: pass,
                    email: email,
                }),
            })
        ).json();
        console.log(json);
        if (json.code == 0) {
            isAuthenticated.value = true;
            localStorage.setItem("isAuthenticated", true);
        } else {
            alert(json.message + "\nFailing fields: " + json.errors);
        }
    }
    async function SignUp(submitEvent) {
        let email = submitEvent.target.elements.email.value;
        let pass = submitEvent.target.elements.pass.value;
        console.log(email, pass);
    }
    async function LogOut() {
        await fetch("https://api.crwnd.dev/auth/logout/", {
            method: "POST",
            credentials: "include",
        });
        isAuthenticated.value = false;
        localStorage.setItem("isAuthenticated", false);
    }

    return {
        isAuthenticated,
        sessions,
        name,
        currentSessionID,
        SignIn,
        SignUp,
        LogOut
    };
});