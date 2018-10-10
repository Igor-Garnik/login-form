"use strict"

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initComponent() {
        this.initListeners();
    }

    initListeners() {
        this.view.domElements.logInBtn.addEventListener('click', this.loginHandler.bind(this));
        this.view.domElements.instructionsBtn.addEventListener('click', this.instructionsHandler.bind(this));
        this.view.domElements.resetLink.addEventListener('click', this.resetHandler.bind(this));
        this.view.domElements.return.addEventListener('click', this.instructionsHandler.bind(this));
    }

    loginHandler(e) {
        e.preventDefault();
        let credentials = this.view.getCredentials();
        if (this.model.validate(credentials)) {
            this.model.login(credentials).then(
                data => {
                    if (this.model.isLogAndPasEqualsREsponce(credentials, data)) {
                        let stringResult = this.model.setProjects(data.projects);
                        this.view.renderBlock(`Hi, ${data.name}!`, 'nameBlock');
                        this.view.renderBlock(stringResult, 'projectsBlock');
                        this.view.hideElement('welcomeState');
                        this.view.showElement('greetingState');
                    }
                })
        } else {
            let dangerMsg = this.model.getErrorMsg();
            this.view.renderBlock(dangerMsg, 'msgBlock');
            this.view.showElement('msgBlock');
        }
    }

    instructionsHandler(e) {
        e.preventDefault();
        this.view.hideElement('forgotState');
        this.view.showElement('welcomeState');
    }

    resetHandler(e) {
        e.preventDefault();
        this.hideMsgBlock();
        this.view.hideElement('welcomeState');
        this.view.showElement('forgotState');
    }

    hideMsgBlock() {
        if (!this.view.domElements.msgBlock.classList.contains('hide')) {
            this.view.hideElement('msgBlock');
        }

    }
}