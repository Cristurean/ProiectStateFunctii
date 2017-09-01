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
    public class PIAlocareController : ApiController
    {
        [HttpGet]
        public List<Alocare> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select a.id,b.id as piDetalii,c.Departament from PIAlocare a inner join PiDetali b on a.PIDetail = b.id inner join  Departament c on a.Departament = c.id where a.Departament in (select id from Departament where Facultate ='"+id+"') ";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<Alocare>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new Alocare
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    piDetail = Int32.Parse((reader["piDetalii"]).ToString()),
                    departament = reader["Departament"].ToString()
                });
            }
            conn.Close();
            return list;
        }
        //Adauga alocare
        [HttpPost]
        public HttpResponseMessage Insert([FromBody]Alocare1 alocare)
        {
            try { 
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "insert into PIAlocare(PIDetail,Departament) values (@pid,@dep)";
            var com = new SqlCommand(query, conn);
            com.Parameters.AddWithValue("@pid", alocare.PiDetail);
            com.Parameters.AddWithValue("@dep", alocare.Departament);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, alocare);
            }catch(SqlException exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
        }


        //Stergere alocare
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "delete from PIAlocare where id= '" + id + "'";
            var com = new SqlCommand(query1, conn);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, "Sters");
            }
            catch (SqlException exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
        }

        //Modificare alocare
        [HttpPut]
        public HttpResponseMessage Update(int id, [FromBody]Alocare1 alocare)
        {
            try {
         SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "update PIAlocare set PIDetail=@pid, Departament=@dep where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            Alocare1 alocare1 = ObtineAlocare(id);
            if (alocare1.PiDetail == alocare.PiDetail && alocare1.Departament == alocare.Departament)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Nu sunt campuri de actualizat");
            }
            else
            {
                com.Parameters.AddWithValue("@pid", alocare.PiDetail);
                com.Parameters.AddWithValue("@dep", alocare.Departament);

                com.ExecuteNonQuery();
                conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, alocare);
            }
            }catch(SqlException exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
        }

        public Alocare1 ObtineAlocare(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "select * from PIAlocare where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            SqlDataReader reader = com.ExecuteReader();
            Alocare1 alocare = null;
            while (reader.Read())
            {
                alocare = new Alocare1
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    PiDetail = Int32.Parse((reader["PIDetail"]).ToString()),
                    Departament = Int32.Parse((reader["Departament"]).ToString()),
                };

            }
            conn.Close();
            return alocare;
        }
    }
}
