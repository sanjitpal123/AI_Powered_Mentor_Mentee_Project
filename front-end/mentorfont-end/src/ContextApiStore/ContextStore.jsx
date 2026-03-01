// ContextStore.js
import { createContext, useEffect, useState } from "react";
import GetAllMentosService from "../services/GetAllmentors";
import GetMenteeprofileser from "../services/GetMenteeProfile";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [mentorCount, setMentorCount] = useState(0);
  const [menteeCount, setMenteeCount] = useState(0);
  const [selectedMentees, setselectedMentees] = useState([]);
  const [AllNotification, setAllNotification] = useState([]);

  const [filterMentors, setFilterMentors] = useState([]);
  const [pages, Setpages] = useState(1);
  const [User, setUser] = useState();
  const [Suser, setSUser] = useState();
  const [Performance, setPerformance] = useState("");
  const [sessions, setsessions] = useState([]);
  const [unSeenNotification, setCountUnseenNotification] = useState(0);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  async function GetMenteeProfile() {
    try {
      if (User?._id) {
        const res = await GetMenteeprofileser(User._id);
        setSUser(res);
      }
    } catch (error) {
      console.error("Failed to fetch mentee profile", error);
    }
  }

  useEffect(() => {
    if (User?._id) {
      GetMenteeProfile();
    }
  }, [User]);

  useEffect(() => {
    AllNotification.map((notification) => {
      if (notification.isRead !== true) {
        setCountUnseenNotification((prev) => prev + 1);
        console.log("isread", notification.isRead);
      } else {
        console.log("all seen");
      }
    });
  }, [AllNotification]);

  useEffect(() => {
    GetMenteeProfile();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        mentorCount,
        setMentorCount,
        menteeCount,
        setMenteeCount,
        setFilterMentors,
        filterMentors,
        Setpages,
        pages,
        unSeenNotification,
        User,
        Performance,
        AllNotification,
        setAllNotification,
        setPerformance,
        setUser,
        GetMenteeProfile,
        Suser,
        setSUser,
        selectedMentees,
        setselectedMentees,
        setsessions,
        sessions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
