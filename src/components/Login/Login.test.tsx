import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Login from './Login';

beforeEach(() => {
    setLogin(false);
    setPassword('');
    setUsername('');
    setShowLoginFailedMessage(false);
});

describe('Credentials', () => {
    // Render login with credentials
    test('Only password', () => {
        expect(login).toBe(false);
        render(<Login credentials={{ password: PASSWORD, callback: setLogin }} />);
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');
        expect(passwordInput).toBeInTheDocument();
        // invalid pw
        fireEvent.change(passwordInput, { target: { value: 'invalid pw' } });
        fireEvent.click(loginButton);
        expect(login).toBe(false);
        const loginFailedMessage = screen.getByTestId('login-failed-message');
        expect(loginFailedMessage).toHaveTextContent('Invalid credentials.')
        // valid pw
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        fireEvent.click(loginButton);
        expect(login).toBe(true);
    });

    test('Username and password', () => {
        expect(login).toBe(false);
        render(<Login credentials={{ password: PASSWORD, username: USERNAME, callback: setLogin }} />);
        const passwordInput = screen.getByTestId('password-input');
        const usernameInput = screen.getByTestId('username-input');
        const loginButton = screen.getByTestId('login-button');
        expect(passwordInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        // invalid username
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        fireEvent.change(usernameInput, { target: { value: 'invalid username' } });
        fireEvent.click(loginButton);
        expect(login).toBe(false);
        const loginFailedMessage = screen.getByTestId('login-failed-message');
        expect(loginFailedMessage).toHaveTextContent('Invalid credentials.')
        //invalid pw
        fireEvent.change(passwordInput, { target: { value: 'invalid pw' } });
        fireEvent.change(usernameInput, { target: { value: USERNAME } });
        fireEvent.click(loginButton);
        expect(login).toBe(false);
        const loginFailedMessage_second = screen.getByTestId('login-failed-message');
        expect(loginFailedMessage_second).toHaveTextContent('Invalid credentials.')
        // valid pw
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        fireEvent.change(usernameInput, { target: { value: USERNAME } });
        fireEvent.click(loginButton);
        expect(login).toBe(true);
    });
    test('Password and optional parameter', () => {
        expect(login).toBe(false);
        render(<Login credentials={{ password: PASSWORD, callback: setLogin, saveLoginStateToLocalStorage: true }}
            loginFailedMessage={LOGIN_FAILED_MESSAGE} />);
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');
        expect(passwordInput).toBeInTheDocument();
        // invalid pw
        fireEvent.change(passwordInput, { target: { value: 'invalid pw' } });
        fireEvent.click(loginButton);
        expect(login).toBe(false);
        const loginFailedMessage = screen.getByTestId('login-failed-message');
        expect(loginFailedMessage).toHaveTextContent('INVALID PASSWORD!')
        // valid pw
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.setItem = jest.fn();
        fireEvent.click(loginButton);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(login).toBe(true);
    });
    test('Localstorage value is loaded', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        Storage.prototype.getItem = jest.fn().mockReturnValue('true');
        setLogin(false);
        const mockCallback = jest.fn();
        render(<Login credentials={{ password: PASSWORD, callback: mockCallback, saveLoginStateToLocalStorage: true }}
            loginFailedMessage={LOGIN_FAILED_MESSAGE} />);
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);

        expect(mockCallback).toHaveBeenCalledWith(true);
    });
    test('Localstorage value is not loaded', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        Storage.prototype.getItem = jest.fn().mockReturnValue('false');
        render(<Login credentials={{ password: PASSWORD, callback: setLogin }}
            loginFailedMessage={LOGIN_FAILED_MESSAGE} />);
        expect(localStorage.getItem).toHaveBeenCalledTimes(0);
    });
});

