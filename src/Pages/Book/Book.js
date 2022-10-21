 const Book = () => {
   return ( <div>
        <h1>Hello there!</h1>
        <h1>I am a book page.</h1>
        <button onPointerDown={()=> {window.location.replace("./Game")}}> return to game </button>
    </div>
   )
}

export default Book;