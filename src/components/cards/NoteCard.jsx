/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// NoteCard.js
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import React from 'react';
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div className="mb-2 sm:mb-0">
        <h6 className="text-sm font-medium">{title}</h6>
        <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
      </div>
      <MdOutlinePushPin
        className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'} cursor-pointer`}
        onClick={onPinNote}
      />
    </div>
    <p className="text-xs text-slate-600 mt-2 line-clamp-3">{content?.slice(0, 100)}</p>
    <div className="flex flex-wrap items-center justify-between mt-4">
      <div className="text-xs text-slate-500 flex-wrap">
        {tags.map((item, index) => (
          <span key={index} className="mr-1">{`#${item}`}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <MdCreate className="icon-btn hover:text-green-600 cursor-pointer" onClick={onEdit} />
        <MdDelete className="icon-btn hover:text-red-500 cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  </div>
  )};

export default NoteCard;
