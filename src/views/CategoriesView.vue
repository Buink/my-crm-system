<template>
  <div>
    <div class="page-title">
      <h2>{{ $filters.localeFilter('Menu_Categories') }}</h2>
    </div>

    <div class="categories" :key="count">
      <div class="cat-item" v-for="(cat, i) of categories" :key="i">
        {{ $filters.uppercaseFirstLetter(cat.title) }} <i class="material-icons right" @click="deleteCategory(i)">close</i>
      </div>
    </div>

    <section>
      <div class="row">

        <CategoryCreate
            :key="count"
            @updated="updated()"
        />
        <CategoryUpdate
            :key="count"
            @updated="updated()"
        />

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryUpdate from "@/components/CategoryUpdate";

export default {
  name: "CategoriesView",
  data: () => ({
    count: 0
  }),
  components: {
    CategoryCreate, CategoryUpdate
  },
  methods: {
    updated() {
      this.count++
    },
    async deleteCategory(i){
      try {
        await this.$store.dispatch('deleteCategory', i)
        this.count++
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters.info.categories
    }
  },
  mounted() {
    document.title = this.$route.meta.title
  }
}
</script>

<style scoped>

.categories{
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.cat-item{
  background: #d2d0d0;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.material-icons{
  cursor: pointer;
}

</style>
