import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


function Experiment4(){
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL

    async function handleChat(){
        try{
            setIsLoading(true);
            const result = await axios.post(`${API_URL}/chat/sarcastic`, { message: message });
            setResponse(result.data.response);
        }catch(err){
            setError(err.message);
        }finally{
            setIsLoading(false);
        }
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>AI Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              placeholder="Ask anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button className="w-full" onClick={handleChat}>
              {loading ? "Thinking..." : "Ask AI"}
            </Button>

            {error && (
              <div className="p-4 rounded-lg bg-red-100 text-red-700 text-center">
                {error}
              </div>
            )}

            {response && (
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                {response}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
}

export default Experiment4;

