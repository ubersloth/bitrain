<template>
  <div data-app>
  <HistoryDetails />
  <v-toolbar dense>
    <v-toolbar-title>Market History</v-toolbar-title>
  </v-toolbar>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="id"
    :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
    :loading="!this.$store.state.orders.loaded"
    :must-sort="mustSort"
  >
    <template slot="items" slot-scope="props">
      <TableRow @click="showExecution(props.item)" :item="props.item" :clickable="true">
        <td><div>{{ props.item.time | formatDate }}</div></td>
        <td>{{ props.item.quantity }}</td>
        <td>{{ props.item.price | formatMoney }}</td>
      </TableRow>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import { SHOW_EXECUTION } from '@/store/actions.type'
import { fields } from '@/shared/trading'
import HistoryDetails from './HistoryDetails'
import TableRow from './TableRow'
import { mapActions } from 'vuex'

export default {
  props: {
    items: Array,
    priceSort: String,
    title: String
  },
  data () {
    return {
      mustSort: true,
      rowsPerPageItems: [30, 50, 100],
      pagination: {
        sortBy: fields.time,
        descending: true
      },
      headers: [
        { text: 'Time', value: fields.time },
        { text: 'Quantity', value: fields.quantity },
        { text: 'Price', value: fields.price }
      ]
    }
  },
  components: { HistoryDetails, TableRow },
  methods: {
    ...mapActions({
      showExecution: SHOW_EXECUTION
    })
  }
}
</script>
