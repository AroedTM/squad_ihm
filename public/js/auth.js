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
        const response = await fetch('https://61af166c3e2aba0017c48fe5.mockapi.io/auth/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                username: this.signInPseudo.value,
                password: this.signInPassword.value
            }),
            headers
        });

        // retrieve token
        if (response.ok) {
            response.json().then( body => {
                if (body.status == "ok") {
                    this.statusMessage('Authentification réussie', 'INFO');
                    window.localStorage.setItem('token', body.data.token);
                    /*########### TODO: redirection to home page ###########*/
                    window.location.href = 'Accueil.html';
                } else if (body.status == 'ko') {
                    this.statusMessage(body.data.message, 'WARN');
                }
            })
        } else {
            this.statusMessage('Erreur réseau', 'WARN');
        }
    }

    statusMessage (msg, level) {
        var signInMsg = document.getElementById('sign-in-msg');
        if (level == 'WARN') {
            signInMsg.style.color = 'red';
        }
        else if (level == 'INFO') {
            signInMsg.style.color = 'green';
        }
        signInMsg.innerHTML = msg;
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
        const response = await fetch('https://61af166c3e2aba0017c48fe5.mockapi.io/auth/register', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: this.signUpEmail.value,
                username: this.signUpPseudo.value,
                password: this.signUpPassword.value
            }),
            headers
        });

        // register new user
        if (response.ok) {
            response.json().then( body => {
                if (body.status == "ok") {
                    this.statusMessage(body.data.message, 'INFO');
                    setTimeout(() => {
                        Auth.switchTab('sign-in-tab');
                    }, 1000);
                } else if (body.status == 'ko') {
                    this.statusMessage(body.data.message, 'WARN');
                }
            })
        } else {
            this.statusMessage('Erreur réseau', 'WARN');
        }
    }

    statusMessage (msg, level) {
        var signUpMsg = document.getElementById('sign-up-msg');
        if (level == 'WARN') {
            signUpMsg.style.color = 'red';
        }
        else if (level == 'INFO') {
            signUpMsg.style.color = 'green';
        }
        signUpMsg.innerHTML = msg;
    }
}
