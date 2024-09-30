import * as Sentry from '@sentry/react'

export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN

export const defaultSentrySettings = {
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost'],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
}

function startTrackingErrors() {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.replayIntegration(),
    ],
    ...defaultSentrySettings,
  })
}

function attachUserEmailToErrors(email: string, customerId: string) {
  const scope = Sentry.getCurrentScope()
  scope.setUser({ email, customerId })
}

export { startTrackingErrors, attachUserEmailToErrors }
