/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: {
					'100': '#E2E2D5',
					'200': '#888883',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					'100': '#E2E2D5',
					'200': '#888883',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'checked': {
					'0%': {
						rotate: '0deg',
						scale: '1'
					},
					'50%': {
						rotate: '35deg',
						scale: '1.09'
					},
					'100%': {
						rotate: '0deg',
						scale: '1'
					}
				},
				'animate-text-appear': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'25%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'75%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'checked': 'checked 0.5s cubic-bezier(0.5, -0.4, 0.5, 1.55)',
				'text-1': 'animate-text-appear 3s cubic-bezier(0.5, 0, 0.5, 1) forwards',
				'text-2': 'animate-text-appear 6s 3.2s cubic-bezier(0.5, 0, 0.5, 1) forwards',
				'text-3': 'animate-text-appear 8s 9.4s cubic-bezier(0.5, 0, 0.5, 1) forwards',
				'text-4': 'animate-text-appear 3s 17.6s cubic-bezier(0.5, 0, 0.5, 1) forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
