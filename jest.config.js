module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        ".(css|less|scss)$": "identity-obj-proxy",
    },
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }   
};