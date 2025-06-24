module.exports = {
    env: {
        node: true,
        es2022: true
    },
    parserOptions: {
        "sourceType": "module",
        "ecmaVersion": 2020,
        "ecmaFeatures": {
            "modules": true,
            "jsx": true,
            "experimentalObjectRestSpread": true
        },
        babelOptions: {
            presets: ["@babel/preset-env"],
            parserOpts: {
                plugins: [
                    "vue", 
                    "jsx",  
                    '@typescript-eslint']
            },
        },
        
    },
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-essential'
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {}
};