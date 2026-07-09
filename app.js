const STORAGE_KEY ="markdown-live-previewer:draft";

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const status = document.getElementById("status");
const clearBtn = document.getElementById("clear-btn");

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    }

}

function render(markdown) {
    const rawHtml = marked.parse(markdown);
    preview.innerHTML = DOMPurify.sanitize(rawHtml);
}


function render(markdown) {
  const rawHtml = marked.parse(markdown);
  preview.innerHTML = DOMPurify.sanitize(rawHtml);
}

function persist(markdown) {
  localStorage.setItem(STORAGE_KEY, markdown);
  status.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
}

const debouncedPersist = debounce(persist, 400);

editor.addEventListener("input", () => {
  const markdown = editor.value;
  render(markdown);
  debouncedPersist(markdown);
});

clearBtn.addEventListener("click", () => {
  editor.value = "";
  localStorage.removeItem(STORAGE_KEY);
  render("");
  status.textContent = "Draft cleared.";
  editor.focus();
});

const savedDraft = localStorage.getItem(STORAGE_KEY);
const initial = savedDraft ?? "# Hello Markdown\n\nStart typing on the left to see HTML render on the right.\n\n- Live preview\n- Debounced autosave\n- XSS-safe via DOMPurify\n";
editor.value = initial;
render(initial);
status.textContent = savedDraft ? "Draft restored from localStorage." : "No saved draft yet.";
