

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Words_Walking.Models;
using Words_Walking.Utils;

namespace Words_Walking.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration config) : base(config) { }

        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT b.Id, b.genreId, b.buyerId, b.sellerId,
                                   b.title, b.author, b.synopsis, b.publisher,
                                   b.publishDate, b.firstEdition, b.price, b.imageUrl,
                                   g.Id AS genreId,  s.Id AS sellerId
                            FROM Book b
                       LEFT JOIN Genre g ON b.genreId = g.Id
                       LEFT JOIN [User] s ON b.sellerId = s.Id
                       ";

                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();

                    while (reader.Read())
                    {
                        books.Add(new Book()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            genreId = DbUtils.GetInt(reader, "genreId"),
                            buyerId = DbUtils.GetNullableInt(reader, "buyerId"),
                            sellerId = DbUtils.GetInt(reader, "sellerId"),
                            title = DbUtils.GetString(reader, "title"),
                            author = DbUtils.GetString(reader, "author"),
                            synopsis = DbUtils.GetString(reader, "synopsis"),
                            publisher = DbUtils.GetString(reader, "publisher"),
                            publishDate = DbUtils.GetDateTime(reader, "publishDate"),
                            firstEdition = reader.GetBoolean(reader.GetOrdinal("firstEdition")),
                            price = reader.GetDecimal(reader.GetOrdinal("price")),
                            imageUrl = DbUtils.GetString(reader, "imageUrl")
                        });

                    }
                    reader.Close();

                    return books;
                }
            }
        }

        public void AddBook(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              INSERT INTO Book (genreId, buyerId, sellerId, title, 
                                        author, synopsis, publisher, publishDate, firstEdition, 
                                        price, imageUrl)
                             OUTPUT INSERTED.ID
                                VALUES (@genreId, @buyerId, @sellerId, @title, @author, @synopsis, 
                                @publisher, @publishDate, @firstEdition, @price, @imageUrl)";

                    DbUtils.AddParameter(cmd, "@genreId", book.genreId);
                    DbUtils.AddParameter(cmd, "@buyerId", book.buyerId);
                    DbUtils.AddParameter(cmd, "@sellerId", book.sellerId);
                    DbUtils.AddParameter(cmd, "@title", book.title);
                    DbUtils.AddParameter(cmd, "@author", book.author);
                    DbUtils.AddParameter(cmd, "@synopsis", book.synopsis);
                    DbUtils.AddParameter(cmd, "@publisher", book.publisher);
                    DbUtils.AddParameter(cmd, "@publishDate", book.publishDate);
                    DbUtils.AddParameter(cmd, "@firstEdition", book.firstEdition);
                    DbUtils.AddParameter(cmd, "@price", book.price);
                    DbUtils.AddParameter(cmd, "@imageUrl", book.imageUrl);

                    book.Id = (int)cmd.ExecuteScalar();


                }
            }
        }

        public Book GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Book.title, Book.genreId, Book.sellerId, Book.title, Book.author,
                                        Book.synopsis, Book.publisher, Book.publishDate, Book.firstEdition, Book.price, Book.imageUrl
                                FROM Book
                           LEFT JOIN Genre ON Genre.Id = Book.genreId
                           LEFT JOIN [User] ON [User].Id = book.sellerId
               
                               WHERE Book.Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    var reader = cmd.ExecuteReader();

                    Book book = null;
                    while (reader.Read())
                    {
                        if (book == null)
                        {
                            book = new Book()
                            {

                                Id = id,
                                genreId = DbUtils.GetInt(reader, "genreId"),
                                //buyerId = DbUtils.GetNullableInt(reader, "buyerId"),
                                sellerId = DbUtils.GetInt(reader, "sellerId"),
                                title = DbUtils.GetString(reader, "title"),
                                author = DbUtils.GetString(reader, "author"),
                                synopsis = DbUtils.GetString(reader, "synopsis"),
                                publisher = DbUtils.GetString(reader, "publisher"),
                                publishDate = DbUtils.GetDateTime(reader, "publishDate"),
                                firstEdition = reader.GetBoolean(reader.GetOrdinal("firstEdition")),
                                price = reader.GetDecimal(reader.GetOrdinal("price")),
                                imageUrl = DbUtils.GetString(reader, "imageUrl")
                            };

                        }

                    }

                    reader.Close();

                    return book;

                }
            }
        }

        public void DeleteBook(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Book WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditBook(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Book
                            SET title = @title,
                                author = @author,
                                synopsis = @synopsis,
                                publisher = @publisher,
                                publishDate = @publishDate,
                                firstEdition = @firstEdition,
                                price = @price,
                                imageUrl = @imageUrl
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", book.Id);
                    DbUtils.AddParameter(cmd, "@title", book.title);
                    DbUtils.AddParameter(cmd, "@author", book.author);
                    DbUtils.AddParameter(cmd, "@synopsis", book.synopsis);
                    DbUtils.AddParameter(cmd, "@publisher", book.publisher);
                    DbUtils.AddParameter(cmd, "@publishDate", book.publishDate);
                    DbUtils.AddParameter(cmd, "@firstEdition", book.firstEdition);
                    DbUtils.AddParameter(cmd, "@price", book.price);
                    DbUtils.AddParameter(cmd, "@imageUrl", book.imageUrl);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
