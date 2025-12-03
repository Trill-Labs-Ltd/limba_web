export const APP_NAME = 'Limba'

export const ROUTES = {
  home: '/',
} as const

export const SOCIAL_PROOF_COUNT = '500+'

export const TAILWIND_CLASSES = {
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  button: {
    base: 'font-medium rounded-full transition-all duration-200',
    primary:
      'bg-teal-500 hover:bg-teal-600 text-white hover:scale-105 shadow-md hover:shadow-lg',
    secondary:
      'border-2 border-teal-500 text-teal-600 hover:bg-teal-50 hover:scale-105',
    sizes: {
      sm: 'px-6 py-2.5',
      md: 'px-8 py-3.5',
      lg: 'px-10 py-4',
    },
  },
  section: {
    base: 'w-full',
    padding: 'py-16 lg:py-24',
  },
} as const

