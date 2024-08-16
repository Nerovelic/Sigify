import fs from "fs";
import path from "path";

// Ruta al archivo JSON
const jsonDirectory = path.join(process.cwd(), "data", "uploadedPdfs.json");

// Crear una carpeta y archivo page.tsx dinámicamente para un documento específico
export function createDocumentDirectory(id: number) {
  const dirPath = path.join(
    process.cwd(),
    "src/app/listaDocumentos", 
    id.toString()
  );
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(
      path.join(dirPath, "page.tsx"),
      `import Documento from '../Documento';
  
  export default function Page() {
    return <Documento id={${id}} />;
  }`
    );
  }
}

// Eliminar la carpeta y archivo page.tsx asociado a un documento específico
export function deleteDocumentDirectory(id: number) {
  const dirPath = path.join(
    process.cwd(),
    "src/app/listaDocumentos",
    id.toString()
  );
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

// Función para cargar datos desde un archivo JSON
export function loadDataFromJson(filename: string): any[] {
  try {
    const filePath = path.join(jsonDirectory, filename);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents);
    }
    return []; // Retornar un array vacío si el archivo no existe
  } catch (error) {
    console.error(`Error al cargar datos desde ${filename}:`, error);
    return []; // En caso de error, retornar un array vacío
  }
}

// Función para guardar datos en el archivo JSON
export function saveToJSON(data: any) {
  try {
    // Verifica si la carpeta 'data' existe; si no, créala
    if (!fs.existsSync(path.dirname(jsonDirectory))) {
      fs.mkdirSync(path.dirname(jsonDirectory), { recursive: true });
    }

    // Escribe los datos en el archivo JSON
    fs.writeFileSync(jsonDirectory, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error al guardar el archivo JSON:", error);
  }
}

// Función para agregar un archivo subido al JSON
export function saveUploadedFile(file: {
  id: number;
  name: string;
  path: string;
}) {
  try {
    let data = [];

    // Si el archivo ya existe, lee su contenido y añádelo a los datos existentes
    if (fs.existsSync(jsonDirectory)) {
      data = JSON.parse(fs.readFileSync(jsonDirectory, "utf-8"));
    }

    // Añade el nuevo archivo a los datos
    data.push(file);

    // Guarda los datos actualizados en el archivo JSON
    saveToJSON(data);
  } catch (error) {
    console.error("Error al guardar el archivo subido:", error);
  }
}

// Función para leer los datos del archivo JSON
export function getStoredFiles() {
  try {
    if (!fs.existsSync(jsonDirectory)) {
      return []; // Retorna un array vacío si no hay archivos
    }

    return JSON.parse(fs.readFileSync(jsonDirectory, "utf-8"));
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return [];
  }
}

// Función para eliminar el archivo JSON
export function deleteJSONFile() {
  try {
    if (fs.existsSync(jsonDirectory)) {
      fs.unlinkSync(jsonDirectory); // Elimina el archivo
      console.log("Archivo JSON eliminado.");
    }
  } catch (error) {
    console.error("Error al eliminar el archivo JSON:", error);
  }
}

// Función para generar los parámetros estáticos
export async function generateStaticParams() {
  const storedFiles = getStoredFiles();
  const params = storedFiles.map((file: { id: number }) => {
    return { id: file.id.toString() };
  });

  // Puedes eliminar el archivo si ya no lo necesitas
  deleteJSONFile();

  return params;
}
