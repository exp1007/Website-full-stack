import React from "react";

function UserRegister() {
  // Initialize formData as an object with keys for each input field
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    email: '',
    gender: '',
    date_of_birth: '2018-07-22',
  });

  // Event handler for form submission
  const eventHandler = () => {
    console.log("Doing shit");

    fetch('/users/register', {
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
        username: '',
        password: '',
        email: '',
        gender: '',
        date_of_birth: ''
      });
    })
    .catch((err) => console.log('error'));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    console.log("Doing shit1");
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
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Username"
        />
        <input 
          type="text" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Password"
        />
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email"
        />        
        <input 
          type="text" 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          placeholder="Gender (1 or 0)"
        />    
        <input 
        type="date" 
        name="dob"
        value={formData.date_of_birth} 
        onChange={handleChange} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;