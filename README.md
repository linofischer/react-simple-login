# Simple react login window

This is a simple react based login window.

## Installation

Use npm to install the package.

```bash
npm install @linofischer/react-simple-login
```
![login image](https://raw.githubusercontent.com/linofischer/simple-react-login-window/master/src/assets/Login.png)

## LoginProps
#### You have to use one of theses attributes:  **formEvents**, **credentials** or **checkCredentials**!


```typescript 
export type LoginProps = {
    // Headline of the window
    headline?: string;
    // Message when the login failed
    loginFailedMessage?: string;
    // Set the credentials -> the component will check if  credentials are
    // matching - DO NOT USE THIS IN PRODUCTION!
    credentials?: {
        // Callback if login was successfull
        callback: (loginSuccess: boolean) => void;
        password: string;
        username?: string;
        // If the login was successfull, save a flag in localstorage to
        // skip login next time
        saveLoginStateToLocalStorage?: boolean = false;
    },
// Function to check credentials
    checkCredentials?: {
        checkPassword: (password: string, username?: string) => Promise<boolean>;
        // If a username is needed in the function above
        username?: boolean = false;
    },
    // Get the raw events
    formEvents?: {
        // Password input field value changed
        onPasswordChange: (password: string) => void;
        // Login button clicked
        onLoginTrigger: (logintriggered: true) => void;
        // Username input field value changed
        onUsernameChange?: (username: string) => void;
        // Show "wrong username/password" message
        showLoginFailedMessage?: boolean = true;
    }
} 
```
## Usage

#### **formEvents** - get the raw events and the full control:
```typescript
<Login
    formEvents={{
        onPasswordChange: (password: string) =>  console.log("password", password),
        onUsernameChange: (username: string) => console.log("username", username),
        onLoginTrigger: (loginClicked: true) => console.log("loginClicked", loginClicked)
    }}
/>
```

#### **credentials** - use password (and username), the component then checks if it matches the input fields (DO NOT USE IN PRODUCTION): 
```typescript
<Login
    credentials={{
        password: '1234',
        username: 'user',
        callback:(success: boolean) => {console.log('Login success', success)}
    }}
/>
```

#### **checkCredentials** - use a function that checks the password (and username):
```typescript
<Login
    checkCredentials={{
        checkPassword: async (password: string, username: string) => {
            // await anyAsyncFunction();    
            // return resultof anyAsyncFunction
            console.log("username", username);
            console.log("password", password);
            return true;
        },
        username: true
    }}
/>

```

## License
[MIT](https://choosealicense.com/licenses/mit/)