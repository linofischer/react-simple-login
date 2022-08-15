import React, { useEffect, useState } from 'react';
import './Login.css';

// Credentials to check if passwort (and username) is corect. DO NOT USE THIS IN PRODUCTION!
interface Credentials {
    credentials: {
        // Callback true if the credentials matching (login success), false if not
        callback: (loginSuccess: boolean) => void;
        // Passowrd
        password: string;
        // Username
        username?: string;
        // If the login was successfull, save a flag in localstorage to skip login next time
        saveLoginStateToLocalStorage?: boolean;
    }
    checkCredentials?: never;
    formEvents?: never;
}
type CheckPassword = (password: string) => Promise<boolean>;
// Function to check credentials
type CheckUsernameAndPassword = (password: string, username: string) => Promise<boolean>;
interface CheckCredentials {
    checkCredentials: {
        // Function that check if password (and username) matching
        checkPassword: CheckPassword | CheckUsernameAndPassword;
        username?: boolean;
    }
    credentials?: never;
    formEvents?: never;
}

// Events 
interface FormEvents {
    formEvents: {
        // Password input field value changes
        onPasswordChange: (password: string) => void;
        // Login button clicked
        onLoginTrigger: (logintriggered: true) => void;
        // Username input field value changes
        onUsernameChange?: (username: string) => void;
        // Show "wrong username/password" message
        showLoginFailedMessage?: boolean;
    }
    credentials?: never;
    checkCredentials?: never;
}

type VariantsOfCredentials = Credentials | CheckCredentials | FormEvents;


export type LoginProps = {
    // Headline of the window
    headline?: string;
    // Customize login failed message
    loginFailedMessage?: string;
} & VariantsOfCredentials;

const DEFAULT_LOCAL_STORAGE_KEY = 'simple-login';

const Login = ({
    credentials,
    checkCredentials,
    formEvents,
    loginFailedMessage,
    headline,
}: LoginProps) => {

    const [loginData, setLoginData] = useState<{ username?: string, password: string }>({ password: '' })
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
    const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);

    useEffect(() => {
        if (!credentials && !checkCredentials && !formEvents) {
            throw new Error('You need "credentials", "checkCredentials" or "formEvents" as a property.');
        }

        if (credentials?.saveLoginStateToLocalStorage === true && credentials?.callback && localStorage.getItem(DEFAULT_LOCAL_STORAGE_KEY) === 'true') {
            credentials.callback(true);
        }
    }, [credentials]);

    async function handleLogin() {
        // Input is a function to check the credentials
        if (checkCredentials) {
            setLoadingSpinner(true);
            let loginSuccess;
            if (checkCredentials.username) {
                loginSuccess = await checkCredentials.checkPassword(loginData?.password, loginData!.username!);
            } else {
                loginSuccess = await (checkCredentials.checkPassword as CheckPassword)(loginData?.password);
            }
            if (!loginSuccess) {
                setInvalidCredentials(true);
            }
            setLoadingSpinner(false);
            return loginSuccess;
            // Input is a password (and username); Check the credentials here
        } else if (credentials) {
            if (loginData.password === credentials?.password && (credentials?.username == null || loginData.username === credentials.username)) {
                if (credentials.saveLoginStateToLocalStorage) {
                    localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
                }
                credentials.callback(true);
                // Input are callback functions to get the raw value of the inputs
            } else {
                credentials?.callback(false);
                setInvalidCredentials(true);
            }
        }
        else {
            formEvents.onLoginTrigger(true);
        }
    }

    function handleUserNameChange(event: React.FormEvent<HTMLInputElement>) {
        setLoginData({ ...loginData, username: event.currentTarget.value });
        setInvalidCredentials(false);
        if (formEvents?.onUsernameChange) {
            formEvents.onUsernameChange(event.currentTarget.value);
        }
    }

    function handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
        setLoginData({ ...loginData, password: event.currentTarget.value })
        setInvalidCredentials(false);
        if (formEvents) {
            formEvents.onPasswordChange(event.currentTarget.value);
        }
    }

    return <>
        <div className='row content-center'>
            <div className='col items-center card'>
                {loadingSpinner && <div className='loading-spinner'
                    data-testid="loading-spinner">
                    <div className="lds-dual-ring"></div>
                </div>
                }
                <h3> {headline ?? <>Login</>}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {(credentials?.username || checkCredentials?.username || formEvents?.onUsernameChange) && <label> <b>Username:</b></label>}
                            </td>
                            <td>
                                {(credentials?.username || checkCredentials?.username || formEvents?.onUsernameChange) &&
                                    <input
                                        onChange={handleUserNameChange}
                                        data-testid="username-input"
                                    />}
                            </td>
                        </tr>
                        <tr>
                            <td><b>Password:</b></td>
                            <td>
                                <input
                                    type="password"
                                    onChange={handlePasswordChange}
                                    data-testid="password-input"
                                />

                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    onClick={handleLogin}
                    data-testid="login-button"
                >Login</button>
                {(invalidCredentials || formEvents?.showLoginFailedMessage) &&
                    <p className='login-faild-message'
                        data-testid="login-failed-message"
                    > {loginFailedMessage ?? <span>Invalid credentials.</span>}</p>}
            </div>
        </div >
    </>;
}

export default Login;