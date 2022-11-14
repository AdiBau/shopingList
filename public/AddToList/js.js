const btnZapisz = document.querySelector('.zapisz');
const nazwaListy = document.querySelector('.nazwaListy')
const stopka = document.querySelector('.stopka');
btnZapisz.addEventListener('click', zapisz)
let wpisy = document.querySelector('.wpisy');
let logout = document.querySelector('.logout');


// logout
client_logOut = () => {
	fetch('../logout')
		.then(dane => {
			window.location.href = dane.url;
		})
}
logout.addEventListener('click', client_logOut);
// log aut end

function wczytaj() {
	fetch('/ShopingCardList/getList', {
		method: "get",
		headers: {
			'authorization': localStorage.getItem("authorization"),
		}
	}).then(dane => dane.json())
		.then(dane => {
			nazwaListy.innerHTML = `<h3>Nazwa Listy:  ${dane.nazwaListy.userKontoListName}</h3>`;
			stopka.innerHTML = `Nazwa konta: ${dane.userName} `;
			const wszystko = dane.lista.map(element => {

				return `<div class="listaZapupow">
				<h3 class="zawartoscListaZakupow">${element.Name} </h3>
				<i class="kosz fa-solid fa-trash" data-id="${element._id}"></i>
				</div>`
			}).join('')
			wpisy.innerHTML = wszystko;
		})
}

wczytaj();

function zapisz() {
	fetch('/ShopingCardList/getList', {
		method: "post",
		body: JSON.stringify({ "zakup": document.querySelector('.inputZakup').value }),
		headers: {
			'Content-Type': 'application/json',
			'authorization': localStorage.getItem("authorization")
		}
	}).then(dane => wczytaj())
		.catch(err => { })
}


wpisy.addEventListener('click', async (e) => {
	const el = e.target;

	if (el.classList.contains('kosz')) {
		const id = el.dataset.id

		fetch(`/ShopingCardList/getList/${id}`, {
			method: "delete",
			headers: {
				'authorization': localStorage.getItem
					("authorization")
			}
		}).then(dane => wczytaj())
	}
})

stopka.addEventListener('click', async (e) => {
	const el = e.target

	if (el.classList.contains('usunKonto')) {

		fetch(`/ShopingList/delete`, {
			method: "delete",
			body: JSON.stringify({
				user_ID_list: el.dataset.id,
				list_name: el.dataset.nazwa_listy,
				userID: el.dataset.userid
			}),
			headers: {
				'Content-Type': 'application/json',
				'authorization': localStorage.getItem("authorization")
			}
		}).then(dane => dane.json()).then(dane => { let a = document.createElement('a'); a.setAttribute('href', dane.link); a.click() })
	}
})