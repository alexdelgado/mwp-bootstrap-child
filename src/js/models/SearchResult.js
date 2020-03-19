class SearchResult {

  id
  title
  excerpt
  postType
  url

  constructor(data) {
    this.id = data.id
    this.title = data.title.rendered
    this.excerpt = data.excerpt.rendered
    this.postType = data.type
    this.url = data.link
  }
}

export default SearchResult
