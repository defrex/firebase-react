import { useMetaTag } from 'ui/components/HeadProvider'

export * from './JSON-LD';

export function useKeywords(keywords: string[]) {
  return useMetaTag({ name: 'keywords', content: keywords.join(',') })
}

export function useDescription(desc: string) {
  return useMetaTag({ name: 'description', content: desc })
}