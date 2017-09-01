using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;

namespace StateFunctii.Controllers
{
    public class CodPiController : ApiController
    {
        [HttpGet]
        public List<String> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select distinct cod_pi from Grupe where Facultate='" + id + "' order by cod_pi "; 
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<String>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                var cod = reader["cod_pi"].ToString();
                list.Add(cod);
            }
            conn.Close();
            return list;
        }

        [HttpGet]
        public HttpResponseMessage Get([FromUri]String cod)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select id from Grupe where cod_pi='" + cod + "'";
            SqlCommand com = new SqlCommand(query1, conn);
            var id = 0;
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                id = Int32.Parse((reader["id"]).ToString());
            }
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, id);
        }
    }
}
