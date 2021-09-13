module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'cart-bounce': 'cart-bounce 8s linear infinite',
        'spin-slow': 'spin 5s linear infinite'
      },
      keyframes: {
        'cart-bounce': {
          '0%, 90%, 95%, 100%': { transform: 'translate(0.5rem, -0.375rem)' },
          '92.5%, 97.5%': { transform: 'translate(0.5rem, -0.65625rem)' }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      container: {
        'center': true,
        // 'padding': '2rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
