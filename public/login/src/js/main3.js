var undrlinePin = document.getElementById("under-pin");
var undrlinePin2 = document.getElementById("under-pin2");
var undrName = document.getElementById("under-name");
var undrName2 = document.getElementById("under-name2");

var pinInput = document.getElementById("pin");
var pinError = document.getElementById("pin-error");

var nameInput = document.getElementById("name");
var nameInput2 = document.getElementById("name2");


var loginBtn = document.getElementById("login");
var registerBtn = document.getElementById("register");

var loginBtn2 = document.getElementById("login2");
var registerBtn2 = document.getElementById("register2");

var slideBtn = document.getElementById("slide");
var loginForm = document.querySelector(".logowanie");
var registerForm = document.querySelector(".register");




var pinInput2 = document.getElementById("pin2");
var pinValue2 = document.getElementById("pin2").value;
var pinError2 = document.getElementById("pin-error2");

var nameInput = document.getElementById("name");
var nameInput2 = document.getElementById("name2");

var eyeIcon2 = document.getElementById("eye-icon2");
var loginBtn2 = document.getElementById("login2");
var registerBtn2 = document.getElementById("register2");
var slideBtn2 = document.getElementById("slide2");

var loginOK = document.querySelector('.loginOK');
var registerOK = document.querySelector('.registerOK');
let wynik = document.querySelector('.wynik')
let wynik2 = document.querySelector('.wynik2')

var eye = false;

registerBtn.addEventListener("mouseover", slideRight);
loginBtn.addEventListener("mouseover", slideLeft);
registerBtn.addEventListener("click", register);
registerBtn.addEventListener("mouseout", slideLeft);
loginOK.addEventListener('click', wysliLogin)

registerBtn2.addEventListener("mouseover", slideRight);
loginBtn2.addEventListener("mouseover", slideLeft);
loginBtn2.addEventListener("click", login);
loginBtn2.addEventListener("mouseout", slideRight);
registerOK.addEventListener('click', wysliRegister)


let validPIN = false;
let validPIN2 = false;
let validName = false;
let validName2 = false;

function login() {


	loginForm.classList.toggle('visibleNone')
	registerForm.classList.toggle('visibleNone')

	slideBtn.classList.add('slide-right');
	slideBtn.classList.remove('slide-left');
	registerBtn.classList.add('color-white');
	registerBtn.classList.remove('color-grey');
	loginBtn.classList.add('color-grey');

}

function register() {


	loginForm.classList.toggle('visibleNone')
	registerForm.classList.toggle('visibleNone')

	slideBtn2.classList.add('slide-right');
	slideBtn2.classList.remove('slide-left');
	registerBtn2.classList.add('color-white');
	registerBtn2.classList.remove('color-grey');
	loginBtn2.classList.add('color-grey');

}

//----ON FOCUS----//

pinInput.onfocus = function () {
	undrlinePin.style.width = ("100%");
	undrName.style.width = ("0%");
	undrName.innerText = ""
	wynik.innerText = "";
	wynik2.innerText = "";
	wynik.classList.remove('visible')

}

pinInput2.onfocus = function () {
	undrlinePin2.style.width = ("100%");
	undrName2.style.width = ("0%");
	undrName2.innerText = ""
	wynik.innerText = "";
	wynik2.innerText = "";
	wynik2.classList.remove('visible')
}

nameInput.onfocus = function () {
	undrName.style.width = ("100%");
	undrlinePin.style.width = ("0%");
	undrlinePin.innerText = ""
	wynik.innerText = "";
	wynik2.innerText = "";
	wynik.classList.remove('visible')
}

nameInput2.onfocus = function () {
	undrName2.style.width = ("100%");
	undrlinePin2.style.width = ("0%");
	undrlinePin2.innerText = ""
	wynik.innerText = "";
	wynik2.innerText = "";
	wynik2.classList.remove('visible')
}

function validacjaPin() {
	undrlinePin.innerText = "";
	undrlinePin.style.BoxSizing = ("Border-Box");
	undrlinePin.style.border = "none"

	if (pinInput.value.length > 3 || (Number(pinInput.value) == 'Number')) {

		undrlinePin.style.width = ("0");
		undrlinePin.classList.remove('show-err');
		undrlinePin.classList.add('hide-err');
		undrlinePin.innerText = ""
		return validPIN = true;
	} else {
		undrlinePin.style.width = ("100%");
		undrlinePin.classList.add('show-err');
		undrlinePin.classList.remove('hide-err');
		undrlinePin.innerText = "Wprowadź PIN min 4 znaki"
		return validPIN = false;

	}

}

function validacjaPin2() {
	undrlinePin2.innerText = ""
	undrlinePin2.style.BoxSizing = ("Border-Box");
	undrlinePin2.style.border = "none"
	if (pinInput2.value.length > 3 || typeof (Number(pinInput2)) == Number) {
		undrlinePin2.style.width = ("0");
		undrlinePin2.classList.remove('show-err');
		undrlinePin2.classList.add('hide-err');
		undrlinePin2.innerText = ""
		return validPIN2 = true;
	} else {
		undrlinePin2.style.width = ("100%");
		undrlinePin2.classList.add('show-err');
		undrlinePin2.classList.remove('hide-err');
		undrlinePin2.innerText = "Wprowadź PIN min 4 znaki"
		return validPIN2 = false;
	}

}

