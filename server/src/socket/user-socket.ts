

export interface SocketProps {
    socketId?: string,
    userId? : number,
    status : {
        status : status
        id? : number
    }
}
export type status = "ONLINE" | "ONCHAT" | "OFFLINE";
export let Sockets:SocketProps[] = [];

export const userSocket = ( socketId:string , userId:number) => {
    const newSockets : SocketProps = {
        socketId: socketId,
        userId: userId,
        status : {
            status : "ONLINE",
        }
    };
    Sockets.push(newSockets)
};
export const removeSocket = (id: string | number)=>{
    if(typeof id === "string"){
        const index = Sockets.findIndex(s => s.socketId === id);
        Sockets.splice(index, 1)[0];
        console.log(Sockets)
    }
    else{
        const index = Sockets.findIndex(s => s.userId === id);
        Sockets.splice(index, 1)[0];
        console.log(Sockets)
    }
}
export const editSocket = async(uid : number , status : status , id? : number ):Promise<boolean> => {
    let resp:boolean = false
    console.log("status handler : " + uid , id , status)
    Sockets.map((socket)=>{
        if(socket.userId === uid){
            try {
                socket.status.status = status;
                id ? socket.status.id = id : delete socket.status.id
                resp= true
            }
            catch(e) {
                console.log(e)
                resp= false
            }
        }
    })
    return resp
}

export const handleDisconnect =async (id : string) =>{
    // const isSuccess = await setLastSeen(id)
    // console.log("set lastseen ",isSuccess)
    //clear all related redis data if this user , firstly 
}



type getStatusprop = {
    status : status,
    id? : number
}
export const getStatus = async(id : number): Promise<getStatusprop | false> =>{
    const socket = Sockets.find(s=>s.userId === id);
    // console.log(socket?.status)
    if(socket?.status){
        return socket?.status
    }
    else{
        return false
    }
}