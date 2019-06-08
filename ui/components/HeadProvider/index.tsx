import React, { useContext, createContext, ReactNode, useState } from 'react'
import { globalHistory } from '@reach/router'

interface ScriptTagParams {
  type: 'script'
  id: string
  script: string
  texttype: string
}

interface TitleTagParams {
  type: 'title'
  id: string
  text: string
}

interface MetaTagParams {
  type: 'meta'
  id: string
  name: 'description' | 'keywords' | 'author' | 'viewport'
  content: string
}

type TagParams = ScriptTagParams | TitleTagParams | MetaTagParams

type NewTagParams = Omit<ScriptTagParams, 'id'> | Omit<TitleTagParams, 'id'> | Omit<MetaTagParams, 'id'>

export interface Head {
  tags: JSX.Element[]
  addTag: (params: TagParams) => void
}

const HeadContext = createContext<Head>({
  tags: [],
  addTag: () => {},
})

interface HeadProviderProps {
  children: ReactNode
  tags: JSX.Element[]
}

export function HeadProvider(props: HeadProviderProps) {
  let { children, tags } = props
  globalHistory.listen(() => {
    if (typeof window !== 'undefined') {
      const metaElements = Array.from(
        document.getElementsByTagName('head')[0].getElementsByTagName('meta'),
      )

      const titleElements = Array.from(
        document.getElementsByTagName('head')[0].getElementsByTagName('title'),
      )

      const scriptElements = Array.from(
        document.getElementsByTagName('head')[0].getElementsByTagName('script'),
      )

      metaElements.map((itm) => {
        if (itm.parentNode) itm.parentNode.removeChild(itm)
      })

      titleElements.map((itm) => {
        if (itm.parentNode) itm.parentNode.removeChild(itm)
      })

      scriptElements.map((itm) => {
        if (itm.parentNode) itm.parentNode.removeChild(itm)
      })
    }
  })
  return (
    <HeadContext.Provider
      value={{
        tags,
        addTag: ({ id, ...params}) => {
          if (params.type === 'title') {
            if (typeof window !== 'undefined') {
              const currentElement = document.querySelector(`[data-id="${id}"]`) as HTMLTitleElement || undefined
              if (currentElement) {
                currentElement.remove()
              }
              
              const elem = document.createElement('title')
              elem.innerText = params.text
              elem.dataset.id = id
              document.getElementsByTagName('head')[0].appendChild(elem)
            } else {
              tags.push(<title data-id={id}>{params.text}</title>)
            }
          } else if (params.type === 'meta') {
            if (typeof window !== 'undefined') {
              const currentElement = document.querySelector(`[data-id="${id}"]`) as HTMLMetaElement || undefined
              if (currentElement) {
                currentElement.name = params.name
                currentElement.content = params.content
                currentElement.dataset.id = id
                return;
              }
              
              const elem = document.createElement('meta')
              elem.name = params.name
              elem.content = params.content
              elem.dataset.id = id
              document.getElementsByTagName('head')[0].appendChild(elem)
            } else {
              tags.push(<meta data-id={id} {...params}/>)
            }
          } else if (params.type === 'script') {
            if (typeof window !== 'undefined') {
              const currentElement = document.querySelector(`[data-id="${id}"]`) as HTMLScriptElement || undefined
              if (currentElement) {
                currentElement.type = params.texttype
                currentElement.innerHTML = params.script
                currentElement.dataset.id = id
                return;
              }
              
              const elem = document.createElement('script')
              elem.type = params.texttype
              elem.innerHTML = params.script
              elem.dataset.id = id
              document.getElementsByTagName('head')[0].appendChild(elem)
            } else {
              tags.push(<script data-id={id} type={params.texttype} dangerouslySetInnerHTML={{ __html: params.script }}/>)
            }
          }
        },
      }}
    >
      {children}
    </HeadContext.Provider>
  )
}

let currentTagId = 0

export function addTag(params: NewTagParams) {
  const [id] = useState(currentTagId++)
  return useContext(HeadContext).addTag({ ...params, id: id.toString()  })
}

export function useTitle(title: string) {
  const [id] = useState(currentTagId++)
  return useContext(HeadContext).addTag({ type: 'title', text: title, id: id.toString() })
}

export function useMetaTag(params: Omit<MetaTagParams, 'type' | 'id'>) {
  const [id] = useState(currentTagId++)
  return useContext(HeadContext).addTag({ ...params, type: 'meta', id: id.toString()})
}