function validacjaName() {
	undrName.innerText = "";

	if (nameInput.value.length > 3) {
		undrName.style.width = ("0");
		undrName.classList.remove('show-err');
		undrName.classList.add('hide-err');
		undrName.innerText = ""
		return validName = true;
	} else {
		undrName.style.width = ("100%");
		undrName.classList.add('show-err');
		undrName.classList.remove('hide-err');
		undrName.innerText = "Wprowadź Nazwe min 4 znaki"
		return validName = false;
	}

}

function validacjaName2() {
	undrName2.innerText = ""

	if (nameInput2.value.length > 3) {
		undrName2.style.width = ("0");
		undrName2.classList.remove('show-err');
		undrName2.classList.add('hide-err');
		undrName2.innerText = ""

		return validName2 = true;
	} else {
		undrName2.style.width = ("100%");
		undrName2.classList.add('show-err');
		undrName2.classList.remove('hide-err');
		undrName2.innerText = "Wprowadź Nazwe min 4 znaki"
		return validName2 = false;
	}

}


pinInput.addEventListener('input', validacjaPin);
pinInput2.addEventListener('input', validacjaPin2);
nameInput.addEventListener('input', validacjaName);
nameInput2.addEventListener('input', validacjaName2);
//----TOGGLE EYE ICON----//

function toggleIcon() {
	eyeIcon.classList.toggle('fa-eye-slash');
	undrlinePin.style.width = ("100%");
}



function slideRight() {
	slideBtn.classList.add('slide-right');
	slideBtn.classList.remove('slide-left');
	registerBtn.classList.add('color-white');
	registerBtn.classList.remove('color-grey');
	loginBtn.classList.add('color-grey');

	slideBtn2.classList.add('slide-right');
	slideBtn2.classList.remove('slide-left');
	registerBtn2.classList.add('color-white');
	registerBtn2.classList.remove('color-grey');
	loginBtn2.classList.add('color-grey');

}
function slideLeft() {

	slideBtn.classList.remove('slide-right');
	slideBtn.classList.add('slide-left');
	registerBtn.classList.add('color-white');
	registerBtn.classList.add('color-grey');
	loginBtn.classList.remove('color-grey');

	slideBtn2.classList.remove('slide-right');
	slideBtn2.classList.add('slide-left');
	registerBtn2.classList.add('color-white');
	registerBtn2.classList.add('color-grey');
	loginBtn2.classList.remove('color-grey');

}


function wysliRegister() {
	validacjaPin2();
	validacjaName2();
	if (!validPIN2 || !validName2) {
		return wynik2.innerText = "Wprowadź PIN i Name"
	}
	wynik2.innerText = ""
	fetch('/register', {
		method: 'post',
		body: JSON.stringify({
			userName: nameInput2.value,
			pin: pinInput2.value,
		}),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(dane => dane.json())
		.then(dane => {
			if (dane.status == 200) {
				wynik2.innerHTML = "Konto utworzone pomyślnie  -- ZALOGUJ się"
				wynik2.classList.add('visible')
				nameInput.value = "";
				nameInput2.value = "";
				pinInput.value = "";
				pinInput2.value = "";

				setTimeout(() => {
					wynik2.innerText = "";
					wynik2.classList.remove('visible');
					location.reload();
				}, 1500);
			}
			else {
				wynik2.innerHTML = dane.msg;
				wynik2.classList.add('visible')
				nameInput.value = "";
				nameInput2.value = "";
				pinInput.value = "";
				pinInput2.value = "";
			}
		})
		.catch(err => { })
}


function wysliLogin() {
	validacjaPin();
	validacjaName();
	if (!validPIN || !validName) {
		return wynik.innerText = "Wprowadź PIN i Nazwe"
	}
	wynik.innerText = ""
	fetch('/', {
		method: 'post',
		body: JSON.stringify({
			pin: pinInput.value,
			userName: nameInput.value,
		}),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(dane => dane.json())
		.then(dane => {


			if (dane.status == 200) {
				localStorage.setItem('authorization', "Bearer " + dane.token);
				nameInput.value = "";
				nameInput2.value = "";
				pinInput.value = "";
				pinInput2.value = "";
				wynik.classList.remove('visible')
				window.location.href = dane.msg;
			}
			else {
				wynik.innerHTML = dane.msg;
				nameInput.value = "";
				nameInput2.value = "";
				pinInput.value = "";
				pinInput2.value = "";
				wynik.classList.add('visible')
			}
		})
}

const logowanie = document.querySelector('.logowanie')
const rejestracja = document.querySelector('.register')

logowanie.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		wysliLogin()
	}
});

rejestracja.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		wysliRegister()
	}
});