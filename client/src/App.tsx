import { WavyBackground } from "@/components/ui/wavy-background";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "@/components/common/Navbar";
import Tabs from "./components/urlshortner/Tabs";
const word =
  "With Yatirly Connections Platform, you can easily create and manage URL shorteners, QR codes, and landing pages to connect with your audience. Effortlessly build, customize, and track your content all in one place.";
const App = () => {
  return (
    <WavyBackground containerClassName="justify-start items-start">
      <Navbar />
      <div className="px-6 mt-10">
        <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white font-bold inter-var text-center">
          Welcome Yatifer 
        </p>
        <p className="w-4/5 mx-auto text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl text-white font-bold inter-var text-center">
          Build stronger digital connections{" "}
        </p>
        <TextGenerateEffect
          words={word}
          className="w-5/6 mx-auto"
          filter={false}
          duration={5}
        />
      {/* <Tabs /> */}
      </div>
    </WavyBackground>
  );
};

export default App;
