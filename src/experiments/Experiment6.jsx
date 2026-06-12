import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// connect to socket OUTSIDE component
// so it doesn't reconnect on every render!
const socket = io("http://localhost:8000")

function Experiment6(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [connected, setConnected] = useState(false);

    useEffect(()=>{
        //listen for connection
        socket.on("connect",()=>{
            setConnected(true)
        })

        //listen for incoming messages
        socket.on("server_message", (data)=>{
            setMessages(prev=>[...prev,{text:data, own:false}])
        })

        socket.on("disconnect", () => {
          setConnected(false);
        });

        //cleanup on unmount
        return ()=>{
            socket.off("connect")
            socket.off("disconnect");
            socket.off("server_message")
        }
    },[])

    function handleSend(){
        if(!input.trim()) return;

        //add to own messages
        setMessages((prev) => [...prev, { text: input, own: true }]);

        //send to server
        socket.emit("client_message", input);
        setInput("");
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <Card className="w-[500px] h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Real-time Chat
              <span
                className={`text-sm ${connected ? "text-green-500" : "text-red-500"}`}
              >
                {connected ? "● Connected" : "● Disconnected"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%]
              ${
                msg.own
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
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </Card>
      </div>
    );
}

export default Experiment6;