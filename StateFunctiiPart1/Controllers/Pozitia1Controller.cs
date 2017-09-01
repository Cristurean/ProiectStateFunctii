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
    public class Pozitia1Controller : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get([FromUri] string nume)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select id from Pozitia where PreScurt='" + nume + "'";
            SqlCommand com = new SqlCommand(query1, conn);
            int id = 0;
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
