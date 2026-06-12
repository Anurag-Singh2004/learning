import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const socket = io("http://localhost:8000");

function Experiment7(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [roomInput, setRoomInput] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(()=>{
        socket.on("connect",()=>setConnected(true));
        socket.on("disconnect", ()=> setConnected(false));

        //someone joines the room => when someone joins the room with their react app then this event sends message to our react app
        //this event is called in the client_join_room function in fastapi
        socket.on("server_user_joined",(data)=>{
            setMessages(prev=>[...prev, {
                text: data,
                own: false,
                system: true //since this is system message
            }])
        });

        //incoming room message
        socket.on("server_room_message",(data)=>{
            setMessages(prev=>[...prev, {
                text: data,
                own: false
            }])
        });

        socket.on("server_user_left", (data) => {
          setMessages((prev) => [...prev, { text: data, own: false, system: true },
          ]);
        });

        return ()=>{
            socket.off("connect");
            socket.off("disconnect");
            socket.off("server_user_joined");
            socket.off("server_room_message");
            socket.off("server_user_left");
        }
    },[]);

    function handleJoinRoom(){
        if(!roomInput.trim()) return;
        socket.emit("client_join_room", {room:roomInput});
        setCurrentRoom(roomInput);
        setMessages([]); //clear messages when joining new room
        setRoomInput("");
    }

    function handleSend(){
        if(!input.trim()||!currentRoom) return;

        setMessages(prev=>[...prev,{text:input, own:true}]);
        socket.emit("client_room_message",{
            room: currentRoom,
            message:input
        })
        setInput("");
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <Card className="w-[500px] h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Room Chat
              <span
                className={`text-sm ${connected ? "text-green-500" : "text-red-500"}`}
              >
                {connected ? "● Connected" : "● Disconnected"}
              </span>
            </CardTitle>

            {/* room join section */}
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Enter room name..."
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
              />
              <Button onClick={handleJoinRoom}>Join</Button>
            </div>

            {/* current room indicator */}
            {currentRoom && (
              <p className="text-sm text-blue-500 mt-1">Room: {currentRoom}</p>
            )}
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto flex flex-col gap-2">
            {!currentRoom && (
              <p className="text-gray-400 text-center mt-8">
                Join a room to start chatting!
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%]
              ${
                msg.system
                  ? "bg-gray-100 text-gray-500 self-center text-sm italic max-w-full"
                  : msg.own
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white text-gray-700 self-start shadow-sm"
              }`}
              >
                {msg.text}
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder={
                currentRoom ? "Type a message..." : "Join a room first!"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!currentRoom}
            />
            <Button onClick={handleSend} disabled={!currentRoom}>
              Send
            </Button>
          </div>
          
        </Card>
      </div>
    );
}

export default Experiment7;