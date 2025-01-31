import { appWithTranslation } from 'next-i18next'

import 'css/tailwind.css'
import 'css/twemoji.css'
import 'css/resume.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { Analytics } from '~/components/analytics'
import { LayoutWrapper } from '~/components/LayoutWrapper'
import nextI18NextConfig from '../next-i18next.config.js'
import DatadogInit from '~/components/analytics/DatadogInit.jsx'

function App({ Component, pageProps }) {
  return (
    // @ts-ignore
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
