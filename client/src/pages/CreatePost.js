import React from "react";

function CreatePost() {
  // Initialize formData as an object with keys for each input field
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
    username: ''
  });

  // Event handler for form submission
  const eventHandler = () => {
    fetch('/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send formData object directly
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      // Reset form fields after submission
      setFormData({
        title: '',
        content: '',
        username: ''
      });
    })
    .catch((err) => console.log('error'));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    eventHandler(); // Call eventHandler when form is submitted
  };

  // Handle changes in the form inputs
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Dynamically set the field value based on input's name
    }));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Title"
        />
        <input 
          type="text" 
          name="content" 
          value={formData.content} 
          onChange={handleChange} 
          placeholder="Content"
        />
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Username"
        />
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}

export default CreatePost;