getAllSecuences()

const defatultHora = "07:00"
const defatultSteps = 1
const maxSecuences = 11
const maxSteps = 7

let htmlSecuences = ''
let hora = defatultHora
let steps = defatultSteps
let index = 0
let listSecuences = []


//     `
// <div class="secuenceAdded">
//     <span>Hora: 10:00</span>
//     <span>Pasos: 7</span>
//     <button class="buttonAdd" id="buttonDel">
//         <i class='bx bx-minus'></i>
//     </button>
// </div>
// `


const buttonAdd = document.getElementById("buttonAdd");
const inputTime = document.getElementById("time")
const inputSteps = document.getElementById("steps")
const secuencesList = document.getElementById("secuencesList")
// const saveList = document.getElementById("savelist")

inputTime.value = hora
inputSteps.value = steps

// saveList.addEventListener("click", getAllSecuences)
buttonAdd.addEventListener("click", saveSecuence)


// ----------------delete----------------------

secuencesList.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(e.target.id)
    if (e.target.id === "buttonDel") {
        htmlSecuences = ""
        e.target.disabled = true
        e.target.classList.add("hidden")
        console.log(e.target.dataset.id)
        fetchDeleteById(e.target.dataset.id)
        const elemDel = document.querySelector(`#secuenceAdded${e.target.dataset.id}`)
        console.log(elemDel)
        elemDel.classList.add("animate__fadeOutUp")

    }
})



inputTime.addEventListener("change", (e) => {
    if (validateHora(e.target.value, listSecuences) > -1) {
        buttonAdd.classList.add("hidden")
        buttonAdd.disabled = true
    }
    else {
        buttonAdd.classList.remove("hidden")
        buttonAdd.disabled = false
        hora = e.target.value
    }
})

const validateSteps = (e) => {
    if (e.target.value <= maxSteps && e.target.value > 0) steps = e.target.value
    if (e.target.value > maxSteps) steps = maxSteps
    if (e.target.value < 0) steps = 1
    inputSteps.value = steps
}

const validateHora = (hora, lista) => {
    console.log(hora, lista)
    let val = -1
    val = lista.length >= maxSecuences ? -1 : 0
    val = lista.findIndex((elem) => elem.timestr === hora)
    return val

}

inputSteps.addEventListener("change", (e) => {
    validateSteps(e)
})

inputSteps.addEventListener("focusout", (e) => {
    validateSteps(e)
})


function addHtmlSecuence(hora, steps, index) {
    console.log(hora)
    const htmlSecuence =
        `
            <div class="secuenceAdded animate__animated" id="secuenceAdded${index}" data-id="${index}">
                <span>Hora: "${hora}"</span>
                <span>Pasos: "${steps}"</span>
                <button class="buttonAdd buttonDel" id="buttonDel" data-id="${index}">
                    -                    
                </button>
            </div>
            `

    console.log(htmlSecuence)
    return htmlSecuence

}


function getAllSecuences() {
    fetch('https://dispenser-api-production.up.railway.app/api/v1/secuencias', {
        // fetch('http://localhost:9000/api/v1/secuencias', {
        method: 'GET', mode: "cors",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => {
            listSecuences = json
            console.log(listSecuences)
            renderSecuences(listSecuences)

            // document.querySelector(".secuenceAdded").classList.add("animate__bounceIn")


            if (validateHora(hora, listSecuences) > -1) {
                buttonAdd.classList.add("hidden")
                buttonAdd.disabled = true
            }
            else {
                buttonAdd.classList.remove("hidden")
                buttonAdd.disabled = false
                hora = e.target.value
            }


        })
}

function renderSecuences(list) {
    htmlSecuences = ""
    for (let i = 0; i < list.length; i++) {
        htmlSecuences = addHtmlSecuence(list[i].timestr, list[i].steps, list[i].id) + htmlSecuences
    }
    secuencesList.innerHTML = htmlSecuences
    if (listSecuences.length < maxSecuences) {
        buttonAdd.classList.remove("hidden")
        buttonAdd.disabled = false
    }
    else {
        buttonAdd.classList.add("hidden")
        buttonAdd.disabled = true
    }
    hora = "07:00"
    steps = 1
    inputTime.focus()

}



// -------- FETCH PARA GUARDAR-------

function saveSecuence(e) {
    e.preventDefault()
    if (listSecuences.length < maxSecuences) {
        buttonAdd.classList.remove("hidden")
        buttonAdd.disabled = false
        fetch('https://dispenser-api-production.up.railway.app/api/v1/secuencias', {
            // fetch('http://localhost:9000/api/v1/secuencias', {
            method: 'POST', mode: "cors",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(
                {
                    timestr: hora,
                    steps: steps
                },
            )
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                listSecuences.push({ timestr: json.timestr, steps: json.steps, id: json.id })
                console.log(listSecuences)
                renderSecuences(listSecuences)

                document.querySelector(".secuenceAdded").classList.add("animate__bounceInDown")

                buttonAdd.classList.remove("hidden")
                buttonAdd.disabled = false
                hora = defatultHora
                steps = defatultSteps
                inputTime.value = hora
                inputSteps.value = steps
                if (listSecuences.length < maxSecuences) {
                    buttonAdd.classList.remove("hidden")
                    buttonAdd.disabled = false
                }
                else {
                    buttonAdd.classList.add("hidden")
                    buttonAdd.disabled = true
                }
                if (validateHora(hora, listSecuences) > -1) {
                    buttonAdd.classList.add("hidden")
                    buttonAdd.disabled = true
                }
                else {
                    buttonAdd.classList.remove("hidden")
                    buttonAdd.disabled = false
                    hora = e.target.value
                }
            })
    }
    else {
        buttonAdd.classList.add("hidden")
        buttonAdd.disabled = true
    }

}


function fetchDeleteById(id) {
    console.log(id)

    fetch('https://dispenser-api-production.up.railway.app/api/v1/secuencias/delete/' + id, {
        // fetch('http://localhost:9000/api/v1/secuencias/delete/' + id, {
        method: 'DELETE', mode: "cors",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            getAllSecuences()
        });
}
