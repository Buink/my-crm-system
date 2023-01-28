<template>
  <div>
    <p class="center" v-if="!record">{{ $filters.localeFilter('noSuchRecord') }}</p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <a @click="$router.push('/history?page=' + page)" class="breadcrumb">{{ $filters.localeFilter('Menu_History') }}</a>
        <a @click.prevent class="breadcrumb">
          {{ $filters.localeFilter(record.type) }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{'red': record.type === 'outcome', 'green': record.type === 'income'}">
            <div class="card-content white-text">
              <p>{{ $filters.localeFilter('Description') }}: {{ record.description }}</p>
              <p>{{ $filters.localeFilter('Amount') }}: {{ $filters.currencyFilter(record.amount, 'UAH') }}</p>
              <p>{{ $filters.localeFilter('Category') }}: {{ $filters.uppercaseFirstLetter(record.categoryName) }}</p>

              <small>{{ $filters.dateFilter(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import paginationMixin from "@/mixins/pagination_mixin";

export default {
  name: 'DetailView',
  data: () => ({
    record: ''
  }),
  mixins: [paginationMixin],
  mounted() {
    document.title = this.$route.meta.title
    const record = this.$store.getters.records.find(el => el.id === this.$route.params.id)
    const category = this.$store.getters.categories.find(el => el.id === record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,

    }
  }
}

</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.breadcrumb-wrap, .breadcrumb-wrap a, .breadcrumb-wrap a:before {
  align-items: center
}

.breadcrumb-wrap {
  position: relative;
  display: flex
}

.breadcrumb-wrap a, .breadcrumb-wrap a:before {
  display: inline-flex;
  color: rgba(0, 0, 0, .7) !important
}

</style>