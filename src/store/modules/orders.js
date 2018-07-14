import { GET_ORDERS, SHOW_EXECUTION, HIDE_EXECUTION } from '@/store/actions.type'
import { RECEIVE_ORDERS, DISPLAY_EXECUTION, DISMISS_EXECUTION } from '@/store/mutations.type'
import { OrdersService } from '@/api/api.service'
import { BUY } from '@/shared/trading'
import SortedArray from 'collections/sorted-array'

const state = {
  buys: [],
  sells: [],
  executions: [],
  top: 0,
  historyDialog: false,
  historyItem: undefined,
  loaded: false
}

let fetchSize = 200

const actions = {
  [GET_ORDERS] ({ commit, dispatch, state }) {
    OrdersService.query({ start: state.top, size: fetchSize }).then(response => {
      fetchSize = 10
      if (response && response.data) {
        commit(RECEIVE_ORDERS, response.data)
        setTimeout(dispatch.bind(undefined, GET_ORDERS), 1500)
      }
    })
  },
  [SHOW_EXECUTION] ({ commit }, payload) {
    commit(DISPLAY_EXECUTION, payload)
  },
  [HIDE_EXECUTION] ({ commit }) {
    commit(DISMISS_EXECUTION)
  }
}

let execId = 0
const compareByPrice = (a, b) => a.price === b.price
const priceAscending = (a, b) => a.price - b.price
const priceDescending = (a, b) => b.price - a.price

const mutations = {
  [RECEIVE_ORDERS] (state, orders) {
    let buySorted = new SortedArray(state.buys.slice(0), compareByPrice, priceAscending)
    let sellSorted = new SortedArray(state.sells.slice(0), compareByPrice, priceDescending)

    for (let order of orders) {
      let array = order.type === BUY ? buySorted : sellSorted
      array.push({ ...order, time: new Date() })
    }

    let mutation = state.executions.slice(-500)

    while (buySorted.length && sellSorted.length && buySorted.max().price >= sellSorted.max().price) {
      let buyOrder = buySorted.pop()
      let sellOrder = sellSorted.pop()

      let execution = {
        id: execId++,
        quantity: Math.min(buyOrder.quantity, sellOrder.quantity),
        price: (buyOrder.price + sellOrder.price) / 2,
        time: new Date(),
        buyOrder: { ...buyOrder, originalQty: buyOrder.quantity },
        sellOrder: { ...sellOrder, originalQty: sellOrder.quantity }
      }

      mutation.push(execution)

      if (execution.quantity < buyOrder.quantity) {
        buySorted.push({ ...buyOrder, quantity: buyOrder.quantity - execution.quantity, time: new Date() })
      } else if (execution.quantity < sellOrder.quantity) {
        sellSorted.push({ ...sellOrder, quantity: sellOrder.quantity - execution.quantity, time: new Date() })
      }
    }

    mutation = mutation.slice(-500)
    state.executions = mutation
    state.buys = buySorted.array
    state.sells = sellSorted.array
    state.top += orders.length
    state.loaded = true
  },
  [DISPLAY_EXECUTION] (state, item) {
    state.historyDialog = true
    state.historyItem = item
  },
  [DISMISS_EXECUTION] (state) {
    state.historyDialog = false
  }
}

const getters = {
  getBuys (state) {
    return state.buys.slice(-500)
  },
  getSells (state) {
    return state.sells.slice(-500)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
