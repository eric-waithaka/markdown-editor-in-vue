new Vue({
    e1: '#notebook',

    data () {
        return {
            content: JSON.PARSE(localStorage.getItem('notes')) || 'You can write in **markdown**',

            notesArray: [],

            selectedId: localStorage.getItem('selectedId') || null
        }
    },

    computed: {
        notePreview () {
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },

        selectedNote () {
            //returns the matching note with the selectedId
            return this.notesArray.find(note => note.id === selectedId)
        },

        sortedNotes () {
            return this.notes.slice()
                .sort((a,b) => a.created - b.created)
                .sort((a,b) => (a.favourite === b.favourite) ? 0
                    : a.favourite? -1
                    : 1)
        },
    },

    watch: {
        notes: {
            handler: 'saveNotes',

            //this is to watch each note's properties inside the array
            deep: true,
        },

        selectedId (val) {
                localStorage.setItem('selectedId', val)
        },       

    },

    methods: {
        saveNote () {
            localStorage.setItem('content', this.content)
        },

        addNote () {
            const time = Date.now()

            //creates new note
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: 'This is a new note',
                created: time,
                favourite: false
            }

            //Adds note to notesArray
            this.notesArray.push(note)
        },

        selectNote (note) {
            this.selectedId = note.id
        },

        saveNotes () {
            localStorage.setItem('notes', JSON.stringify(this.notesArray))
            console.log('Notes saved!', new Date())
        },

        removeNote () {
            if (this.selectedNote && confirm('Delete the note?')) {
                //removes note from notesArray
                const index = this.notesArray.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },

        favourite () {
            this.selectedNote.favourite = !this.selectedNote.favourite
        },

    },
})