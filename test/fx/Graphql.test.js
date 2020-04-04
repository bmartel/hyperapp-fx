import { runFx } from "../utils"
import { Graphql } from "../../src"

describe("Graphql effect", () => {
  const testUrl = "https://example.com/graphql"
  const gql = Graphql({ url: testUrl })

  it("should execute query", done => {
    const query = `
      query example {
        id
      }
    `;
    global.fetch = (url, options) => {
      expect(url).toBe(testUrl)
      expect(options).toEqual({
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
          "content-type": "application/json"
        }
      })
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ response: { id: "1" } })
      })
    }

    const action = jest.fn()
    const httpFx = gql({ query, action });
    const { dispatch } = runFx(httpFx)

    process.nextTick(() => {
      expect(dispatch).toBeCalledWith(action, { response: { id: "1" }})
      delete global.fetch
      done()
    })
  })

  it("should execute query with variables", done => {
    const query = `
      query exampleById($id: String!) {
        example(id: $id) {
          id
        }
      }
    `;
    const variables = {
      id: 1
    }
    global.fetch = (url, options) => {
      expect(url).toBe(testUrl)
      expect(options).toEqual({
        method: "POST",
        body: JSON.stringify({ query, variables }),
        headers: {
          "content-type": "application/json"
        }
      })
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ response: { id: "1" } })
      })
    }

    const action = jest.fn()
    const httpFx = gql({ query, variables, action });
    const { dispatch } = runFx(httpFx)

    process.nextTick(() => {
      expect(dispatch).toBeCalledWith(action, { response: { id: "1" }})
      delete global.fetch
      done()
    })
  })
})