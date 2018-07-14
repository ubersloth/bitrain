import { GET_ORDERS, SHOW_EXECUTION, HIDE_EXECUTION } from '@/store/actions.type'
import { RECEIVE_ORDERS, DISPLAY_EXECUTION, DISMISS_EXECUTION } from '@/store/mutations.type'
import { OrdersService } from '@/api/api.service'
import { BUY } from '@/shared/trading'
import Heap from 'heap'

const state = {
  buys: new Heap((a, b) => b.price - a.price),
  sells: new Heap((a, b) => a.price - b.price),
  executions: [],
  top: 0,
  historyDialog: false,
  historyItem: undefined,
  loaded: false
}

const actions = {
  [GET_ORDERS] ({ commit, dispatch, state }) {
    OrdersService.query({ start: state.top, size: 5 }).then(response => {
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

const mutations = {
  [RECEIVE_ORDERS] (state, orders) {
    let buyHeap = state.buys
    let sellHeap = state.sells

    for (let order of orders) {
      if (order.type === BUY) {
        buyHeap.push({ ...order, time: new Date() })
      } else {
        sellHeap.push({ ...order, time: new Date() })
      }
    }

    while (buyHeap.top() && sellHeap.top() && buyHeap.top().price >= sellHeap.top().price) {
      let buyOrder = buyHeap.pop()
      let sellOrder = sellHeap.pop()
      let quantity = Math.min(buyOrder.quantity, sellOrder.quantity)
      let price = (buyOrder.price + sellOrder.price) / 2

      let buyCopy = { ...buyOrder, originalQty: buyOrder.quantity }
      let sellCopy = { ...sellOrder, originalQty: sellOrder.quantity }

      if (quantity < buyOrder.quantity) {
        buyOrder.quantity -= quantity
        buyHeap.push(buyOrder)
      } else if (quantity < sellOrder.quantity) {
        sellOrder.quantity -= quantity
        sellHeap.push(sellOrder)
      }

      state.executions.push({ id: execId++, quantity: quantity, price: price, time: new Date(), buyOrder: buyCopy, sellOrder: sellCopy })
    }

    state.executions = state.executions.slice(-500)

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
    return state.buys.nodes.slice(0, 500)
  },
  getSells (state) {
    return state.sells.nodes.slice(0, 500)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
