// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

// eslint-disable-next-line react/prop-types, no-unused-vars
const AddEditNotes = ({noteData,type,getAllNotes,onClose,showToastMessage}) => {
  // eslint-disable-next-line react/prop-types
  const [title,setTitle] = useState(noteData?.title || "");
  // eslint-disable-next-line react/prop-types
  const [content,setContent]= useState(noteData?.content || "");
  // eslint-disable-next-line react/prop-types
  const [tags,setTags] = useState(noteData?.tags || []);
  const [error,setError]=useState(null);

  //Add Note
  const addNewNote= async()=>{
    try{
      const response=await axiosInstance.post("/add-note",{
        title,
        content,
        tags,
      });
      if(response.data&&response.data.note){
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    }catch(error){
      if(
        error.response&&error.response.data&&error.response.data.message
      ){
        setError(error.response.data.message);
      }
    }

    
  }
    //Edit Note
  const editNote= async()=>{
    // eslint-disable-next-line react/prop-types
    const noteId=noteData._id;
    try{
      const response=await axiosInstance.put("/edit-note/"+noteId,{
        title,
        content,
        tags,
      });
      if(response.data&&response.data.note){
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    }catch(error){
      if(
        error.response&&error.response.data&&error.response.data.message
      ){
        setError(error.response.data.message);
      }
    }
  }
  const handleAddNote=()=>{
    if (!title){
      setError("Please enter the title")
      return;
    }
    if(!content){
      setError("Pleae enter the content")
      return;
    }
    setError("")

    if(type=== 'edit'){
      editNote()
    }else{
      addNewNote()
    }
  }
 return (
  <div className="relative ">
    {/* Close Button */}
    <button
      className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
      onClick={onClose}
    >
      <MdClose className="text-xl text-slate-600" />
    </button>

    {/* Title Input */}
    <div className="flex flex-col gap-2">
      <label className="input-label">TITLE</label>
      <input
        type="text"
        className="text-2xl text-slate-950 outline-none bg-[aliceblue] p-2 rounded"
        placeholder="Go To Gym At 5"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>

    {/* Content Textarea */}
    <div className="flex flex-col gap-2 mt-4">
      <label className="input-label">CONTENT</label>
      <textarea
        type="text"
        className="text-sm text-slate-950 outline-none bg-[aliceblue] p-2 rounded"
        placeholder="Content"
        rows={10}
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
    </div>

    {/* Tags */}
    <div className="mt-3">
      <label className="input-label">TAGS</label>
      <TagInput tags={tags} setTags={setTags} />
    </div>

    {/* Error Message */}
    {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

    {/* Add/Update Button */}
    <button
      className="btn-primary font-medium mt-5 p-3 w-full"
      onClick={handleAddNote}
    >
      {type === 'edit' ? 'UPDATE' : 'ADD'}
    </button>
  </div>
);

}

export default AddEditNotes
