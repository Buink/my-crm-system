<template>
  <div>
    <div class="page-title">
      <h2>{{ $filters.localeFilter('Menu_Planning') }}</h2>
      <h2>{{ $filters.currencyFilter(this.$store.getters.info.bill, 'UAH') }}</h2>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories || !categories.length">{{ $filters.localeFilter('noCategories') }}.
      <router-link to="/categories">{{ $filters.localeFilter('addCategory') }}</router-link>
    </p>

    <section v-else>

      <div v-for="cat of this.categories" :key="cat.id" class="cat-line">
        <p class="cat-line-p">
          <strong>{{ $filters.uppercaseFirstLetter(cat.title) }}:  </strong>
          {{ $filters.currencyFilter(cat.spend, 'UAH') }} {{ $filters.localeFilter('Of') }}
          {{ $filters.currencyFilter(cat.limit, 'UAH') }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
              style="height: 100px"
          ></div>
        </div>
      </div>

    </section>


  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import currencyFilter from "@/filters/currency_filter";
import localeFilter from "@/filters/locale_filter";

export default {
  name: 'PlanningView',
  components: {
    Loader
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  mounted() {
    document.title = this.$route.meta.title
    const categories = this.$store.getters.categories
    const records = this.$store.getters.records

    if (categories.length){
      this.categories = categories.map(cat => {
        if (records.length){
          const spend = records
              .filter(r => r.categoryId === cat.id)
              .filter(r => r.type === 'outcome')
              .reduce((total, record) => {
                return total + +record.amount
              }, 0)

          const percent = (100 * spend / cat.limit)
          const progressPercent = percent > 100 ? 100 : percent
          const progressColor = percent < 60
              ? 'green'
              : percent < 100
                  ? 'yellow' : 'red'

          const tooltipValue = cat.limit - spend
          const tooltip = `${tooltipValue < 0 ? localeFilter('Exceeding') : localeFilter('Left')}
          ${currencyFilter(Math.abs(tooltipValue), 'UAH')}`

          return {
            ...cat,
            progressPercent,
            progressColor,
            spend,
            tooltip
          }
        }
        else {
          const tooltipValue = cat.limit
          const tooltip = `${tooltipValue < 0 ? 'Превышение на': 'Осталось'} ${currencyFilter(Math.abs(tooltipValue), 'UAH')}`
          return {
            ...cat,
            'progressPercent' : 0,
            'progressColor': 'green',
            'spend': 0,
            tooltip
          }
        }
      })
    }


    this.loading = false
  }
}

</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.cat-line{
  padding: 10px 0;

  &-p{
    color: $regular-text-color;
  }
}

</style>
