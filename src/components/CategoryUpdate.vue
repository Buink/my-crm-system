<template>
  <div class="col s12 m12 l6">
    <div>
      <div class="page-subtitle">
        <h3>{{ $filters.localeFilter('Edit') }}</h3>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model.trim="category" :class="{invalid: (v$.category.$error)}">
            <option value="" disabled selected>{{ $filters.localeFilter('Category') }}</option>
            <option
                v-for="cat of this.categories"
                :key="cat.id"
                :value="cat.id"
            >
              {{ $filters.uppercaseFirstLetter(cat.title) }}
            </option>
          </select>
          <label>{{ $filters.localeFilter('chooseCategory') }}</label>
          <small
              class="helper-text invalid"
              v-for="error of v$.category.$errors"
              :key="error.$uid"
          >
            {{ $filters.localeFilter(error.$message) }}
          </small>
        </div>

        <div class="input-field">
          <input v-if="category"
              id="newTitle"
              type="text"
              v-model.trim="newTitle"
              :class="{invalid: (v$.newTitle.$error)}"
          />
          <input v-else disabled
                 id="newTitle"
                 type="text"
                 v-model.trim="newTitle"
                 :class="{invalid: (v$.newTitle.$error)}"
          />
          <label for="newTitle">{{ $filters.localeFilter('newTitle') }}</label>
          <small
              class="helper-text invalid"
              v-for="error of v$.newTitle.$errors"
              :key="error.$uid"
          >
            {{ $filters.localeFilter(error.$message) }}
          </small>
        </div>

        <div class="input-field">
          <input v-if="category"
                 id="newLimit"
                 type="text"
                 v-model.trim="newLimit"
                 :class="{invalid: (v$.newLimit.$error)}"
          />
          <input v-else disabled
                 id="newLimit"
                 type="text"
                 v-model.trim="newLimit"
                 :class="{invalid: (v$.newLimit.$error)}"
          />
          <label for="newLimit">{{ $filters.localeFilter('newLimit') }}</label>
          <small
              class="helper-text invalid"
              v-for="error of v$.newLimit.$errors"
              :key="error.$uid"
          >
            {{ $filters.localeFilter(error.$message) }}
          </small>
        </div>

        <button class="btn waves-effect waves-light custom-btn" type="submit">
          {{ $filters.localeFilter('Update') }}<i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import {helpers, minLength, minValue, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import uppercaseFirstLetter from "@/filters/uppercaseFirstLetter_filter";
import localeFilter from "@/filters/locale_filter";

export default {
  name: "CategoryUpdate",
  data: () => ({
    select: null,
    v$: useVuelidate(),
    category: '',
    newTitle: localeFilter('categoryFirst'),
    newLimit: localeFilter('categoryFirst')
  }),
  watch: {
    category(id){
      const curr = this.categories.find(el => el.id === id)
      this.newTitle = uppercaseFirstLetter(curr['title'])
      this.newLimit = curr['limit']
      setTimeout(() => {
        M.updateTextFields()
      })
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  validations: {
    category: {
      required: helpers.withMessage("Required", required),
    },
    newTitle: {
      required: helpers.withMessage("Required", required),
      minLength: helpers.withMessage("minLength3", minLength(3))
    },
    newLimit: {
      required: helpers.withMessage("Required", required),
      minValue: helpers.withMessage("minValue500", minValue(500))
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        id: this.category,
        title: this.newTitle,
        limit: this.newLimit
      }

      try {
        await this.$store.dispatch('updateCategory', formData)
        this.$emit('updated')
        this.$message(`Категория ${this.newTitle} изменена`)
        this.v$.$reset()
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
