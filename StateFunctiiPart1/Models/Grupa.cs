using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StateFunctii.Models
{
    public class Grupa
    {
        public int id { get; set; } 
        public string cod_pi { get; set; }
        public string An { get; set; }
        public int nr_grupe { get; set; }
        public int nr_subgr { get; set; }
        public string Facultate { get; set; }
    }
}