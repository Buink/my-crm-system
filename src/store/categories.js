import {getDatabase, ref, push, update, remove} from "firebase/database";

const db = getDatabase();

export default {
  actions: {
    async createCategory({commit, dispatch, getters }, {title, limit}){
      try {
        const uid = getters.uid
        const category = {
          title: title,
          limit: limit
        }
        const categoryRes = await push(ref(db, 'users/' + uid + '/categories'), category);
        const payload = {
          category: category,
          name: categoryRes.key
        }
        commit('addCategory', payload)
        return { title, limit, id: categoryRes.key }
      } catch (e){
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch, getters }, formData){
      const uid = getters.uid
      await update(ref(db, 'users/' + uid + '/categories/' + formData['id']), {
        limit: formData['limit'],
        title: formData['title'],
      })
          .then(() => {
            commit('updateCategory', formData)
          })
          .catch((e) => {
            throw e
          })
    },
    async deleteCategory({commit, getters }, idx) {
      const uid = getters.uid
      const records = getters.records.filter(el => el.categoryId === idx)

      if (records.length){
        for (let i = 0; i < records.length; i++) {
          await remove(ref(db, 'users/' + uid + '/records/' + records[i]['id']))
              .then(() => {
                commit('deleteRecordFromState', records[i]['id'])
              })
              .catch((e) => {
                throw e
              })
        }
      }

      await remove(ref(db, 'users/' + uid + '/categories/' + idx))
          .then(() => {
            commit('deleteCategoryFromState', idx)
          })
          .catch((e) => {
            throw e
          })
    }
  }
}
