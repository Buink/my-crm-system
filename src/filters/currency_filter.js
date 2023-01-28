export default function currencyFilter(value, currency) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency
    }).format(value)
}
