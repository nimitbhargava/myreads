import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function BooksGrid(props) {
    return (
        <ol className="books-grid">
            {props.books.length > 0 && (
                props.books.map((book, index) => (
                    <Book book={book} key={index} changeBookShelf={props.changeBookShelf}/>
                ))
            )}
        </ol>
    )
}

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}
export default BooksGrid