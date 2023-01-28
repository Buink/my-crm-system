<template>
  <ul class="sidenav app-sidenav" :class="{open: isSidebarOpen}">

    <li
        v-for="link in links"
        :key="link.url"
        @click="$router.push(link.url)"
        :class="{ 'active': $route.path === link.url }"
    >
      <a class="waves-effect sidebar-a" :class="{ 'active': $route.path === link.url }">{{ link.title }}</a>
    </li>

  </ul>
</template>

<script>
import localeFilter from "@/filters/locale_filter";

export default {
  name: "Sidebar",
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    links: [
      {title: localeFilter('Menu_Bill'), url: '/'},
      {title: localeFilter('Menu_History'), url: '/history'},
      {title: localeFilter('Menu_Planning'), url: '/planning'},
      {title: localeFilter('Menu_NewRecord'), url: '/record'},
      {title: localeFilter('Menu_Categories'), url: '/categories'}
    ]
  })
}
</script>

<style scoped lang="scss">
@import "@/assets/style.scss";

.app-sidenav {
  position: absolute;
  top: 64px;
  width: 250px;
  transition: transform .3s;
  bottom: 0 !important;
  height: auto !important;
  background: $sidenav-background;

  &.open{
    transform: translateX(0)
  }
}

.sidebar-a{
  color: $accent-color;

  &:hover{
    background: $sidenav-li-hover;
  }
}
.active{
  background: $sidenav-li-active !important;
  color: $sidenav-a-active;
}

</style>