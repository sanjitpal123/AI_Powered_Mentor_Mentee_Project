// keep it global/shared
let onlinusers = [];

export const SocketServer = (socket, io) => {
  console.log("✅ SocketServer attached for:", socket.id);

  // for online user
  socket.on("join", (userId) => {
    console.log("🔥 user has joined room:", userId);

    let existed = onlinusers.find((u) => u.userId == userId);
    if (!existed) {
      onlinusers.push({ userId, socketId: socket.id });
    }

    socket.join(userId.toString()); // user joins room named with their userId
    console.log(`${userId} joined room`);
    console.log("🟢 Online Users:", onlinusers);
  });

  // send message and receive message
  socket.on("sendMessage", (msg) => {
    console.log("receiving message in bc", msg);

    const participants = msg.getConvById.participants;

    participants.forEach((user) => {
      if (user._id === msg.send.sender) {
        console.log(
          "user id is ",
          user._id,
          "and sender id is ",
          msg.send.sender
        );
        return; // skip sender
      }

      console.log(
        "🔥 emitting receiveMessage to: and message is ",
        user._id,
        msg.send
      );
      io.to(user._id.toString()).emit("receiveMessage", msg.send);
    });
  });
  socket.on("typing", (receiverId) => {
    console.log("typing in back-end", receiverId);
    io.to(receiverId).emit("typing");
  });
  socket.on("stop typing", (receiverId) => {
    console.log("stop typing in bakc-end ", receiverId);
    io.to(receiverId).emit("stop typing");
  });

  socket.on("seen", ({ convoId, receiverId }) => {
    console.log("seen message by ", convoId);
    io.to(receiverId).emit("seenMessage", convoId);
  });

  socket.on("EditMessage", ({ receiverId }) => {
    console.log("edit message");
    io.to(receiverId).emit("getEditMessage");
  });

  socket.on("NotifySessionCreation", ({ receiverId }) => {
    console.log("Notifing mentor about session ");
    io.to(receiverId).emit("Notification");
  });

  socket.on("NotifySessionStatusUpdate", ({ receiverId }) => {
    console.log("Notifying mentee about session status", receiverId);
    io.to(String(receiverId)).emit("StatusUpdateOfSession");
  });

  socket.on("NotifyAboutTask", ({ receiverIds }) => {
    console.log("ids", receiverIds);
    receiverIds.forEach((id) =>
      io.to(id.toString()).emit("NotifyingAboutTask")
    );
  });
  socket.on("notifyAboutAttendingtask", ({ mentorId }) => {
    console.log(
      "sending notification to mentor after attending task",
      mentorId
    );
    io.to(mentorId.toString()).emit("GetNotificationAboutTaskAttendedBy");
  });
  // for offline user

  socket.on("disconnect", () => {
    onlinusers = onlinusers.filter((u) => u.socketId !== socket.id);
    console.log("❌ user disconnected:", socket.id);
    console.log("🟡 Remaining Online Users:", onlinusers);
  });

  // Debug any events
  // socket.onAny((event, ...args) => {
  //   console.log("📩 Event received:", event, args);
  // });
};
