import { LOADED, NEW_NOTES, DELETE_INDEX_NOTE, EDIT_INDEX_NOTE } from '../constants';

//PostsLoad
export function loadPosts(posts) {
  return {
    type: LOADED,
    payload: posts
  }
}

//NotesUsers
const timeFormat = (date) => {
  const addZero = (data) => (data < 10) ? '0' + data : data;
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
};

const generateId = function(len) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export function newNotes(title, text) {
  const date = new Date();

  return {
    type: NEW_NOTES,
    payload: generateId(6),
    createDate: timeFormat(date),
    title,
    text
  }
}

export function delIndexNote(id) {
  return {
    type: DELETE_INDEX_NOTE,
    payload: id
  }
}

export function editIndexNote(id, title, text) {
  return {
    type: EDIT_INDEX_NOTE,
    payload: id,
    title,
    text
  }
}

