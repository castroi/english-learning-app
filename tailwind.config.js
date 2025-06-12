module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kitty-pink': '#FF9EC8',
        'kitty-blue': '#97D2FB',
        'kitty-yellow': '#FFE5A3',
      },
      fontFamily: {
        'fredoka': ['Fredoka One', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}