// console.log ("natessék kezdek")
// console.log(uuidv4())
let notes=getSavedNotes()
const filters = {
    searchText: '',
    sortBy: 'byEdited'
}


document.querySelector('#create-note').addEventListener('click', e => {
    // e.target.textContent='The button was clicked'
    const newID = uuidv4()
    notes.push({
        id: newID,
        title: '',
        body:'',
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf()
    })
    saveNotes(notes)
    // renderNotes(notes, filters)
    location.assign('edit.html#'+newID)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    document.querySelector("#alcim").textContent = "Alcím: "  + e.target.value
    // a keresőmező tartalma alapján újraszűrjük a jegyzeteket
    filters.searchText = e.target.value
    renderNotes(notes,filters)
})

document.getElementById("order-by").addEventListener('change', function(e){
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
    console.log(`Sort by new thing: ${e.target.value}`)
})

window.addEventListener('storage', function(e){
    if (e.key === 'notes') {
        notes = getSavedNotes()
        renderNotes(notes, filters)
    } else {
        console.log (`other key changed: ${e.key}`)
    }
})



// initialize
renderNotes(notes, filters)







// // dátum játék.

// const date1 = new Date("January 3 2012 14:30")
// const date2 = new Date('March 5 2001 06:00:03')
// const ts1 = date1.getTime()
// const ts2 = date2.getTime()

// if (ts1 < ts2 ) {
//     console.log(`The earlier date is ${date1.toString()}`)
// } else {
//     console.log(`The earlier date is ${date2.toString()}`)

// }



// document.getElementById('for-fun').addEventListener ('change', function(e){
//     console.log(e.target.checked)
// })

// document.querySelector('#remove-all').addEventListener(
//     'click', () => document.querySelectorAll('.note').forEach(note=> note.remove()))

// <form id="name-form">
// <input type="text" placeholder="First name" name="firstName">
// <button>Submit</button>
// </form>

// document.querySelector('#name-form').addEventListener('submit', function(e){
//     e.preventDefault()
//     console.log(e.target.firstName.value)
//     e.target.firstName.value = ''
// })
