import { Http } from "./Http.js"

export function Graphql(props = {}) {
  return function({ url, query, variables, options = {}, ...httpProps } = {}) {
    return Http({
      ...props,
      ...httpProps,
      url: url || props.url,
      options: {
        method: "POST",
        body: JSON.stringify(variables ? { query, variables } : { query }),
        ...(props.options || {}),
        ...options,
        headers: {
          "content-type": "application/json",
          ...((props.options || {}).headers || {}),
          ...(options.headers || {})
        }
      }
    })
  }
}
