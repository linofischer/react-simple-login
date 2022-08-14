/// <reference types="react" />
import './Login.css';
interface Credentials {
    credentials: {
        callback: (loginSuccess: boolean) => void;
        password: string;
        username?: string;
        saveLoginStateToLocalStorage?: boolean;
    };
    checkCredentials?: never;
    formEvents?: never;
}
declare type CheckPassword = (password: string) => Promise<boolean>;
declare type CheckUsernameAndPassword = (password: string, username: string) => Promise<boolean>;
interface CheckCredentials {
    checkCredentials: {
        checkPassword: CheckPassword | CheckUsernameAndPassword;
        username?: boolean;
    };
    credentials?: never;
    formEvents?: never;
}
interface FormEvents {
    formEvents: {
        onPasswordChange: (password: string) => void;
        onLoginTrigger: (logintriggered: true) => void;
        onUsernameChange?: (username: string) => void;
        showLoginFailedMessage?: boolean;
    };
    credentials?: never;
    checkCredentials?: never;
}
declare type VariantsOfCredentials = Credentials | CheckCredentials | FormEvents;
export declare type LoginProps = {
    headline?: string;
    loginFailedMessage?: string;
} & VariantsOfCredentials;
declare const Login: ({ credentials, checkCredentials, formEvents, loginFailedMessage, headline, }: LoginProps) => JSX.Element;
export default Login;
