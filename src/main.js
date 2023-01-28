import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import dateFilter from "@/filters/date_filter"
import currencyFilter from "@/filters/currency_filter";
import uppercaseFirstLetter from "@/filters/uppercaseFirstLetter_filter";
import localeFilter from "@/filters/locale_filter";
import tooltipDirective from "@/directives/tooltip_directive";
import message_plugin from "@/utils/message_plugin";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

const app = createApp(App);

app.directive('tooltip', tooltipDirective)

app.config.globalProperties.$filters = {
    dateFilter, currencyFilter, uppercaseFirstLetter, localeFilter
}

app
    .use(message_plugin)
    .use(store)
    .use(router)
    .mount('#app')
