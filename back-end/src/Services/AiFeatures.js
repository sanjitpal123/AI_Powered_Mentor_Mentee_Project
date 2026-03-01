import { Groq } from "groq-sdk";

import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API });

export const MenteeProfileAnalizeService = async (MenteeProfileData) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an intelligent progress summary assistant. You will receive a JSON object containing a user’s activity data — including the number of active days, completed tasks, previous scores, achievements, and other metrics. Your goal is to analyze this data and generate a concise, engaging, and motivating summary of the user’s progress.

Your summary should:

Highlight key achievements (e.g., consistency, score improvements, milestones).

Mention specific metrics (active days, total tasks, average score, etc.) in a natural way.

Provide an encouraging tone that motivates the user to continue improving.

Keep the summary personalized and human-like (avoid robotic tone).

Example Output:

🌟 Great work, Alex! You’ve been active for 12 days this month, completing 8 tasks with an impressive average score of 87% — up 10% from last week! Your consistency is paying off — keep this momentum going and you’ll reach your next milestone in no time.


should not content : /n or ** / this kind of special character in ouput `,
        },
        {
          role: "user",
          content: `Object is ${MenteeProfileData}`,
        },
      ],
      model: "openai/gpt-oss-120b",
      temperature: 1,

      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
      stop: null,
    });

    console.log("responsove from ai ", chatCompletion);
    const res = chatCompletion.choices[0].message.content;
    return res;
  } catch (error) {
    console.log("error to analize mentee profile", error);
  }
};

export const ReviewAnalizer = async (reviews) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an intelligent review analyzer. You will receive a JSON object containing multiple user reviews of a product, service, or app.

Your goal is to:
1. Analyze each review and classify it as **positive**, **negative**, or **neutral**.
2. Calculate what percentage of total reviews fall into each category.
3. Generate a **final summary text** that concisely describes the overall sentiment trend in a natural, human-like tone — avoid robotic phrasing.

### Output Format:
Return a JSON object like this:
{
  "positive": "65%",
  "negative": "20%",
  "neutral": "15%",
  "summary": "Most users had a great experience! Around two-thirds of the reviews were positive, while a few mentioned minor issues."
}

Important:
- Do not include line breaks (/n), markdown (**), or special formatting in the output.
- Keep the summary tone clear, conversational, and insightful. i don't want any special character in between summary text , i want proper object like output like below one Return a JSON object like this:
{
  "positive": "65%",
  "negative": "20%",
  "neutral": "15%",
  "summary": "Most users had a great experience! Around two-thirds of the reviews were positive, while a few mentioned minor issues."
}  , note there should not be any "/n in response , should not follow below kind of response  "{\"positive\":\"100%\",\"negative\":\"0%\",\"neutral\":\"0%\",\"summary\":\"All the feedback is upbeat and encouraging, with every comment praising Kunal’s progress and offering constructive encouragement.\"} 
  
"
should not be :
\"positive\" kind of things after key and after value 
`,
        },
        {
          role: "user",
          content: `Reviews data: ${reviews}`, // e.g. reviewsData is an array of review texts or objects
        },
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
      stop: null,
    });
    const res = chatCompletion.choices[0].message.content;
    console.log("response to get anailized ai", res);
    return res;
  } catch (error) {
    console.log("error to analize review", error);
  }
};
