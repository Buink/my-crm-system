<template>
  <div class="col s12 m12 l6">
    <div>
      <div class="page-subtitle">
        <h3>{{ $filters.localeFilter('Create') }}</h3>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="title"
            type="text"
            v-model.trim="title"
            :class="{invalid: (v$.title.$error)}"
          />
          <label for="title">{{ $filters.localeFilter('Title') }}</label>
          <small
            class="helper-text invalid"
            v-for="error of v$.title.$errors"
            :key="error.$uid"
          >
            {{ $filters.localeFilter(error.$message) }}
          </small>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: (v$.limit.$error)}"
          >
          <label for="limit">{{ $filters.localeFilter('Limit') }}</label>
          <small
            class="helper-text invalid"
            v-for="error of v$.limit.$errors"
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
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {required, minLength, helpers, minValue} from "@vuelidate/validators";

export default {
  name: "CategoryCreate",
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 500
  }),
  mounted() {
    M.updateTextFields()
  },
  validations: {
    title: {
      required: helpers.withMessage("Required", required),
      minLength: helpers.withMessage("minLength3", minLength(3))
    },
    limit: {
      required: helpers.withMessage("Required", required),
      minValue: helpers.withMessage("minValue500", minValue(500))
    },
  },
  methods: {
    async submitHandler() {
      // инфа о форме
      // console.log(this.v$);
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      await this.$store.dispatch('createCategory', {title: this.title, limit: this.limit,})
          .then(() => {
            this.$message(`Категория ${this.title} создана`)
            this.title = ''
            this.limit = 500
            this.v$.$reset()
            this.$emit('updated')
          })
          .catch( (e) => {
            console.log(e)
          });


    },
  },
}
</script>

<style scoped>

</style>
