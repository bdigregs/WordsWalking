using System.Collections.Generic;
using Words_Walking.Models;

namespace Words_Walking.Repositories
{
    public interface IGenreRepository
    {
        List<Genre> GetAll();
        public void Delete(int id);
    }
}
