
fetch('/getlist', {
  method: "get",
  headers: {
    'authorization': localStorage.getItem
      ("authorization")
  }
}).then(dane => dane.json())
  .then(dane => console.log("dane"))

