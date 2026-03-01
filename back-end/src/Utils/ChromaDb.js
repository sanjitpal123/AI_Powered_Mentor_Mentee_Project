// import { ChromaClient } from "chromadb";
// import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

// let chromaclient;
// let Embeded;
// let collection;

// export const initChroma = async () => {
//   chromaclient = new ChromaClient({ persistDirectory: "./chroma-db" });
//   Embeded = new DefaultEmbeddingFunction();
//   collection = await chromaclient.getOrCreateCollection({ name: "mentors" });
//   return { chromaclient, Embeded, collection };
// };
