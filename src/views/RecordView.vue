<template>
  <div>
    <div class="page-title">
      <h2>{{ $filters.localeFilter('Menu_NewRecord') }}</h2>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model.trim="category">
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

      <p>
        <label>
          <input v-if="category"
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          >
          <input v-else disabled
                 class="with-gap"
                 name="type"
                 type="radio"
                 value="outcome"
                 v-model="type"
          >
          <span>{{ $filters.localeFilter('Outcome') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input v-if="category"
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <input v-else disabled
                 class="with-gap"
                 name="type"
                 type="radio"
                 value="income"
                 v-model="type"
          />
          <span>{{ $filters.localeFilter('Income') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input v-if="category"
               id="amount"
               type="number"
               v-model.trim="amount"
               :class="{invalid: (v$.amount.$error)}"
        />
        <input v-else disabled
            id="amount"
            type="number"
            v-model.trim="amount"
            :class="{invalid: (v$.amount.$error)}"
        />
        <label for="amount">{{ $filters.localeFilter('Amount') }}</label>
        <small
            class="helper-text invalid"
            v-for="error of v$.amount.$errors"
            :key="error.$uid"
        >
          {{ $filters.localeFilter(error.$message) }}
        </small>
      </div>

      <div class="input-field">
        <input v-if="category"
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: (v$.description.$error)}"
        />
        <input v-else disabled
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: (v$.description.$error)}"
        />
        <label for="description">{{ $filters.localeFilter('Description') }}</label>
        <small
            class="helper-text invalid"
            v-for="error of v$.description.$errors"
            :key="error.$uid"
        >
          {{ $filters.localeFilter(error.$message) }}
        </small>
      </div>

      <button class="btn waves-effect waves-light custom-btn" type="submit">
        {{ $filters.localeFilter('Add') }}<i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {helpers, minLength, required} from "@vuelidate/validators";

export default {
  name: 'RecordView',
  data: () => ({
    select: null,
    v$: useVuelidate(),
    category: '',
    amount: null,
    description: '',
    type: 'outcome'
  }),
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    canCreateRecord(){
      if (this.type === 'income'){
        return true
      }
      else {
        return this.$store.getters.info.bill >= this.amount;
      }
    }
  },
  mounted() {
    document.title = this.$route.meta.title
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  validations: {
    category: {
      required: helpers.withMessage("Required", required),
    },
    amount: {
      required: helpers.withMessage("Required", required),
    },
    description: {
      required: helpers.withMessage("Required", required),
      minLength: helpers.withMessage("minLength3", minLength(3))
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        const record = {
          categoryId: this.category,
          type: this.type,
          amount: this.amount,
          description: this.description,
          date: new Date().toJSON()
        }

        if (this.canCreateRecord){
          await this.$store.dispatch('createRecord', record)
          this.$message('Запись добавлена')
          this.type = 'outcome'
          this.amount = null
          this.description=  ''
          this.v$.$reset()
          M.updateTextFields()
        } else {
          this.$error('Недостаточно средств на счете')
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  },
}

</script>
