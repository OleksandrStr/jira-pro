const path = require("path");

module.exports = {
    style: {
        postcss: {
            mode: "file", // tells CRACO to use your postcss.config.js instead of CRA's internal one
        },
    },
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
};
