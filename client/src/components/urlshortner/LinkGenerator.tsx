import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const LinkGenerator = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [shortURl, setshortURl] = React.useState("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter a valid URL");
      return;
    }
    setshortURl(inputValue);
  };
  return (
    <div className="w-full">
      <form className="flex flex-col gap-5" onSubmit={submitHandler}>
        <div>
          <label
            htmlFor="shorterURL-link"
            className="block mb-2 text-4xl font-bold text-black"
          >
            Paste your long link here
          </label>
          <Input
            type="text"
            id="shorterURL-link"
            placeholder="Enter you long link"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant={"outline"} className="w-1/3 mx-auto">
          Generate Link
        </Button>
      </form>
      <div>
        <h1>
          <span>The shortURl is: </span>
          <a href={shortURl} className="text-blue-600 italic">
            {shortURl}
          </a>
        </h1>
      </div>
    </div>
  );
};

export default LinkGenerator;
