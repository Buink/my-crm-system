<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Регистрация</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: (v$.email.$error)}"
        />
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (v$.password.$error)}"
        />
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: (v$.name.$error)}"
        />
        <label for="name">Имя</label>
        <small
            class="helper-text invalid"
            v-for="error of v$.name.$errors"
            :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </div>
      <p>
        <label>
          <input
              id="agree"
              type="checkbox"
              v-model.trim="agree"
              :class="{invalid: (v$.agree.$error)}"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small
          class="helper-text invalid"
          v-for="error of v$.agree.$errors"
          :key="error.$uid"
      >
        {{ error.$message }}
      </small>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?<router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {email, required, minLength, helpers, sameAs} from "@vuelidate/validators";

export default {
  data: () => ({
    v$: useVuelidate(),
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  mounted() {
    document.title = this.$route.meta.title
  },
  validations: {
    email: {
      required: helpers.withMessage("Это поле не должно быть пустым", required),
      email: helpers.withMessage("Введите корректный Email", email)
    },
    password: {
      required: helpers.withMessage("Это поле не должно быть пустым", required),
      minLength: helpers.withMessage("Минимальная длинна этого поля 3 символа", minLength(5))
    },
    name: {
      required: helpers.withMessage("Это поле не должно быть пустым", required),
      minLength: helpers.withMessage("Минимальная длинна этого поля 3 символа", minLength(3))
    },
    agree: {
      sameAs: helpers.withMessage("Согласитесь с правилами", sameAs(true)),}
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push("/");
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  },
};
</script>
