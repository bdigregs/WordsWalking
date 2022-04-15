using System.Collections.Generic;
using Words_Walking.Models;

namespace Words_Walking.Repositories
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();

        public void AddBook(Book book);

        public void DeleteBook(int id);

        public void EditBook(Book book);

        public void SellBook(int id, int userId);

        Book GetById(int id);
    }
}
