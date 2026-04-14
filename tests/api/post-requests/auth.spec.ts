import { test, expect } from '@fixtures/api/request-context';
import { ENV } from '@config/env';

test.describe('@smoke - Auth - Generate Token', () => {

    test('TC001 - Generate token with valid credentials', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: ENV.USERNAME,
                password: ENV.PASSWORD,
            }),
        });

        console.log('Status:', response.status());
        console.log('Response text:', await response.text());

        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.token).toBeDefined();
        expect(typeof body.token).toBe('string');
        expect(body.token.length).toBeGreaterThan(0);
    });

    test('TC002 - Generate token with invalid password', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: ENV.USERNAME,
                password: 'Invalid Password',
            }),
        });

        const body = await response.json();
        console.log('Error message:', body.error);

        expect(response.status()).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error).toBe('Invalid credentials');
        expect(body.token).toBeUndefined();
    });

    test('TC003 - Generate token with invalid username', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: 'Invalid Username',
                password: ENV.PASSWORD,
            }),
        });

        const body = await response.json();
        console.log('Error message:', body.error);

        expect(response.status()).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error).toBe('Invalid credentials');
        expect(body.token).toBeUndefined();
    });

    test('TC004 - Generate token with empty credentials', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: '',
                password: '',
            }),
        });

        const body = await response.json();
        console.log('Error message:', body.error);

        expect(response.status()).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error).toBe('Invalid credentials');
        expect(body.token).toBeUndefined();
    });

    test('TC005 - Generate token with missing password field', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: ENV.USERNAME,
            }),
        });

        const body = await response.json();
        console.log('Error message:', body.error);

        expect(response.status()).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error).toBe('Invalid credentials');
        expect(body.token).toBeUndefined();
    });

    test('TC006 - Generate token with missing username field', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                password: ENV.PASSWORD,
            }),
        });

        const body = await response.json();
        console.log('Error message:', body.error);

        expect(response.status()).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error).toBe('Invalid credentials');
        expect(body.token).toBeUndefined();
    });

    test('TC007 - Generate token with SQL injection in credentials', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: "' OR '1'='1",
                password: "' OR '1'='1",
            }),
        });

        const body = await response.json();
        console.log('Error message:', body.error);

        expect(response.status()).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error).toBe('Invalid credentials');
        expect(body.token).toBeUndefined();
    });

    test('TC008 - Token format validation', async ({ apiContext }) => {
        const response = await apiContext.post('/api/auth/login', {
            data: ({
                username: ENV.USERNAME,
                password: ENV.PASSWORD,
            }),
        });

        const body = await response.json();
        console.log('Response text:', await response.text());

        expect(response.status()).toBe(200);
        expect(body.token).toBeDefined();
        expect(typeof body.token).toBe('string');
        expect(body.token).toMatch(/^[a-zA-Z0-9]+$/);
        expect(body.token.length).toBeGreaterThanOrEqual(10);
    });

});