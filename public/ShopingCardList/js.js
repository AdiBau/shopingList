
let span = document.querySelector('.user')
let wpisy = document.querySelector('.wpisy')
let nowaListaInput = document.querySelector('.nowaListaInput')
let nowaListaButton = document.querySelector('.nowaListaButton')
let logout = document.querySelector('.logout');


// logout
client_logOut = () => {
  fetch('/logout')
    .then(dane => {
      console.log(dane.url);
      window.location.href = dane.url;
    })
}
logout.addEventListener('click', client_logOut);
// log aut end


try {
  fetch('/shopingCard/userKonto', {
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("authorization"),
    }
  })
    .then(dane => {
      if (dane.status === 200)
        return dane;
    })
    .then(dane => dane.json())
    .then(dane => {
      span.innerText = dane.userName
      if (dane.user.length == 0) {
        return
      }
      localStorage.setItem('userID', dane.user[0].userID)
      let wynik = dane.user.map(dane => {
        return `<div class="wpisyList"> 
                 <div class="userKontoList" 
                 data-user_id="${dane.userID}" 
                 data-nazwa_listy_id="${dane.NazwaListyID}" 
                 data-user_konto_list_name="${dane.userKontoListName}"
                  >
                  ${dane.userKontoListName} 
                  </div>	
                 <i class="kosz fa-solid fa-trash" 
                 data-user_id="${dane.userID}" 
                 data-nazwa_listy_id="${dane.NazwaListyID}" 
                 data-user_konto_list_name="${dane.userKontoListName}">
                 </i>
                 </div>`
      }).join('')
      wpisy.innerHTML = wynik;
    })
} catch (error) {
  client_logOut();
}

nowaListaButton.addEventListener('click', function () {
  try {
    fetch('/shopingCard/userKonto', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem("authorization")
      },
      body: JSON.stringify({ nazwaListy: nowaListaInput.value })
    }).then(dane => dane.status == 200 ? location.reload() : console.log(dane.status)
    )


  } catch (error) {
    logout();
  }
})

wpisy.addEventListener('click', (e) => {
  let klik = e.target

  if (klik.classList.contains('kosz')) {
    fetch(`/shopingCard/userKonto`, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem("authorization")
      },
      body: JSON.stringify({
        "user_list_id": klik.dataset.nazwa_listy_id,
        "user_ID": klik.dataset.user_id,
        "user_list_name": klik.dataset.user_konto_list_name,

      })

    }).then(dane => dane.json())
      .then(dane => {
        let a = document.createElement('a'); a.setAttribute('href', dane.link); a.click()
      })
  }

  if (klik.classList.contains('userKontoList')) {
    fetch(`/ShopingCardList/shoping`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem("authorization")
      },
      body: JSON.stringify({
        "user_list_id": klik.dataset.nazwa_listy_id,
        "user_ID": klik.dataset.user_id,
        "user_list_name": klik.dataset.user_konto_list_name,
      })
    })
      .then(dane => dane.json())
      .then(dane => {
        let a = document.createElement('a');
        a.setAttribute('href', dane.link);
        a.click()
      })
  }
})









