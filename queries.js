// Creating db
use plp_bookstore

// Creating collection
db.createCollection("books")

//Adding books
db.books.insertMany([
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy",
    published_year: 2020,
    price: 15.99,
    in_stock: true,
    pages: 304,
    publisher: "Canongate Books"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    published_year: 2021,
    price: 18.50,
    in_stock: true,
    pages: 496,
    publisher: "Ballantine Books"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    published_year: 2018,
    price: 12.00,
    in_stock: false,
    pages: 320,
    publisher: "Avery"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    published_year: 1965,
    price: 14.75,
    in_stock: true,
    pages: 412,
    publisher: "Chilton Books"
  },
  {
    title: "The Henna Artist",
    author: " Alka Joshi",
    genre: "Historical Fiction",
    published_year: 2020,
    price: 16.25,
    in_stock: true,
    pages: 368,
    publisher: "Mira Books"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "History",
    published_year: 2014,
    price: 20.00,
    in_stock: true,
    pages: 443,
    publisher: "Harper"
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    genre: "Mythology",
    published_year: 2018,
    price: 17.50,
    in_stock: true,
    pages: 393,
    publisher: "Little, Brown and Company"
  },
  {
    title: "The Vanishing Half",
    author: "Brit Bennett",
    genre: "Fiction",
    published_year: 2020,
    price: 15.00,
    in_stock: false,
    pages: 352,
    publisher: "Riverhead Books"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    published_year: 2018,
    price: 13.99,
    in_stock: true,
    pages: 334,
    publisher: "Random House"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 208,
    publisher: "HarperCollins"
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Mystery",
    published_year: 2018,
    price: 16.99,
    in_stock: true,
    pages: 384,
    publisher: "G.P. Putnam's Sons"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    published_year: 2019,
    price: 14.00,
    in_stock: false,
    pages: 336,
    publisher: "Celadon Books"
  },
  {
    title: "Pachinko",
    author: "Min Jin Lee",
    genre: "Historical Fiction",
    published_year: 2017,
    price: 17.00,
    in_stock: true,
    pages: 490,
    publisher: "Grand Central Publishing"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Memoir",
    published_year: 2018,
    price: 21.50,
    in_stock: true,
    pages: 426,
    publisher: "Crown"
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    published_year: 2005,
    price: 11.50,
    in_stock: true,
    pages: 552,
    publisher: "Alfred A. Knopf"
  }
])

//Find book by genre
db.books.find({genre:"Mystery"})

//Find books published after a certain year
db.books.find({published_year: {$gt: 2010}})

//Find books by a specific author
db.books.find({author: "Matt Haig"})

//Update the price of a specific book
db.books.updateOne(
  { title: "The Midnight Library" }, // Filter to find the book
  { $set: { price: 14.50 } }        // Update the price field
)

//Verify update
db.books.find({ title: "The Midnight Library" })

//Delete a book by its title
db.books.deleteOne({ title: "The Midnight Library" })

//Verify deletion
db.books.find({ title: "The Midnight Library" })


//find books that are both in stock and published after 2010
db.books.find({$and:[{in_stock:true},{published_year:{$gt:2010}}]})

//Use projection to return only the title, author, and price fields in your queries
db.books.find({$and:[{in_stock:true},{published_year:{$gt:2010}}]},{_id:false,title:1,author:1,price:1})

//Implement sorting to display books by price (both ascending and descending)
//Ascending order
db.books.find({},{_id:false,title:1,author:1,price:1}).sort({price:1})

//descending order
db.books.find({},{_id:false,title:1,author:1,price:1}).sort({price:-1})

//Use the `limit` and `skip` methods to implement pagination (5 books per page)
//Page 1
db.books.find({},{_id:false,title:1,author:1,price:1}).sort({price:1}).limit(5).skip(0)

//Page 2
db.books.find({},{_id:false,title:1,author:1,price:1}).sort({price:1}).limit(5).skip(5)

//page 3
db.books.find({},{_id:false,title:1,author:1,price:1}).sort({price:1}).limit(5).skip(10)