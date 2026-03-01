// import { ChromaClient } from "chromadb";
// import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

// let chromaclient;
// let Embeded;
// let collection;

// export const initChroma = async () => {
//   chromaclient = new ChromaClient({
//     host: "http://localhost:8000", // works if backend runs on host
//     apiVersion: "v2", // IMPORTANT: use v2
//   });

//   Embeded = new DefaultEmbeddingFunction();

//   collection = await chromaclient.getOrCreateCollection({
//     name: "mentors",
//     embeddingFunction: Embeded,
//   });

//   console.log("Chroma DB initialized!");
//   return { chromaclient, Embeded, collection };
// };
