import { WavyBackground } from "@/components/ui/wavy-background";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "@/components/common/Navbar";
import Tabs from "./components/urlshortner/Tabs";
import "@/App.css";
const word =
  "With Yatirly Connections Platform, you can easily create and manage URL shorteners, QR codes, and landing pages to connect with your audience. Effortlessly build, customize, and track your content all in one place.";
const App = () => {
  return (
    <div
      containerClassName="justify-start items-start"
      className="bg-black min-h-screen"
    >
      <Navbar />
      <div className="px-6 mt-10 flex flex-col gap-5">
        <div className="">
          <p className="text-5xl text-white font-bold inter-var text-center">
            Welcome Yatifer
          </p>
          <p className="w-4/5 text-3xl mx-auto  text-white font-bold inter-var text-center">
            Build stronger digital connections{" "}
          </p>
        </div>
        {/* <TextGenerateEffect
          words={word}
          className="w-5/6 mx-auto"
          filter={false}
          duration={5}
        /> */}
        <Tabs />
      </div>
    </div>
  );
};

export default App;
