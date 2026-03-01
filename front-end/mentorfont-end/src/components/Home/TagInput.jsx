import { useState } from "react";
import { Calendar, X } from "lucide-react";

function TagInput({ tags, setTags }) {
  const [value, setValue] = useState("");

  const addTag = () => {
    if (!value.trim()) return;
    if (!tags.includes(value)) setTags([...tags, value]);
    setValue("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-red-900/80 text-white px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add topic"
          className="flex-1 bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-lg"
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TagInput;
