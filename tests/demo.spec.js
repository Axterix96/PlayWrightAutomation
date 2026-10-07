const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData')));

test.describe('Demo client app flow', () => {
  for (const data of dataset) {
    test(`testing with ${data.productName}`, async ({ page }) => {
      const poManager = new POManager(page);
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(data.username, data.password);

      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(data.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(data.productName);
      await cartPage.Checkout();

      await expect(page.locator('text=Checkout')).toBeVisible();
    });
  }
});
