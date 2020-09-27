let loginUser = async () => {
    const username = document.getElementById('username_input');
    const pass = document.getElementById("pass_input");

    let data = {
        'username': username.value,
        'password': pass.value,
    };

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        await fetch("/api-auth/login/", options)
            .then(response => console.log(response))
    } catch (e) {
        console.error("Fail to login", e);
    }
}

let LoginPage = {
    render: async () => {
        let view = `
             <div class="auth-page" id="auth-page">
                <form id="loginForm">
                    <div class="btn-group">
                        <button id="register" type="button">Register</button>
                        <button id="login" type="button">Login</button>
                    </div>
                    <input type="text" placeholder="Username" id="username_input"/>
    
                    <input type="password" placeholder="Password" id="pass_input" name="password">
                    <button type="button" id="loginButton">
                        Login
                    </button>
                </form>
            </div>
        `;
        return view
    },
    after_render: async () => {
        document.getElementById("loginButton").addEventListener('click', loginUser)
    }
}


export default LoginPage;