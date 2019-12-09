import * as indexApi from './service'

export default {
    namespace: 'index',
    state: {
        goodList:[]
    },

    effects: {
        * goods_web_search({payload}, {call, put}) {
            try {
                const {status, result} = yield call(indexApi.goods_web_search, payload)
                if (status == 'ok') {
                }
            } catch (e) {

            }
        },
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload}
        },
    },

}
