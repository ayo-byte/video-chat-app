const handleSubmit = (e) => {
    e.preventDefault();
    // send a post request with the data from the state to the server
    //to create new friend
    const requestBody = { username: username, user: user };
    console.log('the body', requestBody);
    axios
      .put('/api/userprofile/add', requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);

        setUsername('');
    
      })
      .catch((err) => console.log(err));
  };