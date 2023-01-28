<template>
  <div>
    <div class="page-title">
      <h2>{{ $filters.localeFilter('Profile') }}</h2>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="username"
            type="text"
            v-model.trim="username"
            :class="{invalid: (v$.username.$error)}"
        />
        <label for="username">{{ $filters.localeFilter('Name') }}</label>
        <small
            class="helper-text invalid"
            v-for="error of v$.username.$errors"
            :key="error.$uid"
        >
          {{ $filters.localeFilter(error.$message) }}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light custom-btn" type="submit">
        {{ $filters.localeFilter('Update') }}<i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>

import {helpers, minLength, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: 'ProfileView',
  data: () => ({
    v$: useVuelidate(),
    username: '',
    isRuLocale: true,
  }),
  mounted() {
    document.title = this.$route.meta.title
    this.username = this.$store.getters.info.username
    this.isRuLocale = this.$store.getters.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  validations: {
    username: {
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
        await this.$store.dispatch('updateUsername', this.username)
        await this.$store.dispatch('updateLocale', this.isRuLocale ? 'ru-RU' : 'en-US')
      } catch (e){
        console.error(e)
      }


    },
  },
}

</script>

<style lang="scss" scoped>

.switch{
  margin-bottom: 2rem;
}

</style>
