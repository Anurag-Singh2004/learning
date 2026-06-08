import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


function Experiment2() {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-[350px] md:w-[400px]">
          <CardHeader>
            <CardTitle>Experiment 2</CardTitle>
            <CardDescription>
              This is the second experiment. It demonstrates a simple Login form
              with input and button.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Email : </Label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Password : </Label>
              <Input type="password" placeholder="Password" />
            </div>
            <Button className="w-full">Login</Button>
          </CardContent>
        </Card>
      </div>
    );
}

export default Experiment2;