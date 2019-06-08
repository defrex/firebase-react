import React, { useContext, createContext, ReactNode } from 'react'
import { globalHistory } from '@reach/router'

interface NewScriptTagParams {
  type: 'script'
  script: string
  texttype: string
}

interface NewTitleTagParams {
  type: 'title'
  text: string
}

interface NewMetaTagParams {
  type: 'meta'
  name: 'description' | 'keywords' | 'author' | 'viewport'
  content: string
}

type NewTagParams = NewScriptTagParams | NewTitleTagParams | NewMetaTagParams

export interface Head {
  tags: JSX.Element[]
  addTag: (params: NewTagParams) => void
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

      const scriptElements = Array.from(
        document.getElementsByTagName('head')[0].getElementsByTagName('script'),
      )

      metaElements.map((itm) => {
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
        addTag: (params) => {
          if (params.type === 'title') {
            const current = tags.find((tag) => tag.type === 'title')
            if (!current) tags.push(<title>{params.text}</title>)
            else tags[tags.indexOf(current)] = <title>{params.text}</title>
            if (
              typeof window !== 'undefined' &&
              document.getElementsByTagName('title')[0].text !== params.text
            )
              document.getElementsByTagName('title')[0].text = params.text
          } else if (params.type === 'script') {
            const current = tags.find(
              (tag) => tag.type === 'script' && tag.type === params.texttype,
            )
            if (!current)
              tags.push(
                <script
                  type={params.texttype}
                  dangerouslySetInnerHTML={{ __html: params.script }}
                />,
              )

            if (typeof window !== 'undefined') {
              const elements = Array.from(
                document.getElementsByTagName('head')[0].getElementsByTagName('script'),
              )

              const current2 = elements.find((itm) => itm.type === params.texttype)
              if (current2) return
              const elem = document.createElement('script')
              elem.type = params.texttype
              elem.innerHTML = params.script
              document.getElementsByTagName('head')[0].appendChild(elem)
            }
          } else if (params.type === 'meta') {
            const current = tags.find(
              (tag) => tag.type === 'meta' && tag.props.type === params.type,
            )
            if (!current) tags.push(<meta {...params} />)
            if (typeof window !== 'undefined') {
              const elements = Array.from(
                document.getElementsByTagName('head')[0].getElementsByTagName('meta'),
              )
              const current2 = elements.find((itm) => itm.name === params.name)
              if (current2 && current2.content === params.content) return
              else if (current2 && current2.content !== params.content) {
                current2.content = params.content
                return
              }
              const elem = document.createElement('meta')
              elem.name = params.name
              elem.content = params.content
              document.getElementsByTagName('head')[0].appendChild(elem)
            }
          }
        },
      }}
    >
      {children}
    </HeadContext.Provider>
  )
}

interface AddTagProps {
  tag: JSX.Element
}

export function AddTag(params: NewTagParams) {
  return useContext(HeadContext).addTag(params)
}

export function useTitle(title: string) {
  return useContext(HeadContext).addTag({ type: 'title', text: title })
}

export function useMetaTag(params: Omit<NewMetaTagParams, 'type'>) {
  return useContext(HeadContext).addTag({ type: 'meta', ...params })
}
