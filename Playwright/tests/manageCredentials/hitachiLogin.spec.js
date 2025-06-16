// login-with-otp.spec.js
import { test, expect } from '@playwright/test';
import readline from 'readline';

import { HitachiLogin } from '../ManageCredential/Gl_Login.js'
import { OtpPage } from '../ManageCredential/OTP_Screen_Page.js';
import { LeftPanelPage } from '../ManageCredential/leftPannel.js';
import login_GL from '../Data/loginCred.js'
import common from '../Data/common.js'

// Helper to enter OTP manually in terminal
async function promptOTP() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(' Please enter the OTP received in Yopmail: ', otp => {
            rl.close();
            resolve(otp.trim());
        });
    });
}

test('User should be able to login and navigate to Manage Credentials', async ({ page }) => {
    const loginPage = new HitachiLogin(page);
    const otpPage = new OtpPage(page);
    const leftPanel = new LeftPanelPage(page);

    await page.goto('https://smoketest.bsbu-bmsdev.com/customer/');
    await page.setViewportSize({ width: 1920, height: 1080 }); // Equivalent to maximizeWindow

    // Login with credentials
    await loginPage.loginUser(login_GL.email, login_GL.pwd);

    await page.waitForTimeout(8000); // Wait for OTP page to load

    const otp = await promptOTP(); // Manual OTP input from terminal
    await otpPage.enterOtp(otp);
    await otpPage.submitOtp();

    await page.waitForTimeout(3000); // wait for dashboard

    // Navigate using left panel menu
    await leftPanel.clickOnSubMenu(common["Access Management"], 'Manage Credentials');

    await page.waitForTimeout(3000);
});

 