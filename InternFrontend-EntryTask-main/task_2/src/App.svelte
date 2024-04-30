<script lang="ts">
  import { onMount } from 'svelte'

  const BASE_URL = 'https://open.er-api.com/v6/latest/USD'

  let amountFrom = 1
  let amountTo = 0
  let from = 'EUR'
  let to = 'USD'
  let exchangeRates = {}
  let currentRate = 0

  // Объект с соответствием между кодом валюты и символом
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
    CNY: '¥'
  }

  async function fetchRates() {
    try {
      const res = await fetch(`${BASE_URL}?base=${from}`)
      const data = await res.json()

      exchangeRates = data.rates
      currentRate = exchangeRates[to]
      amountTo = amountFrom * currentRate
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
    }
  }

  function handleAmountFromChange(event: InputEvent) {
    amountFrom = parseFloat((event.target as HTMLInputElement).value)
    if (!isNaN(amountFrom)) {
      amountTo = amountFrom * currentRate
    }
  }

  function handleAmountToChange(event: InputEvent) {
    amountTo = parseFloat((event.target as HTMLInputElement).value)
    if (!isNaN(amountTo)) {
      amountFrom = amountTo / currentRate
    }
  }

  function handleFromCurrencyChange(event: InputEvent) {
    from = (event.target as HTMLSelectElement).value.toUpperCase()
    fetchRates()
  }

  function handleToCurrencyChange(event: InputEvent) {
    to = (event.target as HTMLSelectElement).value.toUpperCase()
    fetchRates()
  }

  function swapCurrencies() {
    const temp = from
    from = to
    to = temp
    fetchRates()
  }

  onMount(fetchRates)
</script>

<main class="flex items-center justify-center mt-6 bg-gray-200 min-h-screen">
  <div class="flex flex-col w-full rounded-lg shadow bg-gray-800 text-white sm:w-3/4 lg:w-1/2 xl:w-1/3">
    <h1 class="m-0 py-2 px-4 font-thin text-3xl text-white bg-green-700 rounded-t">Currency Converter</h1>
<div class="main-block">
  <div class="f_block">
    <div class="currency-input-container w-full pt-4">
      <label for="amountFrom" class="mb-2">Amount to convert:</label>
      <div class="flex items-center border border-gray-400 rounded px-2 bg-gray-900">
        <span class="currency-symbol text-xl px-2">{currencySymbols[from]}</span>
        <input id="amountFrom" class="currency-input block w-1/2 py-2 px-3 leading-6 rounded bg-gray-900 text-white" name="amountFrom" type="number" min="0" placeholder="0.00" value={amountFrom} on:input={handleAmountFromChange} />
      </div>
    </div>

    <div class="flex items-center w-full h-full py-4 text-center">
      <div class="currency-select-container flex flex-col items-center w-full px-4 sm:w-full">
        <label for="fromCurrency" class="mb-2">Convert From:</label>
        <select id="fromCurrency" class="currency-select block w-1/2 py-2 px-3 leading-6 rounded bg-gray-900 text-white" bind:value={from} on:change={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
          <option value="CNY">CNY</option>
        </select>
      </div>
    </div>
    </div>
      <svg class="convert-button" on:click={swapCurrencies}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M377.941 169.941V216H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.568 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296h243.882v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.568 0-33.941l-86.059-86.059c-15.119-15.12-40.971-4.412-40.971 16.97z" />
        </svg>
      </svg>
<div class="S_block">
      <div class="currency-input-container w-full pt-4">
        <label for="amountTo" class="mb-2">Amount to convert:</label>
        <div class="flex items-center border border-gray-400 rounded px-2 bg-gray-900">
          <span class="currency-symbol text-xl px-2">{currencySymbols[to]}</span>
          <input id="amountTo" class="currency-input block w-1/2 py-2 px-3 leading-6 rounded bg-gray-900 text-white" name="amountTo" type="number" min="0" placeholder="0.00" value={amountTo} on:input={handleAmountToChange} />
        </div>
      </div>

      <div class="currency-select-container flex flex-col items-center w-full px-4 sm:w-full">
        <label for="toCurrency" class="mb-2">Convert To:</label>
        <select id="toCurrency" class="currency-select block w-1/2 py-2 px-3 leading-6 rounded bg-gray-900 text-white" bind:value={to} on:change={handleToCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
          <option value="CNY">CNY</option>
        </select>
      </div>
    </div>
  </div>
</div>
    <div class="result-container flex flex-wrap justify-center w-full pb-2">
      {#if isNaN(amountFrom) || isNaN(amountTo)}
        <p class="result-message text-red-600">Please enter valid amounts.</p>
      {:else}
        <p class="result-message">{amountFrom} {from} = {amountTo.toFixed(3)} {to}</p>
      {/if}
    </div>

</main>

<style>
  :global(body) {
    padding-top: 2rem;
    background-color: #f3f4f6;
  }

  .convert-button {
    width: 32px;
    height: 32px;
    fill: #4a5568;
    cursor: pointer;
  }

  .convert-button:hover {
    fill: #2d3748;
  }

  .currency-input-container {
    display: flex;
  }

  .currency-symbol {
    color: black;
  }
  .main-block{
    display: flex;
    justify-content: space-around;
  }
</style>