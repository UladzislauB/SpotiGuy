function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let logoutUser = async () => {
    let options = {
        method: 'POST',
        mode: 'same-origin'
    };
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        '/api-auth/logout/',{
            headers: {
                'X-CSRFToken':
                csrftoken
            }
        }
        )
    ;

    try {
        await fetch(request, options)
            .then(response => {

                    if (response.status === 200) {
                        window.location.hash = '#/login';
                    }
                }
            )
    } catch (e) {
        console.error('Fail to log out', e);
    }
}

let LogoutPage = {
    render: async () => {
        await logoutUser();
        return ``
    },
    after_render: async () => {
    }
}

export default LogoutPage;