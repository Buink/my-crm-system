import {createStore} from 'vuex'
import user from "@/store/user";
import categories from "@/store/categories";
import records from "@/store/records";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error){
      state.error = error.code
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    async getCurrencyData() {
      try {
        const userCur = ['USD', 'EUR', 'CHF']
        const userCurData = []
        const res = await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)).json()
        for (let i = 0; i < userCur.length; i++){
          const item = res.find(el => el['cc'] === userCur[i])
          userCurData.push(item)
        }
        return userCurData
      } catch (e) {
        console.log(e)
        throw e
      }

    }
  },
  modules: {
    user, categories, records
  }
})
