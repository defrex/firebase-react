import { AddTag } from 'ui/components/HeadProvider'

export * from './JSON-LD';

export function useKeywords(keywords: string[]) {
  return AddTag({ type: 'meta', name: 'keywords', content: keywords.join(',') })
}

export function useDescription(desc: string) {
  return AddTag({ type: 'meta', name: 'description', content: desc })
}