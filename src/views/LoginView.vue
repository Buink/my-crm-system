<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Вход</span>
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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти<i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?<router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  data: () => ({
    v$: useVuelidate(),
    email: "",
    password: "",
  }),
  validations: {
    email: {
      required: helpers.withMessage("Это поле не должно быть пустым", required),
      email: helpers.withMessage("Введите корректный Email", email)
    },
    password: {
      required: helpers.withMessage("Это поле не должно быть пустым", required),
      minLength: helpers.withMessage("Минимальная длинна этого поля 3 символа", minLength(5))
    },
  },
  mounted() {
    document.title = this.$route.meta.title
    if (messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      // инфа о форме
      // console.log(this.v$);
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push("/");
      } catch (e) {
      }
    },
  },
};
</script>