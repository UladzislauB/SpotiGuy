import DropdownMenu from "../components/dropdownMenu.js";

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
            .then(response => {
                if (response.status === 200) {
                    window.location.hash = '#/';
                    return response.json();
                }
            })
            .then(response => {
                if (response !== null) {
                    DropdownMenu.render(response['username'], response['role'])
                }
            })
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
                        <a href="#/register" id="register" type="button">Register</a>
                        <a href="#/login" id="login" type="button">Login</a>
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