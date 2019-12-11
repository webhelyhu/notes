// read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }


    // if (notesJSON !== null) {
    //     return JSON.parse(notesJSON)
    // } else {
    //     return []
    // }
}

const formattedDate = function (value) {
    return moment(value).format("YYYY. MM. DD. HH:mm:ss")
    
}


const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = function (id) {
    const noteIndex = notes.findIndex(note => note.id === id)
    if (noteIndex > -1 ) {
        notes.splice(noteIndex,1)
    }
}

// generate the DOM structure for a note  -- on main page
const generateNoteDOM = function (note) {
    const elem = document.createElement('a')
    // const button = document.createElement('button')
    const eText = document.createElement('p')
    const eStatus = document.createElement('p')

    // setup the main text of the note
    if (note.title.length > 0) eText.textContent = note.title 
    else eText.textContent = 'unnamed note'
    eText.classList.add('list-item__title')
    
    eStatus.textContent = " (" + formattedDate(note.createdAt) + ", last updated:" + formattedDate(note.updatedAt) + ")"
    eStatus.classList.add('list-item__subtitle')
    
    // setup button
    // button.textContent = 'x'
    // button.addEventListener('click', function () {
        //     removeNote(note.id)
        //     saveNotes (notes)
        //     renderNotes (notes, filters)
        // })
        
    // eText.setAttribute('href', "/edit.html#"+note.id)
    // elem.appendChild(button)
    elem.setAttribute('href', "/edit.html#"+note.id)
    elem.classList.add('list-item')

    elem.appendChild(eText)
    elem.appendChild(eStatus)
    return elem
}


// sortNotes
const sortNotes = function (notes, sortBy) {
    // három változat a rendezésre
    // console.log (`sortNotes called with ${sortBy}`)
    if (sortBy === 'byEdited') {
        return notes.sort(function(a,b){
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated'){
        return notes.sort(function(a,b){
            // console.log(`comparing ${a.createdAt} and ${b.createdAt}`)
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical'){
        return notes.sort(function(a,b){
            // console.log(`comparing ${a.title.toLowerCase()} and ${b.title.toLowerCase()}`)
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}


// render all the notes
const renderNotes = function (notes, filters) {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter( note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    const NotesEl = document.querySelector('#notes')

    // remove all previous rendered content from the notes-area
    NotesEl.innerHTML = ''

    //új szűrőfeltételnek megfelelő jegyzetek listája újraépítése
    if (filteredNotes.length < 1) {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = '--- No notes ---'
        emptyMessage.classList.add('empty-message')
        NotesEl.appendChild(emptyMessage)
    } else {
        filteredNotes.forEach( function (note){
            const elem = generateNoteDOM(note)
            NotesEl.appendChild(elem)
        })
    }
}

