import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Experiment5(){
     const [messages, setMessages] = useState([]);
     const [input, setInput] = useState("");
     const [loading, setLoading] = useState(false);

     const API_URL = import.meta.env.VITE_API_URL;

     async function handleSend(){
       if (!input.trim()) return;

       // add user message to history
       const newMessages = [
        ...messages,
        {role:"user", content: input}
       ]
       setMessages(newMessages);
       setInput("")

       try {
         setLoading(true);

         // send full history to FastApi
         const result = await axios.post(`${API_URL}/chat/sarcastic`, {
           messages: newMessages,
           system_prompt: "You are a sarcastic assistant",
         });

         //add AI response to history
         setMessages([
           ...newMessages,
           { role: "assistant", content: result.data.response },
         ]);
       } catch (err) {
         console.error(err);
       } finally {
         setLoading(false);
       }
     }

     return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
         <Card className="w-[600px] h-[600px] flex flex-col">
           <CardHeader>
             <CardTitle>AI Chat</CardTitle>
           </CardHeader>

           {/* messages area */}
           <CardContent className="flex-1 overflow-y-auto flex flex-col gap-3">
             {messages.length === 0 && (
               <p className="text-gray-400 text-center mt-8">
                 Ask me anything!
               </p>
             )}
             {messages.map((msg, index) => (
               <div
                 key={index}
                 className={`p-3 rounded-lg max-w-[80%] 
              ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-white text-gray-700 self-start shadow-sm"
              }`}
               >
                 {msg.content}
               </div>
             ))}
             {loading && (
               <div className="bg-white p-3 rounded-lg self-start shadow-sm text-gray-400">
                 Thinking...
               </div>
             )}
           </CardContent>

           {/* input area */}
           <div className="p-4 border-t flex gap-2">
             <Input
               placeholder="Type a message..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSend()}
             />
             <Button onClick={handleSend} disabled={loading}>
               Send
             </Button>
           </div>
         </Card>
       </div>
     );
}

export default Experiment5;