describe('Check Credentials function', () => {
    async function checkPassword(pw: string): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(function () {
                if (pw === PASSWORD) {
                    resolve(true);
                    setLogin(true);
                } else {
                    resolve(false);
                    setLogin(false);
                }
            });
        });
    };
    async function checkPasswordAndUsername(pw: string, user: string): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(function () {
                if (pw === PASSWORD && user === USERNAME) {
                    resolve(true);
                    setLogin(true);
                } else {
                    resolve(false);
                    setLogin(false);
                }
            });
        });
    };
    test('Only password', async () => {
        expect(login).toBe(false);
        render(<Login checkCredentials={{ checkPassword: checkPassword }} />);
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');
        expect(passwordInput).toBeInTheDocument();
        // invalid pw
        fireEvent.change(passwordInput, { target: { value: 'invalid pw' } });
        fireEvent.click(loginButton);
        expect(login).toBe(false);
        const loadingSpinner = screen.getByTestId('loading-spinner');
        expect(loadingSpinner).toBeInTheDocument();
        await waitFor(() => {
            const loginFailedMessage = screen.getByTestId('login-failed-message');
            expect(loginFailedMessage).toHaveTextContent('Invalid credentials.')
        }, { timeout: 1000 });
        // valid pw
        expect(login).toBe(false);
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        fireEvent.click(loginButton);
        const loadingSpinnerTwo = screen.getByTestId('loading-spinner');
        expect(loadingSpinnerTwo).toBeInTheDocument();
        await waitFor(() => {
            expect(login).toBe(true);
        }, { timeout: 2000 });
    });
    test('Password and username', async () => {
        expect(login).toBe(false);
        render(<Login checkCredentials={{ checkPassword: checkPasswordAndUsername, username: true }} />);
        const passwordInput = screen.getByTestId('password-input');
        const usernameInput = screen.getByTestId('username-input');
        const loginButton = screen.getByTestId('login-button');
        expect(passwordInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        // invalid username
        fireEvent.change(usernameInput, { target: { value: 'invalid username' } });
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        fireEvent.click(loginButton);
        expect(login).toBe(false);
        const loadingSpinner = screen.getByTestId('loading-spinner');
        expect(loadingSpinner).toBeInTheDocument();
        await waitFor(() => {
            const loginFailedMessage = screen.getByTestId('login-failed-message');
            expect(loginFailedMessage).toHaveTextContent('Invalid credentials.')
        }, { timeout: 1000 });
        // valid username and pw
        expect(login).toBe(false);
        fireEvent.change(passwordInput, { target: { value: PASSWORD } });
        fireEvent.change(usernameInput, { target: { value: USERNAME } });
        fireEvent.click(loginButton);
        const loadingSpinnerTwo = screen.getByTestId('loading-spinner');
        expect(loadingSpinnerTwo).toBeInTheDocument();
        await waitFor(() => {
            expect(login).toBe(true);
        }, { timeout: 2000 });
    });
    describe('Form events', () => {
        test('form events', async () => {
            expect(login).toBe(false);
            const loginTriggerSpy = jest.fn();
            render(<Login formEvents={{
                onPasswordChange: setPassword,
                onLoginTrigger: loginTriggerSpy,
                onUsernameChange: setUsername,
                showLoginFailedMessage
            }} />);
            const passwordInput = screen.getByTestId('password-input');
            const usernameInput = screen.getByTestId('username-input');
            const loginButton = screen.getByTestId('login-button');
            expect(passwordInput).toBeInTheDocument();
            expect(usernameInput).toBeInTheDocument();
            expect(loginButton).toBeInTheDocument();
            fireEvent.change(passwordInput, { target: { value: PASSWORD } });
            fireEvent.change(usernameInput, { target: { value: USERNAME } });
            expect(password).toBe(PASSWORD);
            expect(username).toBe(USERNAME);
            fireEvent.click(loginButton);
            expect(loginTriggerSpy).toHaveBeenCalledWith(true);
            expect(showLoginFailedMessage).toBe(false);
        })
        test('invalid login message', () => {
            setShowLoginFailedMessage(true);
            render(<Login formEvents={{
                onPasswordChange: setPassword,
                onLoginTrigger: setLogin,
                onUsernameChange: setUsername,
                showLoginFailedMessage
            }} />);
            const loginFailedMessage = screen.getByTestId('login-failed-message');
            expect(loginFailedMessage).toHaveTextContent('Invalid credentials.')
        })
    })
    test('Invaid inputs --> throw error', () => {
        expect(() => {
            // @ts-ignore
            render(<Login />);
        }).toThrowError();
    })
});


// Needed for testing
const PASSWORD = '1234';
const USERNAME = 'user';
const LOGIN_FAILED_MESSAGE = 'INVALID PASSWORD!';
var login = false;
function setLogin(loginSuccess: boolean) {
    login = loginSuccess;
}
var password = '';
function setPassword(pw: string) {
    password = pw;
}
var username = '';
function setUsername(user: string) {
    username = user;
}
var showLoginFailedMessage = false;
function setShowLoginFailedMessage(state: boolean) {
    showLoginFailedMessage = state;
}