import {getDatabase, push, ref, update} from "firebase/database";

const db = getDatabase();

export default {
    actions: {
        async createRecord({dispatch, commit, getters}, record) {
            try {
                const uid = getters.uid
                const recordRes = await push(ref(db, 'users/' + uid + '/records'), record)
                const payload = {
                    name: recordRes.key,
                    record: record
                }
                commit('addRecord', payload)

                let newBill = getters.info.bill

                if (record['type'] === 'income') {
                    newBill += +record['amount']
                }
                else if (record['type'] === 'outcome') {
                    newBill = newBill - record['amount']
                }
                await update(ref(db, 'users/' + uid), {bill: newBill})

                commit('updateBill', newBill)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}