class SearchResult {

  id
  title
  content
  url
  postType

  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.url = data.url
    this.postType = data.subtype
  }
}

export default SearchResult
