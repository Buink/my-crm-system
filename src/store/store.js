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
      const userCur = ['USD', 'EUR', 'CHF']
      const userCurData = []
      await (await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)).json()
        .then( (result) => {
          for (let i = 0; i < userCur.length; i++){
            const item = result.find(el => el['cc'] === userCur[i])
            userCurData.push(item)
          }
        })
        .catch( (e) => {
          throw e
        });
      return userCurData
    }
  },
  modules: {
    user, categories, records
  }
})
