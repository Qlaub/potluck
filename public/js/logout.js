const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });
    response.ok ? 
    document.location.replace('/') :
    alert(response.StatusText);
}

//logout event-listener goes here 