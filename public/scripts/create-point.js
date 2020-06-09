function populationUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( data => {

        for( state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    
    })
}

populationUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("select[name=state]").text

    const ufValue= event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disable = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disable = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsCollect = document.querySelector(".items-grid li")

for (const item of itemsCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const itemsToCollect = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    if( alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter(item => item != itemId )

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)

    } 

    itemsToCollect.value = selectedItems
}

