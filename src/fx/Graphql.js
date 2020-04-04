import { Http } from "./Http.js"

export const Graphql = (props = {}) => ({
  url,
  query,
  variables,
  options = {},
  ...httpProps
} = {}) =>
  Http({
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
