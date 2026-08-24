import SecureLS from "secure-ls";
import CryptoJS from "crypto-js";

const SECRET = import.meta.env.VITE_ENCRYPTION_SECRET || "message-central-secure-key-2024";

// Initialize SecureLS with AES encryption and compression
const SecureLSConstructor = SecureLS.default || SecureLS;
const ls = new SecureLSConstructor({
  encodingType: "aes",
  isCompression: true,
  encryptionSecret: SECRET,
});

/**
 * Hashes the storage key to obscure it in LocalStorage.
 * @param {string} key 
 * @returns {string}
 */
const hashKey = (key) => {
  if (!key) return "";
  return CryptoJS.SHA256(key + SECRET).toString().substring(0, 32);
};

/**
 * Securely retrieves data from LocalStorage
 * @param {string} key 
 * @returns {any}
 */
export const getStoredData = (key) => {
  try {
    const hashed = hashKey(key);
    const raw = ls.get(hashed);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Securely saves data to LocalStorage with AES-256
 * @param {string} key 
 * @param {any} data 
 */
export const setStoredData = (key, data) => {
  try {
    const hashed = hashKey(key);
    ls.set(hashed, JSON.stringify(data));
  } catch (e) {
    console.error("Secure storage write error:", e);
  }
};

// ============================================================================
// INDEXEDDB STORAGE FOR NOTES
// ============================================================================
const DB_NAME = "ReCallNotesDB";
const DB_VERSION = 1;
const STORE_NAME = "notes";
const DISCLAIMER_KEY = "recall_notes_disclaimer_accepted_v1";

let dbPromise = null;

const openDB = () => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("category", "category", { unique: false });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
        store.createIndex("isPinned", "isPinned", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error);
    };
  });

  return dbPromise;
};

/**
 * Retrieves all saved notes from browser IndexedDB
 */
export const getAllNotes = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const notes = request.result || [];
        // Sort: Pinned notes first, then by updatedAt descending
        notes.sort((a, b) => {
          if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        resolve(notes);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("Error loading notes from IndexedDB:", e);
    return [];
  }
};

/**
 * Saves or updates a note object in browser IndexedDB
 */
export const saveNote = async (note) => {
  try {
    const db = await openDB();
    const now = new Date().toISOString();
    const noteToSave = {
      id: note.id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: note.title?.trim() || "Untitled Note",
      content: note.content || "",
      category: note.category || "General",
      color: note.color || "amber",
      isPinned: Boolean(note.isPinned),
      createdAt: note.createdAt || now,
      updatedAt: now,
      tags: Array.isArray(note.tags) ? note.tags : []
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(noteToSave);

      request.onsuccess = () => resolve(noteToSave);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("Error saving note to IndexedDB:", e);
    throw e;
  }
};

/**
 * Deletes a note by ID from IndexedDB
 */
export const deleteNote = async (id) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("Error deleting note from IndexedDB:", e);
    return false;
  }
};

/**
 * Clears all notes from IndexedDB
 */
export const clearAllNotes = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("Error clearing notes from IndexedDB:", e);
    return false;
  }
};

/**
 * Gets whether user has accepted the local storage disclaimer
 */
export const getNotesDisclaimerAccepted = () => {
  return Boolean(getStoredData(DISCLAIMER_KEY));
};

/**
 * Sets user disclaimer acceptance state
 */
export const setNotesDisclaimerAccepted = (accepted = true) => {
  setStoredData(DISCLAIMER_KEY, accepted);
};
