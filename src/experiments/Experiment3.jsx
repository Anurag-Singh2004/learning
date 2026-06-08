import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Experiment3(){
    const [formData, setFormData] = useState({
      pclass: 1,
      age: 25,
      sex: "male",
      fare: 7.25,
      sibsp: 0,
      parch: 0,
      embarked: "S",
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(){
        try{
            setIsLoading(true);
            const response = await axios.post(`${API_URL}`, {
              ...formData,
              pclass: Number(formData.pclass),
              age: Number(formData.age),
              fare: Number(formData.fare),
              sibsp: Number(formData.sibsp),
              parch: Number(formData.parch),
            });
            setResult(response.data);
        }catch(err){
            if(err.response){
                const details = err.response.data.detail
                if(Array.isArray(details)){
                    setError(details.map(d=>d.msg).join(", "))
                }else{
                    setError(details)
                }
            }else{
                setError("Cannot connect to server")
            }
        }finally{
            setIsLoading(false);
        }
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Tianic Survival Predictor</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* pclass select */}
            <div className="flex flex-col gap-1">
              <Label>Passenger Class</Label>
              <select
                name="pclass"
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value={1}>1st Class</option>
                <option value={2}>2nd Class</option>
                <option value={3}>3rd Class</option>
              </select>
            </div>

            {/* sex select */}
            <div className="flex flex-col gap-1">
              <Label>Sex</Label>
              <select
                name="sex"
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* age input */}
            <div className="flex flex-col gap-1">
              <Label>Age</Label>
              <Input
                name="age"
                type="number"
                defaultValue={25}
                onChange={handleChange}
              />
            </div>

            {/* fare input */}
            <div className="flex flex-col gap-1">
              <Label>Fare</Label>
              <Input
                name="fare"
                type="number"
                defaultValue={7.25}
                onChange={handleChange}
              />
            </div>

            {/* sibsp input */}
            <div className="flex flex-col gap-1">
              <Label>Siblings/Spouses</Label>
              <Input
                name="sibsp"
                type="number"
                defaultValue={0}
                onChange={handleChange}
              />
            </div>

            {/* parch input */}
            <div className="flex flex-col gap-1">
              <Label>Parents/Children</Label>
              <Input
                name="parch"
                type="number"
                defaultValue={0}
                onChange={handleChange}
              />
            </div>

            {/* embarked select */}
            <div className="flex flex-col gap-1">
              <Label>Port of Embarkation</Label>
              <select
                name="embarked"
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value="C">Cherbourg</option>
                <option value="Q">Queenstown</option>
                <option value="S">Southampton</option>
              </select>
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              {loading ? "Predicting..." : "Predict Survival"}
            </Button>

            {error && (
              <div className="p-4 rounded-lg bg-red-100 text-red-700 text-center">
                 {error}
              </div>
            )}

            {result && (
              <div
                className={`p-4 rounded-lg text-center font-bold text-xl
                 ${result.survived ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {result.survived ? "Survived" : "Did not survive"}
                <p className="text-sm font-normal mt-2">
                  Survival probability:{" "}
                  {(result.survived_probability * 100).toFixed(2)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
}

export default Experiment3;