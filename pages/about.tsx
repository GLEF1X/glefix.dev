import { MDXLayoutRenderer } from '~/components/MDXComponents'
import { getFileBySlug } from '~/libs/mdx.server'
import type { MdxFileData } from '~/types/mdx'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js'

export async function getStaticProps({ locale }: { params: { slug: string[] }; locale: string }) {
  let authorData = await getFileBySlug(locale, 'authors', 'default')
  return {
    props: { authorData, ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) },
  }
}

export default function About({ authorData }: { authorData: MdxFileData }) {
  let { mdxSource, frontMatter } = authorData

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
