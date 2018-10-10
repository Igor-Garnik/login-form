"use strict"

class Model {
    constructor() {
        this.userData = 'https://gist.githubusercontent.com/Igor-Garnik/c800176e1a54ac21b5933a89bbdfba55/raw/54daff8cc9fb42abc96c31862cfcc9852cfffdf9/IO%2520Technologies';
        this.emailPattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        this.passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/;
        this.errorMsg = null;
        this.errorsMsgList = {
            "empty": 'Пожалуйста заполните поля логин и пароль',
            "logError": 'Логин введен неверно. Только латинские буквы.',
            "passError": 'Пароль введен неверно. Заглавные, прописные латинские буквы, цифры. Не менее 8 и не более 15 символов',
            "missmatch": 'Неправильные логин или пароль.'
        };
    }
    validate(credentials) {
        return this.isEmpty(credentials)
            && this.isLoginMissmatchPattern(credentials)
            && this.isPasswordMissmatchPattern(credentials)
    }

    isEmpty(credentials) {
        return (credentials.login && credentials.password) || this.showMessage('empty')
    }

    isLoginMissmatchPattern(credentials) {
        return this.emailPattern.test(credentials.login) || this.showMessage('logError')
    }

    isPasswordMissmatchPattern(credentials) {
        return this.passwordPattern.test(credentials.password) || this.showMessage('passError')
    }

    isLogAndPasEqualsREsponce(responce, credentials) {
        return (responce.login == credentials.login
            && responce.password == credentials.password)
            || this.showMessage('missmatch')
    }

    showMessage(message) {
        this.errorMsg = this.errorsMsgList[message]
        return false;
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    login(credentials) {
        return fetch(this.userData)
            .then(responce => {
                if (responce.status == 200) {
                    return responce.json()
                } else {
                    console.log(responce.status);
                    return;
                }
            })
    }

    setProjects(projects) {
        let markup = '';
        projects.forEach(project => {
            markup += `<div class="project"><a href="${project[1].url}">${project[0].name}</a></div>`
        })
        return markup;
    }


}