module.exports = {
    extends: "airbnb-base",

    // es6 has been set by default
    env: {
        browser: true,
        node: true,
    },

    // overrides
    rules: {
        "linebreak-style": [0, "windows"],
        "quotes": [2, "double"],
        "quote-props": ["error", "consistent-as-needed"],
        "indent": ["error", 4],
        "no-trailing-spaces": 0,
        "semi": ["warn", "never"],
        "no-unused-vars": "warn",
        "camelcase": 0,
    },
}
