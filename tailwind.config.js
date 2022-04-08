module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'd-900':'#181818',
        'd-800':'#1f1f1f',
        'd-700':'#2a2a2a',
        'd-600':'#2a2a2a',
        'd-500':'#5d5d5d',
        'd-400':'#e0e0e0',
        'p-100':'#F4511E',

        'xy-50':'#f6f6f9',
        'xy-100':'#eaeaef',
        'xy-200':'#dcdce4',
      },

      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'mont':['Montserrat Alternates','sans-serif'],
        'hub':['Hubballi', 'cursive'],
        'rubik':['Rubik','sans-serif'],
        'ruboto-c':['Roboto Condensed','sans-serif'],
        'rale':['Raleway','sans-serif'],
      },
      fontSize:{
        'xxs':'10px'
      },

    },
  },
  plugins: [],
}
