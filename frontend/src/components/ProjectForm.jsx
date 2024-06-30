// src/ProjectForm.js
import React, { useState } from 'react';
import '../css/ProjectForm.css';
import {createNewCampaign} from '../contractMethods';
import Sidebar from './Sidebar';
import ReactLoading from "react-loading";

const ProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [endDate, setendDate] = useState('');

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const success = await createNewCampaign(title, description, goal, imageUrl, category, endDate);
    setIsLoading(false);
    if(success.hash) {
      alert("Data added succesfully");
      window.location.href = '/display-campaigns';
    }
    setTitle('');
    setDescription('');
    setGoal('');
    setImageUrl('');
    setCategory('');
    setendDate('');
  };

  return (
    <div className='bg-dark'>
    {isLoading && <div className='loading-component'>
      <Sidebar></Sidebar>
      <ReactLoading type="spokes" color="#edebdd" height={50} width={50} className='loader'/>
    </div>}
    {!isLoading && <div className='bg-dark'>
      <Sidebar></Sidebar>
      <h1 className='addHeader'>Create a Campaign</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <div>
          <label>Title</label>
          <input name = "title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name = "description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Goal</label>
          <input name = "goal" type="number" value={goal} onChange={(e) => setGoal(e.target.value)} required />
        </div>
        <div>
          <label>Image URL</label>
          <input name = "imgUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label>Category</label><br/>
          <input name = "category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>End Date</label>
          <input name = "endDate" type="date" value={endDate} onChange={(e) => setendDate(e.target.value)} required />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>}
  </div>
  );
};

export default ProjectForm;
