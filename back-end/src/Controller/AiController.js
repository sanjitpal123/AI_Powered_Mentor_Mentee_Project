import { json } from "express";
import CreateCollection from "../config/CreateCollectionOFChromaDb.js";
import cohere from "../config/OpenAi.js";
import message from "../Model/Message.js";
import {
  GetAllMenteeService,
  GetMenteeByIdService,
} from "../Services/Mentee.js";
import { GetAllMentorsService } from "../Services/Mentor.js";
import { GettingMenteeById } from "../Services/User.service.js";
import Embedding from "./Embedding.js";
import { GetAllMentos } from "./Mentor.js";
import dotenv from "dotenv";
dotenv.config();

import { Groq } from "groq-sdk";
import {
  MenteeProfileAnalizeService,
  ReviewAnalizer,
} from "../Services/AiFeatures.js";
import Retrieve from "../Utils/Retrieve.js";
import { AskQuestion } from "../Utils/AskQuestion.js";
import { AgenticGraph } from "../AgenticRag/graph.js";

const groq = new Groq({ apiKey: process.env.GROQ_API });
const app = AgenticGraph.compile();


export const GenerateBio = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExist = await GettingMenteeById(id);

    if (!UserExist) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const { role, skills, name } = UserExist;
    const prompt = `Write a professional and concise bio for ${name}, who is a ${role} skilled in ${skills.join(
      ", ",
    )} and it should be in 100words and give bio as a first person like i am writing not he is or she is , it should be i am . and don't use `;

    const result = await cohere.generate({
      model: "command", // Use "command-nightly" only if you're approved
      prompt,
      max_tokens: 150,
    });

    const bio = result.generations[0].text.trim(); // ✅ fixed this line

    return res.status(201).json({
      message: "Bio generated successfully",
      success: true,
      bio,
    });
  } catch (error) {
    console.error("Cohere bio generation error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

async function MentorSearch(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant who helps a mentee find the perfect mentor based on their interests. 
Your output should ONLY be valid JSON in this format:
{
  "id": "01",
  "name": "Sanjit",
  "skills": ["python", "react"],
  "profilePicture": "https://example.com/image.jpg"
} and only search mentor from my context not from anything , like browser or etc , if there is not 5 mentor for specific skills , so no need five show whatever is there`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-120b", // adjust to your available model
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      reasoning_effort: "medium",
      stream: false,
    });

    // Extract and parse JSON
    const message = chatCompletion.choices[0].message.content;
    const mentorData = JSON.parse(message);

    return mentorData;
  } catch (error) {
    console.error("Error during mentor search:", error);
    throw error;
  }
}

async function GenerateTask(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "system",
          content: `You are an AI quiz generator for a mentor.  
The mentor will provide a topic.  
Based on that topic, you must create quiz questions in the following strict JSON format:

[
  {
    "question": "<question text>",
    "choice1": "<option 1>",
    "choice2": "<option 2>",
    "choice3": "<option 3>",
    "choice4": "<option 4>",
    "answer": "<correct answer exactly matching one choice>" like below

    answer
: 
"Duck"
choice1
: 
"Bowled"
choice2
: 
"Lbw"
choice3
: 
"Run out"
choice4
: 
"Duck"
question
: 
"What is the term for a batsman who is out without scoring any runs?"
_id
: 
"691836087ae0305e97f3f110"
  }
]

Rules:
- Output ONLY valid JSON.
- No explanations.
- answer should not be like d , a etc
- Minimum 1 question unless the mentor asks for more.
- "answer" must match exactly one of the 4 choices.
- Difficulty should match the topic level (basic/advanced).
`,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    const res = chatCompletion.choices[0].message.content;
    console.log("quize", chatCompletion.choices[0].message.content);
    const parsed = JSON.parse(res);
    return parsed;
  } catch (error) {
    console.log("error", error);
  }
}
// async function Storementors() {
//   try {
//     const collection = await CreateCollection();
//     const allMentors = await GetAllMenteeService();
//     const ids = allMentors.map((m) => m._id.toString());
//     const documents = allMentors.map(
//       (m) => `Mentor ${m.name} is skilled in ${m.skills.join(" ,")}`
//     );
//     const metadatas = allMentors.map((m) => ({
//       name: m.name,
//       id: m._id,
//       skills: m.skills.join(" ,"),
//       profilePicture: profilePicture || "",
//     }));
//     const embeddings = await Promise.all(
//       allMentors.map((m) =>
//         Embedding(`Mentor skilled in ${m.skills.join(" ,")}`)
//       )
//     );
//     await collection.add({
//       ids,
//       documents: documents,
//       metadatas: metadatas,
//       embeddings: embeddings,
//     });
//     console.log("stored");
//   } catch (error) {
//     console.log("error to stored", error);
//   }
// }
async function StoreMentors() {
  try {
    const collection = await CreateCollection();
    const mentors = await GetAllMentorsService();
    const embeedings = Promise.all(
      mentors.map((m) =>
        Embedding(`Mentor ${m.name} is skilled in ${m.skills.join(" ,")}`),
      ),
    );
    const documents = mentors.map(
      (m) => `Mentor ${m.name} is skilled in ${m.skills.join(" ,")}`,
    );

    const ids = mentors.map((m) => m._id);
    const metadatas = mentors.map((m) => ({
      name: m.name,
      profile: m.profilePicture || " ",
      id: m._id,
      skills: m.skills.join(" ,"),
    }));

    await collection.add({
      ids,
      metadatas,
      documents,
      embeddings: embeedings,
    });
    console.log("stored successfully");
  } catch (error) {
    console.log("error", error);
  }
}

export const RetriveTopMatchMentor = async (req, res) => {
  try {
    const user = req.user.userId;
    const userProfile = await GetMenteeByIdService(user);
    console.log("userpfoile", userProfile);
    const collection = await CreateCollection();
    const count = collection.count();
    if (count === 0) {
      console.log("call store function to store mentor  ");
      Storementors();
    } else {
      console.log("store collection");
    }

    const question = `Mentor is interested in learning ${userProfile.skills.join(
      " ,",
    )}   `;
    const embedding = await Embedding(question);
    const result = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 10,
    });

    console.log("result", result);
    if (result.metadatas[0].length === 0) {
      return res.status(404).json({
        message: "No Mentor Found ",
        success: false,
      });
    }

    const prompt = `question : ${question} and option  is ${JSON.stringify(
      result.metadatas[0],
    )} and only 4 mentors mentee wants `;
    console.log("prompt", prompt);
    const mentorsbyai = await MentorSearch(prompt);
    console.log("mentors by ai ", mentorsbyai);
    return res.status(201).json({
      message: "Mentors By AI ",
      mentorsbyai,
    });
  } catch (error) {
    console.log("error to get mentor by ai", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const RetrieveTopMatchMentor = async (req, res) => {
//   try {
//     const collection = await CreateCollection();
//     const question = `Mentee want to learn python`;
//     const questionEmbedding = await Embedding(question);
//     const result = await collection.query({
//       queryEmbeddings: [questionEmbedding],
//       nResults: 10,
//     });
//     if (result.metadatas[0].length === 0) {
//       return res.status(404).json({
//         message: "Did not get anything ",
//         success: false,
//       });
//     }

//     const prompt = `question is ${question} and mentor options  are ${JSON.stringify(
//       result.metadatas[0]
//     )}`;
//     const final_result = await MentorSearch(prompt);
//     console.log("final result");
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const MenteeProfileAnalizeByAi = async (req, res) => {
  try {
    const userId = req.user.userId;
    const menteeprofile = await GetMenteeByIdService(userId);
    const response = await MenteeProfileAnalizeService(menteeprofile);
    if (response) {
      return res.status(201).json({
        message: "yes got res",
        response,
      });
    }
    return res.status(404).json({
      message: "not got any response",
      success: false,
    });
  } catch (error) {
    console.log("error to get mentee profile analize by ai", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const ReviewAnalizedByAi = async (req, res) => {
  try {
    const user = req.user.userId;
    const profile = await GetMenteeByIdService(user);
    const resonse = await ReviewAnalizer(profile);
    console.log("review analize by ai ", resonse);
    if (!resonse) {
      return res.status(404).json({
        message: "did not get response",
        success: false,
      });
    }
    return res.status(201).json({
      message: "got review analized",
      resonse: resonse,
    });
  } catch (error) {
    console.log("error ", error);
    return res.status(501).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const TaskCreation = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.trim() === "") {
      return res.status(400).json({
        message: "Topic is required",
        success: false,
      });
    }

    const response = await GenerateTask(topic);

    // Check if response is empty
    if (!response || (Array.isArray(response) && response.length === 0)) {
      return res.status(404).json({
        message: "Could not create task",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Task is created by AI",
      task: response,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const RagSystem = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        message: "Please provide question",
        success: false,
      });
    }

    console.log("question:", question);

    const retrieve = await Retrieve(question);

    const context = retrieve.map((doc) => doc.pageContent).join("\n\n");

    console.log("context:", context);

    const systemPrompt = `
You are an AI assistant.
Answer ONLY based on the provided context.
If the answer is not in the context, say "I don't know".
`;

    const userPrompt = `
Context:
${context}

Question:
${question}
`;

    const answer = await AskQuestion(systemPrompt, userPrompt);

    console.log("answer:", answer);

    if (!answer) {
      return res.status(500).json({
        message: "Could not generate answer",
        success: false,
      });
    }

    return res.status(200).json({
      answer,
      success: true,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const AgenticRag = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { query } = req.body;
    const userProfile = await GetMenteeByIdService(userId);
    const userProfileData = {
      name: userProfile.name,
      sessions: userProfile.sessions,


    }
    const response = await app.invoke({
      messages: {
        role: "user",
        content: query
      },
      userId: userId,
      userProfile: userProfileData

    });
    return res.status(201).json({
      message: response.messages[response.messages.length - 1].content
    });

  } catch (error) {
    console.log('error', error)
  }
}
