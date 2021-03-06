import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import BooksGrid from './BooksGrid'

class BookSearch extends React.Component {

    state = {
        searchResults: []
    }

    /*
      @description search the BooksAPI and update
      the state with the results.
      @param {string} query - the term to search for
    */
    search = (query) => {
        query = query.trim()
        if (query.length === 0) {
            this.setState({searchResults: []})
            return
        }
        BooksAPI.search(query).then((response) => {
            if (Array.isArray(response)) {
                response = response.map(function (book) {
                    book.shelf = 'none'
                    return book
                })
                response = response.map(book => {
                    return Object.assign({}, book, this.props.books.find(shelfData => shelfData.id === book.id))
                })
                this.setState({searchResults: response})
                return
            }
            this.setState({searchResults: []})
        })
    }

    render() {
        /* Object destructuring for cleaner code */
        const {searchResults} = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => {
                                this.search(event.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={searchResults} changeBookShelf={this.props.changeBookShelf}/>
                </div>
            </div>
        )
    }
}

export default BookSearch