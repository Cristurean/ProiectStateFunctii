using StateFunctii.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StateFunctii.Controllers
{
    public class PozitiaController : ApiController
    {
        [HttpGet]
        public List<String> Get()
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select PreScurt from Pozitia";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<String>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                var PreScurt = reader["PreScurt"].ToString();
                list.Add(PreScurt);
            }
            conn.Close();
            return list;
        }
        
    }
}
