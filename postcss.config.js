const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.js"
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const cssnano = require("cssnano");

if (process.env.NODE_ENV == "production") {
  module.exports = {
    plugins: [require("tailwindcss"), require("autoprefixer"), purgecss]
  };
} else {
  module.exports = {
    plugins: [require("tailwindcss"), require("autoprefixer")]
  };
}
