import { test, expect } from '@fixtures/ui/page-instance'
import { RandomDataUtil } from '@utils/random-data-generator';
import { CONTACT_FORM_ERRORS } from '@constants/error-messages';


test.describe('Home Page functionality', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate()
    });

    test('UI013 Submit contact form with empty name', async ({ homePage }) => {

        const contactData = {
            name: '',
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toHaveText(CONTACT_FORM_ERRORS.NAME_BLANK);

    });

    test('UI014 Submit contact form with empty email', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: '',
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toHaveText(CONTACT_FORM_ERRORS.EMAIL_BLANK);

    });

    test('UI015 Submit contact form with invalid email format', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getFirstName(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toHaveText(CONTACT_FORM_ERRORS.EMAIL_INVALID);

    });

    test('UI016 Submit contact form with empty phone', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: '',
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toContainText(CONTACT_FORM_ERRORS.PHONE_BLANK);

    });

    test('UI017 Submit contact form with empty subject', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: '',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toContainText(CONTACT_FORM_ERRORS.SUBJECT_BLANK);

    });

    test('UI018 Submit contact form with empty message', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: ''
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toContainText(CONTACT_FORM_ERRORS.MESSAGE_BLANK);

    });

    test('UI019 Submit contact form with all fields empty', async ({ homePage }) => {

        await homePage.contactForm.submitButton.click();

        const expectedErrors = [
                CONTACT_FORM_ERRORS.NAME_BLANK,
                CONTACT_FORM_ERRORS.EMAIL_BLANK,
                CONTACT_FORM_ERRORS.PHONE_BLANK,
                CONTACT_FORM_ERRORS.SUBJECT_BLANK,
                CONTACT_FORM_ERRORS.MESSAGE_BLANK
            ];

        await expect(homePage.contactForm.container).toBeVisible();

        for(const error of expectedErrors){
            await expect(homePage.contactForm.errorMessage).toContainText(error);
        }
    });

    test('UI020 Phone field enforces minimum length', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: '2345',
            subject: 'Booking Inquiry',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toContainText(CONTACT_FORM_ERRORS.PHONE_MINCHAR);
        
    });

    test('UI021 Subject field enforces minimum length', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'ABC',
            message: 'I would like to know more about the Suite.'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toContainText(CONTACT_FORM_ERRORS.SUBJECT_MINCHAR);
        
    });

    test('UI022 Message field enforces minimum length', async ({ homePage }) => {

        const contactData = {
            name: RandomDataUtil.getFullName(),
            email: RandomDataUtil.getEmail(),
            phone: RandomDataUtil.getPhoneNumber(),
            subject: 'Booking Inquiry',
            message: 'ABCD'
        };
        await expect(homePage.contactForm.container).toBeVisible();
        await homePage.contactForm.submitMessage(contactData);

        await expect(homePage.contactForm.errorMessage).toContainText(CONTACT_FORM_ERRORS.MESSAGE_MINCHAR);
        
    });


});