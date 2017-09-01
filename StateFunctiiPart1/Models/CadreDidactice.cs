using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StateFunctii.Models
{
	public class CadreDidactice
	{
        public int id { get; set; }
        public string nume { get; set; }
        public string prenume { get; set; }
        public int Departament { get; set; }
        public int Pozitia { get; set; }
        public int Titlu { get; set; }
        public int Titular { get; set; } 
    }
}