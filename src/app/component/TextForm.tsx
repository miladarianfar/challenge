import { ChangeEvent, useState } from "react";

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const TextForm = () => {
  const [text, setText] = useState<string>("");
  const [textList, setTextList] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

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

  const handleSearchInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      if (e.target.value.trim() !== "") {
        const filterData = filterTestList(e.target.value);
        setSearchResult(filterData);
      } else {
        setSearchResult([]);
      }
    },
    3000
  );

  const highlightMatch = (text: string, searchText: string) => {
    if (!searchText) return text;
    const searchTerms = searchText.toLowerCase().split(" ");

    const isMatch = searchTerms.every((term) =>
      text.toLowerCase().includes(term)
    );

    if (isMatch) {
      const regex = new RegExp(`(${searchTerms.join("|")})`, "gi");
      return text.replace(regex, "<strong>$1</strong>");
    } else {
      return text;
    }
  };

  const handleSearchInputFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchInputBlur = () => {
    setIsSearchFocused(false);
  };

  const filterTestList = (text: string) => {
    return textList.filter((item) => highlightMatch(item, text) !== item);
  };

  return (
    <div>
      <div className="mb-4 relative">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="searchText"
          type="text"
          placeholder="Search text"
          onChange={handleSearchInputChange}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
        />
        {isSearchFocused && searchText ? (
          searchResult.length > 0 ? (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded mt-2 overflow-y-auto max-h-40">
              <ul>
                {searchResult.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(item, searchText),
                    }}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded mt-2 overflow-y-auto max-h-40">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100">
                  No results found.
                </li>
              </ul>
            </div>
          )
        ) : null}
      </div>
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
    </div>
  );
};

export default TextForm;
