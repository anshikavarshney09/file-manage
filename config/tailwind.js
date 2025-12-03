module.exports = {
  content: [
    "./views/**/*.ejs",   // scan all EJS templates
    "./public/**/*.js",   // scan JS files
    "./node_modules/flowbite/**/*.js" // include Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};


