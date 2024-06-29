import { siteMetadata } from '~/data/siteMetadata'
import { GAScript } from './GoogleAnalytics'
import { SimpleAnalyticsScript } from './SimpleAnalytics'
import { UmamiScript } from './Umami'
import DatadogInit from '~/components/analytics/DatadogInit'

let isProduction = process.env.NODE_ENV === 'production'

export function Analytics() {
  if (isProduction) {
    let { analytics } = siteMetadata
    let { simpleAnalytics, umamiWebsiteId, googleAnalyticsId } = analytics
    return (
      <>
        {simpleAnalytics && <SimpleAnalyticsScript />}
        {umamiWebsiteId && <UmamiScript />}
        {googleAnalyticsId && <GAScript />}
        <DatadogInit />
      </>
    )
  }
  return null
}
