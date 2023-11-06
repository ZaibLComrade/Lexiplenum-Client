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
					"primary": "#007ACC",
					"secondary": "#00A87E",
					"accent": "#DC143C",
					"neutral": "#F9F9F9",
					"base-100": "#ffffff",
				},
			},
			{
				dark: {
					"primary": "#1E90FF",
					"secondary": "#00CED1",
					"accent": "#FF7F50",
					"neutral": "#1A1A1A",
					"base-100": "#2E2E2E"
				}
			}
		],
	},
}

