import User from "../Model/UserSchema.js";
// export const SearchMentorRepo = async (query) => {
//   try {
//     console.log("qeury", query);
//     const baseFilter = { role: { $regex: "mentor", $options: "i" } };

//     // If no query provided, return all mentors
//     if (!query || !query.trim()) {
//       return await User.find(baseFilter);
//     }

//     const keywords = query.trim().split(/\s+/); // Split by spaces
//     const orConditions = [];

//     for (const word of keywords) {
//       orConditions.push({ name: { $regex: word, $options: "i" } });
//       orConditions.push({ skills: { $regex: word, $options: "i" } });
//     }

//     console.log("querys", orConditions);

//     return await User.find({
//       ...baseFilter,
//       $or: orConditions,
//     }).select("-password");
//   } catch (err) {
//     console.error("Search error:", err);
//     throw err;
//   }
// };

export const SearchMentorRepo = async (query) => {
  try {
    const keywords = query.split(" ").filter(Boolean);

    const orConditions = [];
    for (let word of keywords) {
      orConditions.push({ name: { $regex: word, $options: "i" } });
      orConditions.push({ skills: { $regex: word, $options: "i" } });
    }
    const mentors = await User.find({
      role: { $regex: "mentor", $options: "i" },
      $or: orConditions,
    }).select("-password");
    return mentors;
  } catch (error) {}
};

export const GetAllMentorRepo = async () => {
  try {
    const mentors = User.find({
      role: { $regex: "mentor", $options: "i" },
    })
      .populate("sessions")
      .populate("mentees");
    return mentors;
  } catch (error) {
    throw error;
  }
};

export const FilterMentorRepo = async (query, limit, offset) => {
  try {
    console.log("Executing DB query:", query);
    console.log("offset in repo", offset);
    console.log("limit in repo", limit);
    const mentors = await User.find(query).skip(offset).limit(limit);
    return mentors;
  } catch (error) {
    throw error;
  }
};

export const FilterByLowToHighRepo = async () => {
  try {
    const mentors = await User.find({
      role: { $regex: "mentor", $options: "i" },
    }).sort({ price: 1 });
    return mentors;
  } catch (error) {
    throw error;
  }
};

export const GetMentorByIdRepo = async (MentorId, MenteeId) => {
  try {
    const res = await User.findByIdAndUpdate(
      MentorId,
      {
        $addToSet: { mentees: MenteeId },
      },
      { new: true },
    )
      .populate("mentees")
      .select("-password");
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetMentorByIdReposite = async (MentorId) => {
  try {
    const res = await User.findById(MentorId)
      .populate("mentees")
      .select("-password");
    return res;
  } catch (error) {
    throw error;
  }
};
