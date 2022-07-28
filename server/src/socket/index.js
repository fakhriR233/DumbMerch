const { Users, profile, chat } = require("../../models");

const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);

    socket.on("load admin contact", async () => {
      try {
        const adminContact = await Users.findOne({
          where: {
            status: "admin",
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        // emit event to send admin data on event “admin contact”
        socket.emit("admin contact", adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("load user contact", async () => {
      try {
        let userContacts = await Users.findAll({
          where: {
            status: "user",
          },
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        userContacts = JSON.parse(JSON.stringify(userContacts));

        userContacts = userContacts.map((item) => {
          return {
            ...item,
            image: item.image ? process.env.PATH_FILE + item.image : null,
          };
        });

        // emit event to send user data on event “user contact”
        socket.emit("user contact", userContacts);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
    });
  });
};

module.exports = socketIo;
