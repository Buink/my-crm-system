<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  name: "EmptyLayout",
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(e) {
      this.$error(messages[e] || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.empty-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  height: 100vh;
  background: grey;
}

</style>