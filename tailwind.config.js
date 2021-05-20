module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		margin: {
			auto: 'auto',
			full: '100%',
		},
		extend: {
			gridTemplateColumns: {
				'7': 'repeat(7, minmax(0, 1fr))',
			}
		},
	},
	variants: {
		extend: {
			backgroundColor: ['checked'],
			borderColor: ['checked'],
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	],
}
