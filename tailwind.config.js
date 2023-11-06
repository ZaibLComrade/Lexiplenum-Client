/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	
	theme: {
		extend: {},
	},
	
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					"primary": "#0A4F6D",
					"secondary": "#CCCCCC",
					"accent": "#DC143C",
					"neutral": "#FFB6C1",
					"base-100": "#ffffff",
				},
			},
			{
				dark: {
					"primary": "#0A4F6D",
					"secondary": "#CCCCCC",
					"accent": "#DC143C",
					"neutral": "#FFB6C1",
					"base-100": "#212121"
				}
			}
		],
	},
}

