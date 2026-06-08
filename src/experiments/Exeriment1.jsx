import { useState } from "react"; 
import { Button } from "#src/components/ui/button.jsx";

function Experiment1(){
  const [darkMode, setDarkMode] = useState(false);
  //const darkMode = true;
  
    return (
      <>
        {/*
            <div className="flex justify-between p-4 bg-blue-500">
                <span className="text-white">MyApp</span>
                <span className="text-white">Login</span>
            </div>
            <div className="bg-blue-500 text-white text-3xl p-8">
                Tailwind is working!
            </div>
            <div className="bg-red-900 text-black p-4">kzdfbvFSviz</div>
            <div className="bg-green-500 px-4 py-2 mt-8 text-2xl">sdjvksbjs</div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="bg-blue-900 h-48 w-full mb-4" />
                <div className="font-bold text-gray-500 text-lg">Title</div>
                <p className="text-gray-500 text-base">Some Discription</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Button
                </button>
            </div>
            <div className="bg-red-500 md:bg-blue-500 lg:bg-green-500">
                madnndnflanl
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">Card 1</div>
                <div className="bg-white p-4 rounded shadow">Card 2</div>
                <div className="bg-white p-4 rounded shadow">Card 3</div>
                <div className="bg-white p-4 rounded shadow">Card 4</div>
            </div>
            */}
        <div className={darkMode ? "dark" : ""}>
          <div className="bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-between bg-blue-500 text-white p-4">
              <div>
                <button>MyApp</button>
              </div>
              <div>
                <span className="px-8">
                  <button>Login</button>
                </span>
                <span className="px-8">
                  <button>Sign</button>
                </span>
                <span className="px-8">
                  {/*<button onClick={()=>{!darkMode}}>Toggle Mode</button>*/}
                  <button onClick={() => setDarkMode(!darkMode)}>
                    Toggle Mode
                  </button>
                </span>
              </div>
            </div>
            <div className="text-center text-4xl font-bold text-gray-700 p-4">
              <p className="p-4">Welcome to MyApp</p>
              <p className="p-4">Some tagline</p>
              <button className="bg-blue-400 text-white px-6 py-3 rounded-lg">
                Get Started
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold text-lg">Feature 1</p>
                <p className="text-gray-500 text-base">Some description here</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold text-lg">Feature 2</p>
                <p className="text-gray-500 text-base">Some description here</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold text-lg">Feature 3</p>
                <p className="text-gray-500 text-base">Some description here</p>
              </div>
            </div>
            <button className="block mx-auto  bg-blue-500  dark:bg-red-800 hover:bg-blue-700 dark:hover:bg-violet-500">
              Just a Button
            </button>
          </div>
        </div>
        <div className="p-4">
          <Button>Click Me</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </>
    );
}

export default Experiment1;