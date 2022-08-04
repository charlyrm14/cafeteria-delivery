export function CurrencyFormat ( quantity ) {
    return quantity.toLocaleString('en-US', {
        style:      'currency',
        currency:   'USD'
    })
}