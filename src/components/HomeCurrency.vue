<template>
  <div class="col s12 m12 l8">
    <div class="card currency-rate">
      <h3 class="currency-rate__h">{{ $filters.localeFilter('ExchangeRates')}}</h3>

      <table class="curr-table">
        <thead>
          <tr>
            <th>{{ $filters.localeFilter('Currency')}}</th>
            <th>{{ $filters.localeFilter('Exchange')}}</th>
            <th>{{ $filters.localeFilter('Date')}}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(cur, i) of this.currencies" :key="i" class="curr-table-line">
            <td>{{ cur['cc'] }}</td>
            <td>{{ cur['rate'] }}</td>
            <td>{{ cur['exchangedate'] }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: {
    currencies: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.currency-rate{
  background: $currency-background;
  color: $currency-color;
  border-radius: 5px;
  padding: 10px 20px;

  &__h{
    font-size: 26px;
    margin-top: 5px;
  }

  .curr-table{
    margin-top: 20px;
    border-collapse: collapse;
    tr {
      padding: 10px;
      border-bottom: 1pt solid $currency-color;
    }
    td {
      padding: 10px 0;
    }
  }
}

</style>
