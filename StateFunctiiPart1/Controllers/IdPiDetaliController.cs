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
    public class IdPiDetaliController : ApiController
    {
        [HttpGet]
        public List<int> Get()
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select PIDetail from PIAlocare group by PiDetail";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<int>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                var PiDetail= Int32.Parse(reader["PiDetail"].ToString());
                list.Add(PiDetail);
            }
            conn.Close();
            return list;
        }
       
    }
}
