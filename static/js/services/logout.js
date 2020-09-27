let logout = async () => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await fetch("http://localhost/api-auth/logout", options)
    } catch (e) {
        console.error("Failed to log out", e);
    }
}

export default logout();