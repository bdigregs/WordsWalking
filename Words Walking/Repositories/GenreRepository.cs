
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Words_Walking.Models;
using Words_Walking.Utils;

namespace Words_Walking.Repositories
{
    public class GenreRepository : BaseRepository, IGenreRepository
    {
        public GenreRepository(IConfiguration configuration) : base(configuration) { }

        public List<Genre> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, [name]
                        FROM Genre";

                    var reader = cmd.ExecuteReader();

                    var genres = new List<Genre>();
                    
                    while (reader.Read())
                    {
                        genres.Add(new Genre()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            name = DbUtils.GetString(reader, "name")
                        });
                    }
                    reader.Close();
                    return genres;
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Genre WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
