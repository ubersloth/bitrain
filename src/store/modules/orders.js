import { GET_ORDERS } from '@/store/actions.type'
import { RECEIVE_ORDERS } from '@/store/mutations.type'
import { capitalize } from '../../shared/tools'
import { OrdersService } from '@/api/api.service'
import Heap from 'heap'

const state = {
  buys: new Heap((a, b) => b.price - a.price),
  sells: new Heap((a, b) => a.price - b.price),
  executions: [],
  top: 0,
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
  }
}

const mutations = {
  [RECEIVE_ORDERS] (state, orders) {
    let buyHeap = state.buys
    let sellHeap = state.sells

    for (let order of orders) {
      if (order.type === 'buy') {
        buyHeap.push(order)
      } else {
        sellHeap.push(order)
      }
    }

    while (buyHeap.top() && sellHeap.top() && buyHeap.top().price >= sellHeap.top().price) {
      let buyOrder = buyHeap.pop()
      let sellOrder = sellHeap.pop()
      let quantity = Math.min(buyOrder.quantity, sellOrder.quantity)
      let price = (buyOrder.price + sellOrder.price) / 2

      let buyCopy = { ...buyOrder }
      let sellCopy = { ...sellOrder }

      if (quantity < buyOrder.quantity) {
        buyOrder.quantity -= quantity
        buyHeap.push(buyOrder)
      } else if (quantity < sellOrder.quantity) {
        sellOrder.quantity -= quantity
        sellHeap.push(sellOrder)
      }

      state.executions.push({ quantity: quantity, price: price, time: new Date().toLocaleString(), buyOrder: buyCopy, sellOrder: sellCopy })
    }

    state.executions = state.executions.slice(-500)

    state.top += orders.length
    state.loaded = true
  }
}

const getters = {
  getBuys (state) {
    return state.buys.nodes.slice(0, 500).map(order => [{ ...order, type: capitalize(order.type) }][0])
  },
  getSells (state) {
    return state.sells.nodes.slice(0, 500).map(order => [{ ...order, type: capitalize(order.type) }][0])
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
