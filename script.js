const addBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancel');
const saveBtn = document.getElementById('save');
const noteContainer = document.querySelector('.notes-container');
const editBtn = document.getElementById('edit');
let oldNote = null;
addBtn.addEventListener('click', () => {
  document.querySelector('.note-hub').style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    if(oldNote!=null){
        noteContainer.appendChild(oldNote);
        oldNote=null;
        document.querySelector('input').value = "";
        document.querySelector('textarea').value = "";
    }
  document.querySelector('.note-hub').style.display = 'none';
  saveNotes()
});

saveBtn.addEventListener('click', () => {
    let inputBox = document.querySelector('input');
    let noteText = document.querySelector('textarea');
    if (inputBox.value === "" || noteText.value === "") {
        alert('You need to write something');
    }
    else{
        let note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
        <div class="actions">
            <h3>${inputBox.value}</h3>
            <div class="icons">
                <i class="fa-solid fa-trash" id = "delete" style="color: #000000;"></i>
                <i class="fa-solid fa-edit" id = "edit" style="color: #000000;"></i>
            </div>
        </div>
        <p>${noteText.value}</p>
        `;
        noteContainer.appendChild(note);
        document.querySelector('.note-hub').style.display = 'none';
        noteText.value = "";
        inputBox.value = "";
    }
    saveNotes();
});
noteContainer.addEventListener('click', (event) => {
    if (event.target.id === 'delete') {
        const note = event.target.closest('.note');
        note.remove();
        saveNotes();
        oldNote = null;
    }
});
noteContainer.addEventListener('click', (event) => {
    oldNote = event.target.closest('.note');
    if (event.target.id === 'edit') {
        const note = event.target.closest('.note');
        const noteText = note.querySelector('p').innerText;
        const noteTitle = note.querySelector('h3').innerText;
        const inputBox = document.querySelector('input');
        const noteInput = document.querySelector('textarea');
        inputBox.value = noteTitle;
        noteInput.value = noteText;
        note.remove();
        document.querySelector('.note-hub').style.display = 'flex';
        saveNotes();
    }
});
function saveNotes(){
    localStorage.setItem('2', noteContainer.innerHTML);
}
function showNotes(){
    noteContainer.innerHTML=localStorage.getItem('2');
}

showNotes();
