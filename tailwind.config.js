module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '1rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#529B03",
          "secondary": "#E9E92F",
          "accent": "#F6F9C8",
          "neutral": "#a7f3d0",
          "base-100": "#FFFFFF",
          "info": "#CAE2E8",
          "success": "#DFF2A1",
          "warning": "#F7E488",
          "error": "#F2B6B5",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
