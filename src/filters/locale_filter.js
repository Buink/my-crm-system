import store from "@/store/store";
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localeFilter(key) {
    const locale = store.getters.info.locale || 'ru-RU'
    return locales[locale][key] || `[Localize Error:] Key ${key} not found`
}