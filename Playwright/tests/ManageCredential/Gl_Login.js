import {Page} from '@playwright/test'
// HitachiLogin.js
export class HitachiLogin {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator('#username');
        this.userPassword = page.locator('#password');
        this.loginButton = page.locator('#kc-login');
    }

    async loginUser(email, pwd) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(pwd);
        await this.loginButton.click();
    }
}

