export const usePublicStore = defineStore('public', {
  state: () => ({
    customTabSelected: 0,
  }),
  actions: {
    setCustomTabSelected(index) {
      this.customTabSelected = index
    },
  },
  getters: {
  }
})
