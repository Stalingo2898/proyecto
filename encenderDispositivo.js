const btnEncender = document.getElementById("btnEncender")

btnEncender.addEventListener("click", encenderDispositivo)


function encenderDispositivo(e) {
  e.preventDefault()
  btnEncender.classList.add("animate__animated")
  btnEncender.classList.add("anianimate__bounce")
  btnEncender.disabled=true
  console.log('encender')
  fetch('https://dispenser-api-production.up.railway.app/api/v1/secuencias/u/1', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    setTimeout(() => {
        btnEncender.disabled=false
        btnEncender.classList.remove("animate__animated")
        btnEncender.classList.remove("anianimate__bounce")
      }, 1000);
    });
}