/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	
	theme: {
		extend: {
			colors: {
				"dark-contrast": "#FFFFFF",
				"light-contrast": "#333333"
			}
		},
	},
	
	plugins: [
		require('daisyui'),
		require('@tailwindcss/aspect-ratio'),
	],
	daisyui: {
		themes: [
			{
				light: {
					"primary": "#1565C0",
					"secondary": "#FF6F61",
					"accent": "#4CAF50",
					"neutral": "#E0E0E0",
					"base-100": "#ffffff",
				},
			},
			{
				dark: {
					"primary": "#40C4FF",
					"secondary": "#FF6F61",
					"accent": "#FFD700",
					"neutral": "#121212",
					"base-100": "#2C2C2C"
				}
			}
		],
	},
}

