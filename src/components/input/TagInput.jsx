// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import {MdAdd,MdClose} from 'react-icons/md'

// eslint-disable-next-line react/prop-types
const TagInput = ({tags,setTags}) => {
    const [inputValue,setInputValue]=useState("");
    const handleInputChange =(e)=>{
        setInputValue(e.target.value);
    };
    const addNewTag =()=>{
        if (inputValue.trim()!==""){
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            addNewTag();
        }
    }
    const handleRemoveTag = (tagToRemove)=>{
        // eslint-disable-next-line react/prop-types
        setTags(tags.filter((tag)=> tag !== tagToRemove))
    }
    
  return (
  <div>
  {/* eslint-disable-next-line react/prop-types */}
  {tags?.length > 0 && (
    <div className='flex items-center gap-2 flex-wrap mt-2'>
      {/* eslint-disable-next-line react/prop-types */}
      {tags.map((tag, index) => (
        <span
          key={index}
          className='flex items-center gap-2 text-xs sm:text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded shadow-sm'
        >
          # {tag}
          <button
            onClick={() => {
              handleRemoveTag(tag);
            }}
            className='text-slate-500 hover:text-slate-700 transition'
          >
            <MdClose />
          </button>
        </span>
      ))}
    </div>
)}

<div className='flex items-center gap-3 sm:gap-4 mt-3'>
  <input
    type="text"
    className='text-sm bg-transparent border px-3 py-2 rounded outline-none w-full sm:w-auto'
    placeholder="Add Tags"
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
  />
  <button
    className='w-8 h-8 flex items-center justify-center rounded border border-blue-200 hover:bg-blue-700 sm:w-auto'
    onClick={() => {
      addNewTag();
    }}
  >
    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
  </button>
</div>
    </div>
  )
}

export default TagInput
