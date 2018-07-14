<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex d-flex>
        <v-card>
          <Orders title="Buys" :items="getBuys" priceSort="descending" />
        </v-card>
      </v-flex>
      <v-flex d-flex>
        <v-card>
          <Orders title="Sells" :items="getSells" />
        </v-card>
      </v-flex>
      <v-flex d-flex>
        <v-card>
          <History :items="executions" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { GET_ORDERS } from '@/store/actions.type'
import Orders from './Orders'
import History from './History'

export default {
  computed: {
    ...mapGetters([
      'getBuys', 'getSells'
    ]),
    ...mapState({
      loaded: state => state.orders.loaded,
      executions: state => state.orders.executions
    })
  },
  methods: mapActions({
    getOrders: GET_ORDERS
  }),
  created () {
    this.getOrders()
  },
  components: { Orders, History }
}
</script>
