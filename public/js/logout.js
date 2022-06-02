const logout = async () => {
    const response = await fetch('/api/customers/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });
    response.ok ? 
    document.location.replace('/login') :
    alert(response.StatusText);
}

document.querySelectorAll('.logoutBtn').forEach(button => {
    button.addEventListener('click', logout)
});
