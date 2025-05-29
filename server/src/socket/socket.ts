// import { io } from "../server";
// import { Sockets, handleDisconnect, removeSocket,userSocket } from "./user-socket";
// import { getUserId } from "../lib/functions";

// export const SocketConnections = ()=>{
//   console.log("socket server starting..")
//     io.on("connection", async (socket) => {
//         console.log("A user connected:", socket.id);
//         const id = await getUserId(socket.id)
//         console.log(id)
//         // io.sockets.sockets.forEach((socket) => {
//         //   socket.disconnect(true); // Send a disconnect message to the client
//         // });
        
//         socket.on("disconnect", async() => {
//           await handleDisconnect(socket.id)
//           removeSocket(socket.id)
//           console.log("A user disconnected:", socket.id);
//           console.log(Sockets);
//         });

//         // socket.on("SEND_REQUEST" , (data)=>sendRequest(socket , data))

//       });
// }