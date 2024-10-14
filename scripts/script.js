import {loadMenu} from "./menu.js"

loadMenu()
let MENU;
let MENU_BUTTON_COMMENT;
let MENU_BUTTON_HIGHLIGHT;
let SELECTED_TEXT;

const longPressDuration = 300;
let pressTimer;


hljs.highlightAll();
const editableDiv = document.getElementById('editable');

document.addEventListener('keydown', function (event) {
  // Check if Ctrl key and F5 key are pressed together
  if (event.key === 'F5') {
    window.localStorage.clear(); // Clears localStorage
  }
});

// Load saved content on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedContent = localStorage.getItem('editableContent');
  if (savedContent) {
    editableDiv.innerHTML = savedContent;
    addListenersToHighlightedText();
  }

  function addListenersToHighlightedText() {
    document.querySelectorAll('.menu').forEach((menu) => menu.remove());
    document.querySelectorAll('.commented-text').forEach((comment) => {
      comment.addEventListener('mouseup', (event) => removeHighlight(event));
    });
    document.querySelectorAll('.highlight').forEach((higlight) => {
      higlight.addEventListener('mouseup', (event) => removeHighlight(event));
    });
  }
});

document.addEventListener('mouseup', event => textSelected(event));
document.addEventListener('touchstart', (event) => {
  pressTimer = setTimeout(() => onLongPress(event), longPressDuration);
});
document.addEventListener('touchend', (event) => {
  clearTimeout(pressTimer);
  textSelected(event)
});
// document.addEventListener('touchmove', () => clearTimeout(pressTimer))


function textSelected(event) {
    SELECTED_TEXT = window.getSelection();
    hideMenu();
    if (SELECTED_TEXT.rangeCount > 0) {
      let range = SELECTED_TEXT.getRangeAt(0);
      if (!range.collapsed) {
        showMenu(range, event);
        SELECTED_TEXT.removeAllRanges();
      }
    }
}

function createHighlightMenuButton(range) {
  MENU_BUTTON_HIGHLIGHT = document.createElement('button');
  MENU_BUTTON_HIGHLIGHT.classList.add('menu-button');
  MENU_BUTTON_HIGHLIGHT.addEventListener('mouseup', () => highLightTextWithColor(range));
  MENU_BUTTON_HIGHLIGHT.addEventListener('touchstart', () => highLightTextWithColor(range));
  MENU.appendChild(MENU_BUTTON_HIGHLIGHT);
}

function createCommentMenuButton(range) {
  MENU_BUTTON_COMMENT = document.createElement('button');
  MENU_BUTTON_COMMENT.classList.add('menu-button');
  MENU_BUTTON_COMMENT.addEventListener('mouseup', () => {
    highLightAndComment(range);
  });
  MENU.appendChild(MENU_BUTTON_COMMENT);
}

function highLightTextWithColor(range) {
  let fragment = range.extractContents();
  let highlight = document.createElement('span');
  highlight.addEventListener('mousedown', (event) => removeHighlight(event));
  highlight.classList.add('highlight');
  highlight.appendChild(fragment);
  range.insertNode(highlight);
  saveContent();
}

function highLightAndComment(range) {
  // Prompt the user to enter a comment
  const comment = prompt('Enter your comment:');
  if (!comment) return; // Exit if no comment is provided

  // Create a span to wrap the selected text
  const highLightedComment = document.createElement('span');
  highLightedComment.classList.add('commented-text');
  highLightedComment.setAttribute('data-comment', comment);
  highLightedComment.addEventListener('mouseup', (event) => {
    if (!event.ctrlKey) {
      let comment = prompt('Enter your comment:');
      event.target.setAttribute('data-comment', comment);
    } else {
      removeHighlight(event);
    }
  });

  range.surroundContents(highLightedComment);
  saveContent();
}

function removeHighlight(event = null, longPress) {
  window.getSelection();
  const span = event.target;
  console.log("span: ", span)
  console.log("span.classList.contains('highlight'): ", span.classList.contains("highlight"))
  if (event.ctrlKey || longPress && span.classList.contains("highlight")) {
    while (span.firstChild) span.parentNode.insertBefore(span.firstChild, span);
    span.remove();
    saveContent();
  }
}

function showMenu(range, event) {
  MENU = document.createElement('span');
  MENU.classList.add('menu');
  createHighlightMenuButton(range);
  createCommentMenuButton(range);
  range.insertNode(MENU);
  MENU.style.left = `${event.pageX - 20}px`;
  MENU.style.top = `${event.pageY + 20}px`;
}

function hideMenu() {
  if (MENU != undefined) {
    MENU.classList.remove('menu');
    MENU_BUTTON_HIGHLIGHT.remove('menu-button');
    MENU_BUTTON_COMMENT.remove('menu-button');
  }
}

function onLongPress(event) {
  removeHighlight(event, true)
}

// Save content to localStorage
function saveContent() {
  const content = editableDiv.innerHTML;
  localStorage.setItem('editableContent', content);
}

// Clear saved content from localStorage
function clearSavedContent() {
  localStorage.removeItem('editableContent');
  location.reload();
}