'use client'

import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
  clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
  site: 'us5.datadoghq.com',
  service: process.env.NEXT_PUBLIC_DATADOG_SERVICE_NAME,
  env: process.env.NEXT_PUBLIC_DATADOG_ENV_NAME,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  version: '1.0.0',
  defaultPrivacyLevel: 'mask-user-input',
  // Specify URLs to propagate trace headers for connection between RUM and backend trace
  allowedTracingUrls: [{ match: 'https://glefix.dev/api/', propagatorTypes: ['tracecontext'] }],
})

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null
}
