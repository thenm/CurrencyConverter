const currencyToSelectEl = document.getElementById('currency-to');
const currencyFromSelectEl = document.getElementById('currency-from');
const amountToRateEl = document.getElementById('amount-to');
const amountFromRateEl = document.getElementById('amount-from');
const convertButtonEl = document.getElementById('convert-button');
const rateEl = document.getElementById('rate');

function calculate() {
	const currencyToValue = currencyToSelectEl.value;
	const currencyFromValue = currencyFromSelectEl.value;
	fetch('https://open.exchangerate-api.com/v6/latest')
		.then((res) => res.json())
		.then((data) => {
			const rate = data.rates[currencyFromValue] / data.rates[currencyToValue];
			rateEl.innerText = `1 ${currencyToValue} = ${rate.toFixed(
				2
			)} ${currencyFromValue}`;
			amountFromRateEl.value = (amountToRateEl.value * rate).toFixed(2);
		});
}

convertButtonEl.addEventListener('click', () => {
	const temp = amountToRateEl.value;
	amountToRateEl.value = amountFromRateEl.value;
	amountFromRateEl.value = temp;
	calculate();
});
