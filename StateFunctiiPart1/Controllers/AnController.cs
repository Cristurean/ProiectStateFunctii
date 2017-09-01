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
    public class AnController : ApiController
    {
        [HttpGet]
        public List<String> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select distinct a.an as anul from An a inner join Grupe b on a.id=b.an where b.Facultate = '"+ id +"' order by a.an";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<String>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                var an = reader["anul"].ToString();
                list.Add(an);
            }
            conn.Close();
            return list;
        }

        [HttpGet]
        public HttpResponseMessage Get([FromUri]String an)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select id from An where An='" + an + "'";
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
