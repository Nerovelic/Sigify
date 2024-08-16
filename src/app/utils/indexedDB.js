// Abrir la base de datos
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("pdfs", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(`IndexedDB error: ${event.target.errorCode}`);
    };
  });
};

// Guardar un blob en IndexedDB
export const saveBlobToIndexedDB = async (blob, id) => {
  const db = await openDatabase();
  const transaction = db.transaction(["pdfs"], "readwrite");
  const store = transaction.objectStore("pdfs");

  const request = store.put({ id: id, blob: blob });

  request.onsuccess = () => {
    console.log("Blob guardado con éxito en IndexedDB");
  };

  request.onerror = (event) => {
    console.error(
      "Error al guardar el blob en IndexedDB:",
      event.target.errorCode
    );
  };
};

// Obtener un blob de IndexedDB
export const getBlobFromIndexedDB = async (id) => {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabase();
    const transaction = db.transaction(["pdfs"], "readonly");
    const store = transaction.objectStore("pdfs");

    const request = store.get(id);

    request.onsuccess = (event) => {
      if (event.target.result) {
        resolve(event.target.result.blob);
      } else {
        reject("No se encontró el blob con ese ID en IndexedDB");
      }
    };

    request.onerror = (event) => {
      reject(
        `Error al recuperar el blob de IndexedDB: ${event.target.errorCode}`
      );
    };
  });
};

// Mostrar PDF
export const displayPdf = async (id) => {
  try {
    const blob = await getBlobFromIndexedDB(id);
    const url = URL.createObjectURL(blob);
    document.querySelector("#pdfViewer").src = url;
  } catch (error) {
    console.error(error);
  }
};
