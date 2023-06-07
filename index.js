const USERNAME_LOCAL_KEY = 'NATURE_EXT_USERNAME';
const userName = window.localStorage.getItem(USERNAME_LOCAL_KEY);

const form = document.querySelector('#search-form');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const date = document.querySelector('#currentDate');
const weekday = document.querySelector('#weekday');

const newSearch = (e) => {
	e.preventDefault();
	const search = form.search.value;
	search.trim() !== '' &&
		chrome.runtime.sendMessage({ action: 'search', query: search });
};

const updateClock = () => {
	const now = new Date();
	const currentTime = now.toLocaleTimeString().split(':');
	let currentHour = currentTime[0];
	let currentMinute = currentTime[1];
	let currentDate = now.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: 'long',
	});
	let currentWeekday = now
		.toLocaleDateString('pt-BR', {
			weekday: 'long',
		})
		.split('-')[0];

	date.innerHTML = currentDate;
	weekday.innerHTML = currentWeekday;
	minutes.innerHTML = currentMinute;
	hours.innerHTML = currentHour;
};

updateClock();
setInterval(updateClock, 1000);

form.search.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') newSearch(e);
});

form.addEventListener('submit', newSearch);

chrome.runtime.sendMessage({ action: 'getTopSites' }, (res) => {
	console.log(res);
});

document.addEventListener('DOMContentLoaded', () => {
	if (!userName) {
		const name = window.prompt('Qual o seu nome ?');
		window.localStorage.setItem(USERNAME_LOCAL_KEY, name);
	}
});
