const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const spanElement = document.querySelector('#note-span')
// location.hash taralmazza az ID-t
const noteID = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find( note => note.id === noteID)
if (note === undefined) {
    location.assign('/index.html')
}

// func to build the timestamp text
const timestampText = function (timestamp) {
    return 'Updated ' + moment(timestamp).fromNow() +' (' + timestamp + ')'
}


// a note tartalmazza az objektumomat

// console.log(note)
titleElement.value = note.title
bodyElement.value = note.body
spanElement.innerHTML = timestampText(note.updatedAt)


titleElement.addEventListener('change', function (e) {
    // változott a note title
    // console.log(`e.target.value értéke ${e.target.value}`)
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    spanElement.innerHTML = timestampText(note.updatedAt)
    
    // visszaírom az objektumba
    // mentem a notes-t
    saveNotes(notes)
})

bodyElement.addEventListener('change', function (e) {
    // változott a note body
    // console.log(`e.target.value értéke ${e.target.value}`)
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    spanElement.innerHTML = timestampText(note.updatedAt)

    // visszaírom az objektumba
    // mentem a notes-t
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', function (){
    //a törlés gomb
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', function (e){
    //fut, ha a storage egy MÁSIK lapon változott. Frissíteni kell nálunk is.

    //megnézzük, hogy a notes változott-e?
    if (e.key === 'notes') {
        notes = getSavedNotes()
        note = notes.find( note => note.id === noteID)
        if (note === undefined) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        spanElement.innerHTML = timestampText(note.updatedAt)



    } else {
        console.log (`other key changed: ${e.key}`)
    }
})
