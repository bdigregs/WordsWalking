using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Words_Walking.Models;
using Words_Walking.Utils;

namespace Words_Walking.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration config) : base(config) { }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT id, email, username, password, firstName, lastName, address
                              FROM [User]
                            WHERE email = @email";

                    cmd.Parameters.AddWithValue("@email", email);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if(reader.Read())
                    {
                        user = new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            email = DbUtils.GetString(reader, "email"),
                            username = DbUtils.GetString(reader, "username"),
                            password = DbUtils.GetString(reader, "password"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            address = DbUtils.GetString(reader, "address")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
                {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO [User] (email, username, password, 
                                               firstName, lastName, address)
                            OUTPUT INSERTED.ID
                                VALUES (@email, @username, @password, @firstName, @lastName, @address)";

                    DbUtils.AddParameter(cmd, "@email", user.email);
                    DbUtils.AddParameter(cmd, "@username", user.username);
                    DbUtils.AddParameter(cmd,"@password", user.password);
                    DbUtils.AddParameter(cmd, "@firstName", user.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", user.lastName);
                    DbUtils.AddParameter(cmd, "@address", user.address);

                    user.id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
