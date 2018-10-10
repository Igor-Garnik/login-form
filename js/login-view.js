"use strict"

class View {
    constructor() {
        this.domElements = {
            'welcomeState': document.querySelector('#welcome-state'),
            'greetingState': document.querySelector('#greeting-state'),
            'forgotState': document.querySelector('#forgot-state'),
            'login': document.querySelector('#welcom-email-input'),
            'password': document.querySelector('#welcome-password-input'),
            'logInBtn': document.querySelector('#log-in-btn'),
            'msgBlock': document.querySelector('#message-block'),
            'forgotEmailImput': document.querySelector('#forgot-emai-input'),
            'instructionsBtn': document.querySelector('#instructions-btn'),
            'return': document.querySelector('.return-arrow'),
            'greetingInputs': document.querySelectorAll('.greeting-input'),
            'resetLink': document.querySelector('#reset'),
            'nameBlock': document.querySelector('#name-block'),
            'projectsBlock': document.querySelector('#projects-block')
        }
    }

    getCredentials() {
        return {
            login: this.domElements.login.value,
            password: this.domElements.password.value
        }
    }

    hideElement(element) {
        this.domElements[element].classList.add('hide');
    }

    showElement(element) {
        this.domElements[element].classList.remove('hide');
    }

    renderBlock(text, element) {
        this.domElements[element].innerHTML = text;
    }
}
