// src/ProjectForm.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/ProjectForm.css';
import {createNewCampaign} from '../contractMethods';

const ProjectForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [endDate, setendDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createNewCampaign(title, description, goal, imageUrl, category, endDate);
    if(success >= 0) {
      alert("Data added succesfully");
      navigate('/');
    }
    setTitle('');
    setDescription('');
    setGoal('');
    setImageUrl('');
    setCategory('');
    setendDate('');
  };

  return (
    <div>
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
    </div>
  );
};

export default ProjectForm;
