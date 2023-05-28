import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
    state: () => ({ isLoading: true, lastUpdate: -1, content: [], cacheTime: 5 * 60 }),
    getters: { mainPageCategories: (state) => state.content.slice(0, 5), },
    actions: {
        init() {
            let cachedCatalogJSON = localStorage.getItem("catalogObj");
            if (cachedCatalogJSON === undefined || cachedCatalogJSON === null) return this.refreshCatalog();

            let cachedCatalogObj = undefined;
            try {
                cachedCatalogObj = JSON.parse(cachedCatalogJSON);
                if (cachedCatalogObj.lastUpdate + cacheTime < Math.floor(Date.now() / 1000)) throw "catalog is too old";
            } catch (e) { return this.refreshCatalog() };

            this.isLoading = false;
            this.lastUpdate = cachedCatalogObj.lastUpdate;
            this.content = cachedCatalogObj.content;

        },
        async refreshCatalog() {
            let json = await (
                await fetch("https://api.crwnd.dev/api/catalog/?" + new URLSearchParams({ icons: "svg", }))
            ).json();
            if (json.code == 0) {
                this.isLoading = false;
                this.lastUpdate = Math.floor(Date.now() / 1000);
                this.content = json.content;
                localStorage.setItem("catalogObj", JSON.stringify({ lastUpdate: this.lastUpdate, content: this.content, }));
            }
        }
    }
});