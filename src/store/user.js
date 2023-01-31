import fb from '@/fb'
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {getDatabase, ref, set, child, get, update} from "firebase/database";
import router from "@/router/router";

const auth = getAuth();
const db = getDatabase();

export default {
    state: {
        uid: '',
        info: {}
    },
    mutations: {
        setUid(state, uid){
          state.uid = uid
        },
        clearUid(state) {
          state.uid = ''
        },
        setInfo(state, info){
          state.info = info
        },
        clearInfo(state) {
          state.info = {}
        },
        addCategory(state, payload){
            if (state.info.categories) {
                state.info.categories[payload['name']] = payload['category']
            }
            else {
                state.info.categories = {}
                state.info.categories[payload['name']] = payload['category']
            }
        },
        updateCategory(state, formDate){
            state.info.categories[formDate['id']]['title'] = formDate['title']
            state.info.categories[formDate['id']]['limit'] = formDate['limit']
        },
        deleteCategoryFromState(state, idx) {
            delete state.info.categories[idx]
        },
        addRecord(state, payload){
            if (state.info.records) {
                state.info.records[payload['name']] = payload['record']
            }
            else {
                state.info.records = {}
                state.info.records[payload['name']] = payload['record']
            }
        },
        deleteRecordFromState(state, idx) {
            delete state.info.records[idx]
        },
        updateBill(state, newBill) {
            state.info.bill = newBill
        },
        updateUsername(state, username) {
            state.info.username = username
        },
        updateLocale(state, locale) {
            state.info.locale = locale
        }
    },
    actions: {
        async checkStatusAndSetData({commit}) {
            await onAuthStateChanged(auth, async (user) => {
              if (user) {
                const uid = user.uid;
                commit('setUid', uid)
                await get(child(ref(db), 'users/' + uid))
                  .then(async (snapshot) => {
                      if (snapshot.exists()) {
                          commit('setInfo', snapshot.val())
                      } else {
                          commit('clearInfo')
                          commit('clearUid')
                          await router.push('/login?message=loginAtFirst')
                      }
                  })
                  .catch((e) => {
                    console.error(e);
                  });
              } else {
                  commit('clearInfo')
                  commit('clearUid')
                  await router.push('/login?message=loginAtFirst')
              }
            });
        },
        async login({dispatch, commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({commit}) {
            try {
                await signOut(auth)
                commit('clearInfo')
                commit('clearUid')
            } catch (e){
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit},{email, password, name}) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch('getUid')
                await set(ref(db, 'users/' + uid), {
                    bill: 100000,
                    username: name,
                    locale: 'ru-RU'
                });
            } catch (e){
                commit('setError', e)
                throw e
            }
        },
        async updateUsername({commit, getters}, username) {
            try {
                await update(ref(db, 'users/' + getters.uid), {username: username})
                commit('updateUsername', username)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateLocale({commit, getters}, locale) {
            try {
                await update(ref(db, 'users/' + getters.uid), {locale: locale})
                commit('updateLocale', locale)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = auth.currentUser;
            return user.uid
        }
    },
    getters: {
        uid: s => s.uid,
        info: s => s.info,
        categories(state) {
            if (state.info['categories']) {
                return Object.keys(state.info['categories'])
                    .map(key => ({...state.info['categories'][key], id: key}))
            }
            else {
                return {}
            }
        },
        records(state) {
            if (state.info['records']) {
                return Object.keys(state.info['records'])
                    .map(key => ({...state.info['records'][key], id: key}))
            }
            else {
                return {}
            }
        }
    }
}
