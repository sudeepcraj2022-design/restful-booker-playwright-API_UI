import { test, expect } from '@fixtures/ui/page-instance'
import { RandomDataUtil } from '@utils/random-data-generator';


test.describe('Home Page functionality', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate()
    });

    test('UI010 Contact form is visible on homepage', async ({ homePage }) => {

        await expect(homePage.contactForm.container).toBeVisible();
    });

    test('UI011 Submit contact form with all valid fields', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData)

        await expect(homePage.contactForm.successMessage).toHaveText(/Thanks for getting in touch/);

    });

    test('UI012 Success message appears with full name', async ({ homePage }) => {
        const fullName = RandomDataUtil.getFullName();

        const contactData = {
            name: fullName,
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData)

        await expect(homePage.contactForm.successMessage).toContainText(`${fullName}`);

    });

});