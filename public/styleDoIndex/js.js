const btnZapisz = document.querySelector('.zapisz');
const stopka = document.querySelector('.stopka');
btnZapisz.addEventListener('click', zapisz)

function wczytaj() {
	fetch('/ShopingList/getlist', {
		method: "get",
		headers: {
			'authorization': localStorage.getItem
				("authorization")
		}
	}).then(dane => dane.json())
		.then(dane => {
			let wpisy = document.querySelector('.wpisy');
			stopka.innerHTML = `Nazwa konta: ${dane.nazwa}`;
			const wszystko = dane.lista.map(element => {
				
				return `<div class="listaZapupow">
				<h3 class="zawartoscListaZakupow">${element.Name} </h3>
				<i class="edycja fa-solid fa-pen-to-square" data-id="${element._id}"></i>
				<i class="kosz fa-solid fa-trash" data-id="${element._id}"></i>
				</div>`
			}).join('')

			wpisy.innerHTML = wszystko;

			wpisy.addEventListener('click', async (e) => {
				const el = e.target
				console.log(e.target);

				if (el.classList.contains('kosz')) {
					const id = el.dataset.id

					fetch(`/ShopingList/edit/${id}`, {
						method: "delete",
						headers: {
							'authorization': localStorage.getItem
								("authorization")
						}
					}).then(dane => wczytaj())
				}

				if (el.classList.contains('edycja')) {
					const id = el.dataset.id
					fetch(`/ShopingList/edit/${id}`, {
						method: "PATCH",
						headers: {
							'authorization': localStorage.getItem
								("authorization")
						}
					}).then(dane => alert('Za niedługo będzie :)'))
				}





			})



		})
}

wczytaj();

function clear(e) {
	//	const e = e.target
	console.log(e);
	//	e.value = "";
}




function zapisz() {
	fetch('/ShopingList/getlist', {
		method: "post",
		body: JSON.stringify({ "zakup": document.querySelector('.inputZakup').value }),
		headers: {
			'Content-Type': 'application/json',
			'authorization': localStorage.getItem
				("authorization")
		}
	}).then(dane => wczytaj())

}


function loged(url, token) {
	fetch(url, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Bearer " + token,
		}
	}).then(dane => dane.text()
	)
		.then(dane => {
			document.body.innerHTML = dane;
			let zapiszButton = document.querySelector('.zapisz');
			zapiszButton.addEventListener('click', zapisz);
			wczytaj();
		}
		)

}
