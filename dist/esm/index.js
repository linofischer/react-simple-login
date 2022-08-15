import React, { useState, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".row {\r\n    display: flex;\r\n    flex-direction: row;\r\n    margin-bottom: 0.5em;\r\n}\r\n\r\n.col {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.content-center {\r\n    justify-content: center;\r\n}\r\n\r\n.items-center {\r\n    align-items: center;\r\n}\r\n\r\nlabel {\r\n    text-align: start;\r\n    margin-right: 0.5em;\r\n}\r\n\r\n.gap {\r\n    height: 0.5em;\r\n}\r\n\r\n.card {\r\n    max-width: 500px;\r\n    height: 320px;\r\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\r\n    transition: 0.3s;\r\n    padding: 0 1em 0 1em;\r\n}\r\n\r\n.card:hover {\r\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\nbutton {\r\n    background-color: darkgrey;\r\n    border: none;\r\n    border-radius: 5%;\r\n    color: white;\r\n    padding: 15px 32px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin-top: 1em\r\n}\r\n\r\nbutton:hover {\r\n    cursor: pointer;\r\n    background-color: grey;\r\n}\r\n\r\n.login-faild-message {\r\n    color: red;\r\n}\r\n\r\ninput {\r\n    width: 100%;\r\n    padding: 12px 20px;\r\n    margin: 8px 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\ntd {\r\n    padding-right: 1em;\r\n    text-align: initial;\r\n}\r\n\r\n.loading-spinner {\r\n    position: absolute;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background-color: grey;\r\n    opacity: 0.5;\r\n    z-index: 50;\r\n}\r\n\r\n.lds-dual-ring {\r\n    margin: auto;\r\n    z-index: 100;\r\n    display: inline-block;\r\n    width: 80px;\r\n    height: 80px;\r\n    position:absolute;\r\n    margin-top: 10%;\r\n  }\r\n  .lds-dual-ring:after {\r\n    content: \" \";\r\n    display: block;\r\n    width: 64px;\r\n    height: 64px;\r\n    margin: 8px;\r\n    border-radius: 50%;\r\n    border: 6px solid black;\r\n    border-color: black transparent;\r\n    animation: lds-dual-ring 1.2s linear infinite;\r\n  }\r\n  @keyframes lds-dual-ring {\r\n    0% {\r\n      transform: rotate(0deg);\r\n    }\r\n    100% {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n  ";
styleInject(css_248z);

var DEFAULT_LOCAL_STORAGE_KEY = 'simple-login';
var Login = function (_a) {
    var credentials = _a.credentials, checkCredentials = _a.checkCredentials, formEvents = _a.formEvents, loginFailedMessage = _a.loginFailedMessage, headline = _a.headline;
    var _b = useState({ password: '' }), loginData = _b[0], setLoginData = _b[1];
    var _c = useState(false), invalidCredentials = _c[0], setInvalidCredentials = _c[1];
    var _d = useState(false), loadingSpinner = _d[0], setLoadingSpinner = _d[1];
    useEffect(function () {
        if (!credentials && !checkCredentials && !formEvents) {
            throw new Error('You need "credentials", "checkCredentials" or "formEvents" as a property.');
        }
        if ((credentials === null || credentials === void 0 ? void 0 : credentials.saveLoginStateToLocalStorage) === true && (credentials === null || credentials === void 0 ? void 0 : credentials.callback) && localStorage.getItem(DEFAULT_LOCAL_STORAGE_KEY) === 'true') {
            credentials.callback(true);
        }
    }, [credentials]);
    function handleLogin() {
        return __awaiter(this, void 0, void 0, function () {
            var loginSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!checkCredentials) return [3 /*break*/, 5];
                        setLoadingSpinner(true);
                        loginSuccess = void 0;
                        if (!checkCredentials.username) return [3 /*break*/, 2];
                        return [4 /*yield*/, checkCredentials.checkPassword(loginData === null || loginData === void 0 ? void 0 : loginData.password, loginData.username)];
                    case 1:
                        loginSuccess = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, checkCredentials.checkPassword(loginData === null || loginData === void 0 ? void 0 : loginData.password)];
                    case 3:
                        loginSuccess = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!loginSuccess) {
                            setInvalidCredentials(true);
                        }
                        setLoadingSpinner(false);
                        return [2 /*return*/, loginSuccess];
                    case 5:
                        if (credentials) {
                            if (loginData.password === (credentials === null || credentials === void 0 ? void 0 : credentials.password) && ((credentials === null || credentials === void 0 ? void 0 : credentials.username) == null || loginData.username === credentials.username)) {
                                if (credentials.saveLoginStateToLocalStorage) {
                                    localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
                                }
                                credentials.callback(true);
                                // Input are callback functions to get the raw value of the inputs
                            }
                            else {
                                credentials === null || credentials === void 0 ? void 0 : credentials.callback(false);
                                setInvalidCredentials(true);
                            }
                        }
                        else {
                            formEvents.onLoginTrigger(true);
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function handleUserNameChange(event) {
        setLoginData(__assign(__assign({}, loginData), { username: event.currentTarget.value }));
        setInvalidCredentials(false);
        if (formEvents === null || formEvents === void 0 ? void 0 : formEvents.onUsernameChange) {
            formEvents.onUsernameChange(event.currentTarget.value);
        }
    }
    function handlePasswordChange(event) {
        setLoginData(__assign(__assign({}, credentials), { password: event.currentTarget.value }));
        setInvalidCredentials(false);
        if (formEvents) {
            formEvents.onPasswordChange(event.currentTarget.value);
        }
    }
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'row content-center' },
            React.createElement("div", { className: 'col items-center card' },
                loadingSpinner && React.createElement("div", { className: 'loading-spinner', "data-testid": "loading-spinner" },
                    React.createElement("div", { className: "lds-dual-ring" })),
                React.createElement("h3", null,
                    " ", headline !== null && headline !== void 0 ? headline : React.createElement(React.Fragment, null, "Login")),
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, ((credentials === null || credentials === void 0 ? void 0 : credentials.username) || (checkCredentials === null || checkCredentials === void 0 ? void 0 : checkCredentials.username) || (formEvents === null || formEvents === void 0 ? void 0 : formEvents.onUsernameChange)) && React.createElement("label", null,
                                " ",
                                React.createElement("b", null, "Username:"))),
                            React.createElement("td", null, ((credentials === null || credentials === void 0 ? void 0 : credentials.username) || (checkCredentials === null || checkCredentials === void 0 ? void 0 : checkCredentials.username) || (formEvents === null || formEvents === void 0 ? void 0 : formEvents.onUsernameChange)) &&
                                React.createElement("input", { onChange: handleUserNameChange, "data-testid": "username-input" }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("b", null, "Password:")),
                            React.createElement("td", null,
                                React.createElement("input", { type: "password", onChange: handlePasswordChange, "data-testid": "password-input" }))))),
                React.createElement("button", { onClick: handleLogin, "data-testid": "login-button" }, "Login"),
                (invalidCredentials || (formEvents === null || formEvents === void 0 ? void 0 : formEvents.showLoginFailedMessage)) &&
                    React.createElement("p", { className: 'login-faild-message', "data-testid": "login-failed-message" },
                        " ", loginFailedMessage !== null && loginFailedMessage !== void 0 ? loginFailedMessage : React.createElement("span", null, "Invalid credentials.")))));
};

export { Login };
//# sourceMappingURL=index.js.map
