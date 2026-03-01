import path from "path";
import fs from "fs";
import SplitDocument from "../Utils/SplitDocument.js";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const LoadDocument = async () => {
  try {
    const filePath = path.join(
      process.cwd(),
      "Mentor_Mentee_RAG_KB_Sanjit_Pal.pdf",
    );

    console.log("Path:", filePath);
    console.log("File exists:", fs.existsSync(filePath));

    const loader = new PDFLoader(filePath, {
      splitPages: false,
    });

    const docs = await loader.load();

    console.log("Loaded docs:", docs.length);

    await SplitDocument(docs[0].pageContent);
  } catch (error) {
    console.log("error to get load documents", error);
  }
};
