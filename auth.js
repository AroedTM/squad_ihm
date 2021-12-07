class Auth {
    static signInTab = document.getElementById('sign-in-tab');
    static signUpTab = document.getElementById('sign-up-tab');
    static signInTabContainer = document.getElementById('sign-in-tab-container');
    static signUpTabContainer = document.getElementById('sign-up-tab-container');

    static switchTab (tab) {
        if (tab == 'sign-in-tab') {
            this.signUpTab.classList.remove('focused-tab');
            this.signInTab.classList.add('focused-tab');
            this.signUpTabContainer.classList.remove('focused-tab-container');
            this.signInTabContainer.classList.add('focused-tab-container');
        } else if (tab == 'sign-up-tab') {
            this.signInTab.classList.remove('focused-tab');
            this.signUpTab.classList.add('focused-tab');
            this.signInTabContainer.classList.remove('focused-tab-container');
            this.signUpTabContainer.classList.add('focused-tab-container');
        }
    }
}

class SignIn extends Auth {
    signInPseudo = document.getElementById('sign-in-pseudo');
    signInPassword = document.getElementById('sign-in-password');

    // send credentials to the server & retrieve the token
    async checkCredential () {
        var headers = new Headers({
            'Content-Type': 'application/json'
        })

        /*########## TODO: add the right endpoint ##########*/
        const response = await fetch('https://61af166c3e2aba0017c48fe5.mockapi.io/auth/test', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                username: this.signInPseudo.value,
                password: this.signInPassword.value
            }),
            headers
        });

        // retrieve token
        response.json().then( data => {
            console.log(data);
            if (data != null && data.token != "") {
                window.localStorage.setItem('token', data.token);
                console.log(window.localStorage.getItem('token'));
            } else {
                messageError();
            }
        })
    }
}

class SignUp extends Auth {
    signUpEmail = document.getElementById('sign-up-email');
    signUpPseudo = document.getElementById('sign-up-pseudo');
    signUpPassword = document.getElementById('sign-up-password');

    // send credentials to the server & retrieve the token
    async pushCredential () {
        var headers = new Headers({
            'Content-Type': 'application/json'
        })

        /*########## TODO: add the right endpoint ##########*/
        const response = await fetch('https://61af166c3e2aba0017c48fe5.mockapi.io/auth/test', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: this.signUpEmail.value,
                username: this.signUpPseudo.value,
                password: this.signUpPassword.value
            }),
            headers
        });

        // retrieve token
        response.json().then( data => {
            console.log(data);
            if (data != null && data.token != "") {
                window.localStorage.setItem('token', data.token);
                console.log(window.localStorage.getItem('token'));
            } else {
                messageError();
            }
        })
    }
}

function messageError () {
    document.getElementById('msg-error').innerHTML = 'Login ou mot de passe incorrect';
}
