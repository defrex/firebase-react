import { useMetaTag, useTitle } from 'ui/components/HeadProvider'

export * from './JSON-LD'

export function useKeywords(keywords: string[]) {
  return useMetaTag({ name: 'keywords', content: keywords.join(',') })
}

export function useDescription(desc: string) {
  return useMetaTag({ name: 'description', content: desc })
}

export function useNoIndex(index: boolean) {
  useMetaTag({ name: 'robots', content: index ? 'index,follow' : 'noindex,nofollow' })
  useMetaTag({ name: 'googlebot', content: index ? 'index,follow' : 'noindex,nofollow' })
}

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  noindex?: boolean
}

export function useSEO(props: SEOProps) {
  if (props.title) useTitle(props.title)
  if (props.description) useDescription(props.description)
  if (props.keywords) useKeywords(props.keywords)
  if (typeof props.noindex !== 'undefined') useNoIndex(props.noindex)
}
