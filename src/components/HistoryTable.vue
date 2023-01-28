<template>
  <table class="history-table">
    <thead>
    <tr>
      <th>#</th>
      <th>{{ $filters.localeFilter('Amount') }}</th>
      <th>{{ $filters.localeFilter('Date') }}</th>
      <th>{{ $filters.localeFilter('Category') }}</th>
      <th>{{ $filters.localeFilter('Type') }}</th>
      <th>{{ $filters.localeFilter('Open') }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(rec, idx) in records" :key="rec.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ $filters.currencyFilter(rec.amount, 'UAH') }}</td>
      <td>{{ $filters.dateFilter(rec.date) }}</td>
      <td>{{ $filters.uppercaseFirstLetter(rec.categoryName) }}</td>
      <td>
        <span class="white-text badge" :class="[rec.typeClass]">
          {{ $filters.localeFilter($filters.uppercaseFirstLetter(rec.typeText)) }}
        </span>
      </td>
      <td>
        <button class="btn custom-btn" @click="$router.push('/detail/' + rec.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "HistoryTable",
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.history-table{
  margin-top: 30px;
  margin-bottom: 20px;
  color: black;
  border-collapse: collapse;

  th{
    text-align: center;
    padding-bottom: 10px;
    color: $history-table-th;
  }
  tr {
    padding: 10px;
    border-bottom: 1pt solid #bebebe;
    color: $regular-text-color;
  }
  td {
    text-align: center;
    padding: 10px 0;
  }
}

</style>