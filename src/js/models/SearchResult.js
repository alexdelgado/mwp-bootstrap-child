class SearchResult {

  id
  title
  excerpt
  postType
  url

  constructor(data) {
    this.id = data.id
    this.title = data.title.rendered ? data.title.rendered : data.title
    this.excerpt = data.excerpt.rendered ? data.excerpt.rendered : data.excerpt
    this.postType = data.type
    this.url = data.link
  }
}

export default SearchResult
