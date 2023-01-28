<template>
  <div class="col s12 m12 l4">
    <div class="card currency-in-val">
      <h3 class="currency-in-val__h">{{ $filters.localeFilter('CurrencyAccount') }}</h3>

      <div class="currency-in-val__currencies">
        <p class="currency-in-val__currencies-item" v-for="(cur, i) of this.currencies" :key="i">
          {{ $filters.currencyFilter((this.$store.getters.info.bill / cur['rate']), cur['cc']) }}
        </p>
      </div>

      </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",
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

.currency-in-val{
  background: $bill-background;
  color: $bill-color;
  border-radius: 5px;
  padding: 10px 20px;

  &__h{
    font-size: 26px;
  }

  &__currencies{
    margin-top: 20px;

    &-item{
      font-size: 20px;
      margin-bottom: 15px;
      padding: 5px;
      border-bottom: 2px solid $bill-color;
    }
  }
}

</style>
