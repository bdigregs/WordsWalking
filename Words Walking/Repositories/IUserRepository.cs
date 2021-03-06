using System.Collections.Generic;
using Words_Walking.Models;

namespace Words_Walking.Repositories
{
    public interface IUserRepository
    {
        User GetByEmail(string email);

        public void Add(User user);
    }
}
