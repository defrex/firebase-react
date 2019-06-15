import { useMetaTag } from '../HeadProvider'

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
