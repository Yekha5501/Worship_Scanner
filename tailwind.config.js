module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // All files in components/Screens directory and subdirectories
    "./components/**/*.{js,jsx,ts,tsx}",
    // Specific file

    // All files in Constants directory and subdirectories
    // Add specific files or other directories if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1cc6ff",
        secondary: "#5a6773",
        danger: "#e3342f",
             dark: '#333333',
                'dark-gray': '#555555',
                'dark-blue': '#0073e6',
      },
          fontSize: {
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
            },
            spacing: {
                '0': '0px',
                '1': '0.25rem',
                '2': '0.5rem',
                '3': '0.75rem',
                '4': '1rem',
                '5': '1.25rem',
                '6': '1.5rem',
                '8': '2rem',
                '10': '2.5rem',
                '12': '3rem',
                '16': '4rem',
                '20': '5rem',
                '24': '6rem',
                '32': '8rem',
                '40': '10rem',
                '48': '12rem',
                '56': '14rem',
                '64': '16rem',
            },

             fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      
    },
  },
  plugins: [],
};
