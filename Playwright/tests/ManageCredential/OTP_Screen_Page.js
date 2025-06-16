// OtpPage.js
export class OtpPage {
    // /**
    //  * @param {import('@playwright/test').Page} page
    //  */
    constructor(page) {
        this.page = page;
        this.otpInputs = page.locator('//div[@class="otp-inputs"]//input');
        this.verifyButton = page.locator('#verify-button');
    }

    /**
     * Enter OTP digits one by one into input fields
     * @param {string} otp - e.g. "123456"
     */
    async enterOtp(otp) {
        const fields = this.otpInputs;
        for (let i = 0; i < otp.length; i++) {
            await fields.nth(i).fill(otp[i]);
        }
    }

    /**
     * Click on the verify button to submit the OTP
     */
    async submitOtp() {
        await this.verifyButton.click();
    }
}
