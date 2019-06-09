import React, { useContext, createContext, ReactNode } from 'react'
import ReactDOM from 'react-dom/server'
import sha256 from 'hash-it'
import { globalHistory } from '@reach/router'

interface ScriptTagParams {
  type: 'script'
  script: string
  texttype: string
}

interface TitleTagParams {
  type: 'title'
  text: string
}

interface MetaTagParams {
  type: 'meta'
  name: 'description' | 'keywords' | 'author' | 'viewport' | 'robots' | 'googlebot'
  content: string
}

type TagParams = ScriptTagParams | TitleTagParams | MetaTagParams

type NewTagParams =
  | Omit<ScriptTagParams, 'id'>
  | Omit<TitleTagParams, 'id'>
  | Omit<MetaTagParams, 'id'>

export interface Head {
  tags: React.ReactElement[]
  addTag: (params: TagParams) => void
  hashes: string[]
}

const HeadContext = createContext<Head>({
  tags: [],
  addTag: () => {},
  hashes: [],
})

interface HeadProviderProps {
  children: ReactNode
  tags: React.ReactElement[]
  hashes: string[]
}

interface ClearHeadParams {
  ids: string[]
}

export const clearHead = (ids: string[]) =>
  ids.map((id) => {
    const currentElement = document.querySelector<HTMLTitleElement>(`[data-id="${id}"]`)
    if (currentElement) currentElement.remove()
  })

export function HeadProvider(props: HeadProviderProps) {
  let { children, tags, hashes } = props
  globalHistory.listen(() => clearHead(hashes))
  return (
    <HeadContext.Provider
      value={{
        tags,
        hashes,
        addTag: ({ ...params }) => {
          if (params.type === 'title') {
            const elem = <title>{params.text}</title>
            const id = sha256(JSON.stringify(elem.props))
            const element = <title data-id={id}>{params.text}</title>
            hashes.push(id)
            if (typeof window !== 'undefined') {
              const currentElement = document.querySelector<HTMLTitleElement>(`[data-id="${id}"]`)
              if (currentElement) return

              document.head.insertAdjacentHTML('beforeend', ReactDOM.renderToString(element))
            } else {
              if (tags.find((itm) => itm.props['data-id'] === id)) return
              tags.push(element)
            }
          } else if (params.type === 'meta') {
            const elem = <meta name={params.name} content={params.content} />
            let id = sha256(JSON.stringify(elem.props))
            const element = <meta data-id={id} name={params.name} content={params.content} />
            hashes.push(id)
            if (typeof window !== 'undefined') {
              const currentElement = document.querySelector<HTMLMetaElement>(`[data-id="${id}"]`)
              if (currentElement) return

              document.head.insertAdjacentHTML('beforeend', ReactDOM.renderToString(element))
            } else {
              if (tags.find((itm) => itm.props['data-id'] === id)) return
              tags.push(element)
            }
          } else if (params.type === 'script') {
            const elem = (
              <script type={params.texttype} dangerouslySetInnerHTML={{ __html: params.script }} />
            )
            let id = sha256(JSON.stringify(elem.props))
            const element = (
              <script
                data-id={id}
                type={params.texttype}
                dangerouslySetInnerHTML={{ __html: params.script }}
              />
            )
            hashes.push(id)
            if (typeof window !== 'undefined') {
              const currentElement = document.querySelector<HTMLScriptElement>(`[data-id="${id}"]`)
              if (currentElement) return

              document.head.insertAdjacentHTML('beforeend', ReactDOM.renderToString(element))
            } else {
              if (tags.find((itm) => itm.props['data-id'] === id)) return
              tags.push(element)
            }
          }
        },
      }}
    >
      {children}
    </HeadContext.Provider>
  )
}

export function addTag(params: NewTagParams) {
  return useContext(HeadContext).addTag({ ...params })
}

export function useTitle(title: string) {
  return useContext(HeadContext).addTag({ type: 'title', text: title })
}

export function useMetaTag(params: Omit<MetaTagParams, 'type' | 'id'>) {
  return useContext(HeadContext).addTag({ ...params, type: 'meta' })
}
