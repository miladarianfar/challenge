import { ChangeEvent, useState } from "react";

const TextForm = () => {
  const [text, setText] = useState<string>("");
  const [textList, setTextList] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== "") {
      setTextList((prevList) => [...prevList, text]);
      setText("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            type="text"
            placeholder="Input text"
            value={text}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3>Text List</h3>
        {textList.map((text: string, index: number) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </main>
  );
};

export default TextForm;
