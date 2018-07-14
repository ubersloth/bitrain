<template>
  <v-layout row justify-center v-if="item">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <!-- v-btn slot="activator" color="primary" dark>Open Dialog</v-btn -->
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="hide()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Market History Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="hide()">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Buy side</v-list-tile-title>
              <v-list-tile-sub-title>Buy {{ item.buyOrder.originalQty }} units for {{ item.buyOrder.price | formatMoney }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Sell side</v-list-tile-title>
              <v-list-tile-sub-title>Sell {{ item.sellOrder.originalQty }} units for {{ item.sellOrder.price | formatMoney }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Time</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.time | formatDate }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Exchange price</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.price | formatMoney }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Amount executed</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.quantity }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Transaction size</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.price * item.quantity | formatMoney }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { HIDE_EXECUTION } from '@/store/actions.type'

export default {
  computed: mapState({
    dialog: state => state.orders.historyDialog,
    item: state => state.orders.historyItem
  }),
  data () {
    return {
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  methods: {
    ...mapActions({
      hide: HIDE_EXECUTION
    })
  }
}
</script>
