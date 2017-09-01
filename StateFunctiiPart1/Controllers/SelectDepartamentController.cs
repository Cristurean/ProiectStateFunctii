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
    public class SelectDepartamentController : ApiController
    {
        [HttpGet]
        public List<String> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select b.Departament as dep from PiAlocare a inner join Departament b on a.Departament = b.id where a.Departament in (select id from Departament where Facultate ='" + id + "') group by b.Departament";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<String>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                var Departament = reader["dep"].ToString();
                list.Add(Departament);
            }
            conn.Close();
            return list;
        }
        [HttpGet]
        public HttpResponseMessage Get([FromUri] string departament)
        {
            
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query1 = "select id from Departament where Departament='" + departament + "'";
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
