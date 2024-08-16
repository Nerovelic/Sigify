import Documento from "./Documento";
import {
  loadDataFromJson,
  saveToJSON,
  deleteJSONFile,
} from "../../utils/jsonHandler";

export async function generateStaticParams() {
  // Cargar los datos desde el archivo JSON
  const storedFiles = loadDataFromJson("uploadedPdfs.json");

  // Si no hay datos, retorna un array vacío para evitar errores
  if (!storedFiles || storedFiles.length === 0) {
    return [];
  }

  // Generar los parámetros estáticos basados en los datos cargados
  return storedFiles.map((file: { id: number }) => {
    return { id: file.id.toString() };
  });
}

const Page = () => {
  return <Documento />;
};

export default Page;
