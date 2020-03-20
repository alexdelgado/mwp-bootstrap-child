import SearchResult from '../models/SearchResult'

export function transformSuggestions(results) {
  const searchResults = []
  const suggestions = []

  results.forEach((result) => {
    let post = new SearchResult(result)

    if (!searchResults[post.postType]) {
      searchResults[post.postType] = []
    }

    searchResults[post.postType].push(post)
  })

  Object.keys(searchResults).forEach((i) => {
    suggestions.push({
      title: i,
      results: searchResults[i]
    })
  })

  return suggestions
}
