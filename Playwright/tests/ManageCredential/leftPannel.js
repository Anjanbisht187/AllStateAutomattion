// LeftPanelPage.js
import {Page} from '@playwright/test'
export class LeftPanelPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // /**
    //  * Returns a Playwright locator for the given main icon name in the left panel.
    //  * @param {string} mainIconName
    //  */
    getMainIcon(mainIconName) {
        return this.page.locator(`//nav[@id="sidebar"]//ul//li//div//div[contains(., "${mainIconName}")]`);
    }

    /**
     * Returns a Playwright locator for the given submenu icon text.
     * @param {string} subIconName
     */
    getSubIcon(subIconName) {
        return this.page.locator(`//ul[@class='bg-primary-light rounded-b-md']//li//a//div[normalize-space(text())='${subIconName}']`);
    }

    /**
     * Clicks on a submenu item under a main menu icon.
     * @param {string} mainIconName
     * @param {string} subIconName
     */
    async clickOnSubMenu(mainIconName, subIconName) {
        const mainIcon = this.getMainIcon(mainIconName);
        await mainIcon.scrollIntoViewIfNeeded();
        await mainIcon.click();
        

        // Optional wait to let submenu appear
        await this.page.waitForTimeout(1000);

        const subIcon = this.getSubIcon(subIconName);
        await subIcon.waitFor({ state: 'visible', timeout: 5000 });
        await subIcon.click();
    }
}
