import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../ContextApiStore/ContextStore";
import { GetNotification } from "../../services/Notification";

export const Notification = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));

  async function getNotification() {
    try {
      if (!user?.token) return;
      const res = await GetNotification(user.token);
      console.log("response to get notification", res);
    } catch (error) {
      console.log("error to get notification", error);
    }
  }

  useEffect(() => {
    getNotification();
  }, []);

  return <div></div>;
};
