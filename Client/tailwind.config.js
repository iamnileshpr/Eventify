/** @type {import('tailwindcss'.Config)} */
const plugin = require("eslint-plugin-react-hooks");

export default {
    content: [
        "index.html",
        "./src/**/ * / { js, ts, jsx, tsx }
        ",
    ],
    theme: { extend: {} },
    plugins: [],
}