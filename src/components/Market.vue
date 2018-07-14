<template>
  <div>
    <div class="row" v-if="!loaded">
      <div class="col" />
      <img class="col-xs-1 mt-5" :src="require('@/assets/throbber.gif')">
      <div class="col" />
    </div>
    <div v-else class="row p-3">
    <data-tables :data="getSells" :pagination-props="{ pageSizes: [10, 20, 30] }"
      :pageSize="20" :tableProps="sellProps" :sort-method="sortMethod" class="col-sm-6 border-left border-top border-bottom border-secondary rounded-left p-3">

      <el-row slot="tool">
        <el-col>
          <p class="navbar navbar-light bg-light border border-secondary rounded">Sell Orders</p>
        </el-col>
      </el-row>

      <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom" :sort-orders="['ascending', 'descending']">
      </el-table-column>
    </data-tables>
    <data-tables :data="getBuys" :pagination-props="{ pageSizes: [10, 20, 30] }"
      :pageSize="20" :tableProps="buyProps" :sort-method="sortMethod" class="col-sm-6 border border-secondary rounded-right p-3">

      <el-row slot="tool">
        <el-col>
          <p class="navbar navbar-light bg-light border border-secondary rounded">Buy Orders</p>
        </el-col>
      </el-row>

      <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom" :sort-orders="['ascending', 'descending']">
      </el-table-column>
    </data-tables>
    </div>
    <data-tables :data="executions" :pagination-props="{ pageSizes: [30, 90, 150] }"
      :pageSize="30" :tableProps="matchProps" :sort-method="sortMethod" class="border border-secondary rounded p-3">

      <el-row slot="tool">
        <el-col>
          <p class="navbar navbar-light bg-light border border-secondary rounded">Market History</p>
        </el-col>
      </el-row>

      <el-table-column v-for="title in matchTitles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom" :sort-orders="['ascending', 'descending']">
      </el-table-column>
    </data-tables>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { GET_ORDERS } from '@/store/actions.type'
import { sortingFunctions } from '@/shared/tools'
import { fields } from '@/shared/trading'

export default {
  data () {
    return {
      errors: [],
      titles: [
        { prop: fields.type, label: 'Type' },
        { prop: fields.quantity, label: 'Quantity' },
        { prop: fields.price, label: 'Price' }
      ],
      matchTitles: [
        { prop: fields.time, label: 'Time' },
        { prop: fields.quantity, label: 'Quantity' },
        { prop: fields.price, label: 'Price' }
      ],
      buyProps: {
        defaultSort: {
          prop: fields.price,
          order: 'descending'
        }
      },
      sellProps: {
        defaultSort: {
          prop: fields.price,
          order: 'ascending'
        }
      },
      matchProps: {
        defaultSort: {
          prop: fields.time,
          order: 'descending'
        }
      },
      sortMethod: {
        [fields.price]: sortingFunctions.numeric,
        [fields.time]: sortingFunctions.time
      }
    }
  },
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
  }
}
</script>
