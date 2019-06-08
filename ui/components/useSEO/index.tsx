import { addTag } from 'ui/components/HeadProvider'

export * from './JSON-LD';

export function useKeywords(keywords: string[]) {
  return addTag({ type: 'meta', name: 'keywords', content: keywords.join(',') })
}

export function useDescription(desc: string) {
  return addTag({ type: 'meta', name: 'description', content: desc })
}