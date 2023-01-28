<template>
  <div>
    <div class="page-title">
      <h2>{{ $filters.localeFilter('Menu_Bill') }}: {{ $filters.currencyFilter(this.$store.getters.info.bill, 'UAH') }}</h2>

      <button class="btn waves-effect waves-light custom-btn" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div v-if="currencies" class="row">

      <HomeBill
        :currencies="this.currencies"
      />

      <HomeCurrency
        :currencies="this.currencies"
      />

    </div>

    <Loader v-else />

  </div>
</template>

<script>
// @ is an alias to /src
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import Loader from "@/components/app/Loader";

export default {
  name: 'HomeView',
  data: () => ({
    currencies: null
  }),
  components: {
    Loader, HomeBill, HomeCurrency
  },
  async mounted() {
    document.title = this.$route.meta.title
    this.currencies = await this.$store.dispatch('getCurrencyData')
  },
  methods: {
    async refresh() {
      this.currencies = null
      this.currencies = await this.$store.dispatch('getCurrencyData')
    }
  }
}
</script>
