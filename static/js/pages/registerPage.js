import DropdownMenu from "../components/dropdownMenu.js";

let registerUser = async () => {
    const username = document.getElementById('username_input');
    const email = document.getElementById("email_input");
    const pass = document.getElementById("pass_input");
    const repeatPass = document.getElementById("confirm_pass_input");
    const firstName = document.getElementById("firstName_input");
    const lastName = document.getElementById("lastName_input");
    const invalidFeedback = document.getElementById("invalid-input")

    let reEmailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;

    let errors = '';


    if (!reEmailCheck.test(email.value.toUpperCase())) {
        errors += 'Enter valid email\n'
    }
    if (pass.value !== repeatPass.value) {
        errors += `The passwords don't match\n`
    } else if (email.value === '' | pass.value === '' | repeatPass === '') {
        errors += `The field(s) cannot be empty\n`
    }

    if (errors !== '') {
        console.log(errors);
        invalidFeedback.innerHTML = errors;
    } else {

        let data = {
            'email': email.value,
            'username': username.value,
            'password': pass.value,
            'first_name': firstName.value,
            'last_name': lastName.value,
            "playlist_queue_id": 0,
            "current_song": 0,
            "playlist_set": []
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        };
        try {
            await fetch('/api/users/', options)
                .then(response => {
                    if (response.status === 201) {
                        window.location.hash = '#/';
                        return response.json()
                    }
                }).then(response => {
                    if (response !== null) {
                        DropdownMenu.render(response['username'], response['role'])
                    }
                })
        } catch (e) {
            console.error(e);
            invalidFeedback.innerHTML = e;
        }
    }
}

let RegisterPage = {
    render: async () => {
        let view = `
            <div class="auth-page" id="auth-page">
                <form id="registerForm">
                    <div class="btn-group">
                        <a href="#/register" id="register" type="button">Register</a>
                        <a href="#/login" id="login" type="button">Login</a>
                    </div>
                    <input type="text" placeholder="Username" id="username_input"/>
                    <input type="email" placeholder="Email" id="email_input" name="email">
    
                    <input type="text" placeholder="First Name" id="firstName_input" name="first_name">
                    <input type="text" placeholder="Last Name" id="lastName_input" name="last_name">
    
                    <input type="password" placeholder="Password" id="pass_input" name="password">
                    <input type="password" placeholder="Password again" id="confirm_pass_input" name="password2">
                    <button type="button" id="registerButton">
                        Register
                    </button>
                    <p class="invalid-feedback" id="invalid_input"></p>
                </form>
            </div>
        `;
        return view
    },
    after_render: async () => {
        document.getElementById('registerButton').addEventListener('click', registerUser)
    }
}

export default RegisterPage;

