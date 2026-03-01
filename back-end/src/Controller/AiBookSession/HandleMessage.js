import extractGoal from "./MenteeGoal";
import GetTopMentor from "./RetrieveTopMentor";

async function handleMessage(message, state) {
  if (!state.goal) {
    state.goal = await extractGoal(message);
    const suggestedMentors = await GetTopMentor(state.goal);
    return {
      reply:
        "Here are the top mentors based on your goal " +
        state.suggestedMentors
          .map((m, i) => `${i + 1}. ${m.metadata.name} - ${m.metadata.skills}`)
          .join("/") +
        "which mentor would you like ?",
      state,
    };
  }
  if(!state.goal=="")
}
