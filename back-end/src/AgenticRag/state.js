import { Annotation } from "@langchain/langgraph";

export const state = Annotation.Root({
    messages: Annotation({
        reducer: (left, right) => {
            return [...left, ...(Array.isArray(right) ? right : [right])]
        },
        default: () => []
    }),
    nextRepresentative: Annotation({
        reducer: (_, r) => {
            return r
        },
        default: () => null
    }),
    userId: Annotation({
        reducer: (_, y) => y,
        default: () => null,
    }),

    userProfile: Annotation({
        reducer: (_, y) => y,
        default: () => null,
    }),
})