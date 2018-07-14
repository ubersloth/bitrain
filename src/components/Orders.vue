<template>
  <div orders-list>
    <v-toolbar dense>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :loading="!this.$store.state.orders.loaded"
      :must-sort="mustSort"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <TableRow :item="props.item">
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.price | formatMoney }}</td>
        </TableRow>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import TableRow from './TableRow'

export default {
  props: {
    items: Array,
    priceSort: String,
    title: String
  },
  data () {
    return {
      rowsPerPageItems: [20, 50, 100],
      mustSort: true,
      pagination: {
        sortBy: 'price',
        descending: this.priceSort === 'descending'
      },
      headers: [
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'price' }
      ]
    }
  },
  components: { TableRow }
}
</script>
