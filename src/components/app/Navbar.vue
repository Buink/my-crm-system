<template>
  <nav class="navbar">
    <div class="navbar-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')"><i class="material-icons navbar-dehaze">dehaze</i></a>
        <span class="navbar-date">{{ $filters.dateFilter(this.date, 'datetime') }}</span>
      </div>

      <div class="navbar-right">
        <a
            class="dropdown-trigger"
            href="#"
            data-target="dropdown"
            ref="dropdown"
        >
            {{ this.username }}<i class="material-icons dropdown-arrow">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="dropdown-content-text">
                <i class="material-icons dropdown-content-i">account_circle</i>{{ $filters.localeFilter('Profile') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" @click.prevent="logout" class="dropdown-content-text">
                <i class="material-icons dropdown-content-i">assignment_return</i>{{ $filters.localeFilter('Leave') }}
              </a>
            </li>
          </ul>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    username() {
      return this.$store.getters.info.username
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeUnmount() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.navbar{
  background: $navbar-background;
  display: flex;
  align-items: center;

  &-wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  &-left{
    display: flex;
    align-items: center;
    gap: 20px;

    .navbar-dehaze{
      color: $accent-color;
    }

    .navbar-date{
      color: $accent-color;
    }
  }

  &-right {
    display: flex;
    align-items: center;

    .dropdown-trigger {
      display: flex;
      align-items: center;
      padding: 0 20px;
      transition: 0.3s ease-in-out;
      color: $accent-color;

      &:hover {
        background: $navbar-background-hover;
      }
    }

    .dropdown-arrow {
      color: $accent-color;
    }

    .dropdown-content{
      background: $dropdown-background;

      li{
        &:hover{
          background: $dropdown-background-hover;
        }
      }

      &-text{
        color: $accent-color;
      }
      &-i{
        color: $accent-color;
      }
    }
  }
}

</style>