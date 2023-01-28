<template>
  <div>
    <div class="page-title">
      <h2>{{ $filters.localeFilter('recordsHistory') }}</h2>
    </div>


    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <p class="center" v-if="!records.length">{{ $filters.localeFilter('noRecords') }}.<router-link to="/record"> {{ $filters.localeFilter('addRecord') }}</router-link></p>

    <section v-else>
      <HistoryTable :records="items"/>
      <paginate
            v-model="page"
            class="center"
            :page-count="pageCount"
            :click-handler="pageChangeHandler"
            :prev-text="$filters.localeFilter('Prev')"
            :next-text="$filters.localeFilter('Next')"
            container-class="pagination"
            page-class="waves-effect"
      >
      </paginate>
    </section>

  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import Paginate from "vuejs-paginate-next";
import paginationMixin from "@/mixins/pagination_mixin";
import { Pie } from 'vue-chartjs'
import uppercaseFirstLetter from "@/filters/uppercaseFirstLetter_filter";

export default {
  name: 'HistoryView',
  extends: Pie,
  components: {
    HistoryTable, Paginate
  },
  mixins: [paginationMixin],
  data: () => ({
    records: [],
  }),
  mounted() {
    document.title = this.$route.meta.title
    this.records = this.$store.getters.records

    if (this.records[0]){
      this.setup()
    }
  },
  methods: {
    setup(){
      const categories = this.$store.getters.categories

      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type
        }
      }))

      this.renderChart({
        labels: categories.map(c => uppercaseFirstLetter(c.title)),
        datasets: [{
          label: 'График расходов по категориям',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]})
    }
  }
}

</script>

<style scoped lang="scss">

.history-chart{
  max-width:600px;
  margin:0 auto
}

</style>
