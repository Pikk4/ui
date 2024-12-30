const { join } = require('path');

const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');


/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'pikka-',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
