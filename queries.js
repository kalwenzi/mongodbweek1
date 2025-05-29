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


//Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre", // Group by genre
      averagePrice: { $avg: "$price" } // Calculate average price
    }
  }
])

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
    {
        $group: {
        _id: "$author", // Group by author
        bookCount: { $sum: 1 } // Count the number of books per author
        }
    },
    {
        $sort: { bookCount: -1 } // Sort by book count in descending order
    },
    {
        $limit: 1 // Limit to the top author
    }
])


//Adding more books to the collection for better aggregation results
db.books.insertMany([
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.50,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 9.99,
    in_stock: true,
    pages: 311,
    publisher: "Chatto & Windus"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 25.00,
    in_stock: true,
    pages: 1178,
    publisher: "George Allen & Unwin"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    published_year: 1960,
    price: 11.25,
    in_stock: true,
    pages: 281,
    publisher: "J. B. Lippincott & Co."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 8.75,
    in_stock: true,
    pages: 279,
    publisher: "T. Egerton, Whitehall"
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    published_year: 1979,
    price: 13.00,
    in_stock: true,
    pages: 193,
    publisher: "Pan Books"
  },
  {
    title: "Good Omens",
    author: "Terry Pratchett",
    genre: "Fantasy",
    published_year: 1990,
    price: 16.00,
    in_stock: true,
    pages: 491,
    publisher: "Victor Gollancz Ltd"
  },
  {
    title: "Neuromancer",
    author: "William Gibson",
    genre: "Cyberpunk",
    published_year: 1984,
    price: 12.50,
    in_stock: false,
    pages: 271,
    publisher: "Ace Books"
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    genre: "Science Fiction",
    published_year: 1951,
    price: 11.75,
    in_stock: true,
    pages: 255,
    publisher: "Gnome Press"
  },
  {
    title: "The Martian",
    author: "Andy Weir", // Existing author
    genre: "Science Fiction",
    published_year: 2011,
    price: 14.50,
    in_stock: true,
    pages: 369,
    publisher: "Crown Publishing Group"
  },
  {
    title: "Artemis",
    author: "Andy Weir", // Existing author, giving him more books
    genre: "Science Fiction",
    published_year: 2017,
    price: 13.75,
    in_stock: true,
    pages: 305,
    publisher: "Crown Publishing Group"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    published_year: 2003,
    price: 10.99,
    in_stock: true,
    pages: 454,
    publisher: "Doubleday"
  },
  {
    title: "Angels & Demons",
    author: "Dan Brown", // Another book by Dan Brown
    genre: "Thriller",
    published_year: 2000,
    price: 9.99,
    in_stock: true,
    pages: 736,
    publisher: "Pocket Books"
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Thriller",
    published_year: 2012,
    price: 13.50,
    in_stock: false,
    pages: 419,
    publisher: "Crown"
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    genre: "Crime",
    published_year: 2005,
    price: 12.00,
    in_stock: true,
    pages: 464,
    publisher: "Norstedts Förlag"
  },
  {
    title: "Educated (Paperback)",
    author: "Tara Westover", // Another book by Tara Westover
    genre: "Memoir",
    published_year: 2018,
    price: 10.99,
    in_stock: true,
    pages: 334,
    publisher: "Random House"
  }])

//Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $group: {
        _id: { $floor: { $divide: ["$published_year", 10] } }, // Group by decade
        bookCount: { $sum: 1 } // Count the number of books in each decade
        }
    },
    {
        $project: {
        decade: { $multiply: ["$_id", 10] }, // Convert decade back to a year
        bookCount: 1,
        _id: 0 // Exclude the default _id field
        }
    },
    {
        $sort: { decade: 1 } // Sort by decade in ascending order
    }
])

//Index by title
db.books.createIndex({ title: 1 })

//compound index by author and published year (latest year first)
db.books.createIndex({ author: 1, published_year: -1 })