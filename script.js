// const getElement = (el) => document.querySelector(`.${el}`);

// const addBtn = getElement('add');
// console.log(addBtn);

// load notes from LS
let notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}
const addBtn = document.querySelector('.add');

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
    <div class="tools">
        <button class="preview-toggle">
        <i class="fa-solid fa-eye"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    <div class="preview-content"></div>
    <textarea class="hidden"></textarea>
  `;

  //   get all elements
  const deleteBtn = note.querySelector('.delete');
  const previewBtn = note.querySelector('.preview-toggle');
  const previewContent = note.querySelector('.preview-content');
  const textArea = note.querySelector('textarea');

  //   set content for textArea and previewContent
  previewContent.innerHTML = marked.parse(text);
  textArea.value = text;

  //   delete a note
  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  //   edit a note
  textArea.addEventListener('input', (e) => {
    const content = e.target.value;
    previewContent.innerHTML = marked.parse(content);
    // TODO: save to LS
    updateLS();
  });

  //   toggle preview
  previewBtn.addEventListener('click', () => {
    previewContent.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  //   handle click event on previewContent
  previewContent.addEventListener('click', () => {
    previewContent.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
    // move cursor to end of text when user clicks on content section
    const end = textArea.value.length;
    textArea.setSelectionRange(end, end);
    // focus on the end of textArea
    textArea.focus();
  });
  document.body.appendChild(note);
}

// update Local Storage
// grab content from all text areas then push it to notes array
// then save to LS
function updateLS() {
  const notes = [];
  const notesText = document.querySelectorAll('textarea');
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem('notes', JSON.stringify(notes));
}
