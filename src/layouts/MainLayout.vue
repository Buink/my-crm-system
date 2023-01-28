<template>
  <div class="app-main-layout">

    <Loader v-if="!this.$store.getters.info.bill" />

    <div v-else>
      <Navbar @toggleSidebar="isOpen = !isOpen"/>

      <Sidebar :is-sidebar-open="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import Loader from "@/components/app/Loader";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  components: {
    Navbar, Sidebar, Loader
  },
  data: () => ({
    isOpen: true,
  }),
  async mounted() {
    await this.$store.dispatch('checkStatusAndSetData')
        .catch( (err) => {
          console.log(err);
        });
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale(){
      return this.$store.getters.info.locale
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

.app-main-layout {
  position: relative;
  min-height: 100vh;
  background: $main-bg;
}

.app-content {
  padding-left: 250px;
  transition: padding-left .3s;
  position: relative;
}

.app-content.full {
  padding-left: 0;
}

.app-page {
  padding: 20px;
}

</style>
