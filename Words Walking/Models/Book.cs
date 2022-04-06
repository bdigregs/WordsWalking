using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Words_Walking.Models
{
    public class Book
    {
        public int Id { get; set; }

        public int genreId { get; set; }

        public int? buyerId { get; set; }

        public int sellerId { get; set; }


        [Required] 
        public string title { get; set; }

        public string author { get; set; }

        public string synopsis { get; set; }

        public string publisher { get; set; }

        public DateTime publishDate { get; set; }

        public bool firstEdition { get; set; }

        public decimal price { get; set; }

        public string imageUrl { get; set; }



    }
}
