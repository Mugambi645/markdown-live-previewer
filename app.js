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

