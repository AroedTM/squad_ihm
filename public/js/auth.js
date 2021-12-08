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
    forgotEmail = document.getElementById('forgot-email');
    forgotButton = document.getElementById('forgot-button');
    url = "";

    constructor (url) {
        super();
        this.url = url;
    }

    // send credentials to the server & retrieve the token
    async checkCredential () {
        var headers = new Headers({
            'Content-Type': 'application/json'
        })

        /*########## TODO: add the right endpoint ##########*/
        const response = await fetch(url + "auth/login", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                username: this.signInPseudo.value,
                password: this.signInPassword.value
            }),
            headers
        }).catch((error) => {
            this.statusMessage('Erreur: ' + error, 'WARN');
        });

        // retrieve token
        if (response.ok) {
            response.json().then( body => {
                if (body.status == "ok") {
                    this.statusMessage('Authentification réussie', 'INFO');
                    window.localStorage.setItem('auth_token', body.data.token);
                    /*########### TODO: redirection to home page ###########*/
                    window.location.href = 'accueil';
                } else if (body.status == 'ko') {
                    this.statusMessage(body.data.message, 'WARN');
                }
            })
        } else {
            this.statusMessage('Erreur :' + response.status, 'WARN');
        }
    }

    showForgotForm () {
        this.forgotEmail.style.display = 'block'
        this.forgotButton.style.display = 'block'
    }

    async pushForgotEmail () {
        var headers = new Headers({
            'Content-Type': 'application/json'
        })

        /*########## TODO: add the right endpoint ##########*/
        const response = await fetch(url + 'auth/forgot', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: this.forgotEmail.value
            }),
            headers
        }).catch((error) => {
            this.statusMessage('Erreur: ' + error, 'WARN');
        });

        // send email
        if (response.ok) {
            response.json().then( body => {
                if (body.status == "ok") {
                    this.statusMessage('Email envoyé', 'INFO');
                } else if (body.status == 'ko') {
                    this.statusMessage(body.data.message, 'WARN');
                }
            })
        } else {
            this.statusMessage('Erreur :' + response.status, 'WARN');
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
    url = "";

    constructor (url) {
        super();
        this.url = url;
    }

    // send credentials to the server & retrieve the token
    async pushCredential () {
        var headers = new Headers({
            'Content-Type': 'application/json'
        })

        /*########## TODO: add the right endpoint ##########*/
        const response = await fetch(url + 'auth/register', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: this.signUpEmail.value,
                username: this.signUpPseudo.value,
                password: this.signUpPassword.value
            }),
            headers
        }).catch((error) => {
            this.statusMessage('Erreur: ' + error, 'WARN');
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
            this.statusMessage('Erreur :' + response.status, 'WARN');
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
