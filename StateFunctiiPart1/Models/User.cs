using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StateFunctii.Models
{
    public class User
    {
        public int id { get; set; }
        [Required]
        public string Scurt { get; set; }
        public string Parola { get; set;}
    }
}