/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px', 
      },
      minHeight: {
        '3xl': '1080px',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(90deg,#ab9c69,#dbd896 20%,#97896f 40%,#aca36c 60%,#fefab0 80%,#8c6e39)',
      },
      colors: {
        teal: {
          '900': 'rgba(52, 63, 74, 1)',
          '300': 'rgba(204, 207, 210, 1)',
        },
      },
      fontFamily: {
        'display':
        [
          'FuturaPTLight', 'sans'
        ],
        'futura-bold':
      [
        'FuturaPTBold', 'sans'
      ],
        'semimedium':
        [
          'FuturaPTMedium', 'sans'
        ],
        'extrabold':
        [
          'FuturaPTBold', 'sans'
        ],
        'bold':
        [
          'FuturaPTHeavy', 'sans'
        ]
      },
      fontWeight: {
        'verybold': '700',
      },
      backgroundColor: {
        'putty-200': 'rgb(251 251 250)',
        'putty-500': 'rgb(241 240 237)',
        'putty-600': '#eeece9',
      },
      textColor: {
        'putty-900': 'rgb(228, 225, 220)',
      },
      typography: {
        DEFAULT: {
          css: {
              color: 'rgb(52 63 74)',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              '.prose img': {
                marginBottom: '4rem',
                marginTop: '4rem',
                maxWidth: '100%',
              },
              h2: {
                fontSize: '2.25rem',
                lineHeight: '2.5rem',
                fontFamily: 'FuturaPTBold',
                textTransform: 'uppercase',
                color: 'rgba(52, 63, 74, 1)'
              },
              p: {
                fontSize: '1.125rem',
                color: 'black', 
              },
              h3: {
                fontSize: '1.875rem',
                lineHeight: '2.25rem',
                fontFamily: 'FuturaPTBold',
                textTransform: 'uppercase',
                color: 'rgba(52, 63, 74, 1)'
              }
          },
        },
      },
      '&_a': {
        textDecoration: 'underline',
      },
      '&_li': {
        marginTop: '1.5rem', 
      },
      '&_ol': {
        listStyleType: 'disc',
        listStylePosition: 'outside',
        marginLeft: '1rem',
      },
      '&_ul': {
        listStyleType: 'disc',
        listStylePosition: 'outside',
        marginLeft: '1rem',
        textAlign: 'left',
      },
        },
      },
  plugins: [require('@tailwindcss/typography')],
  }
