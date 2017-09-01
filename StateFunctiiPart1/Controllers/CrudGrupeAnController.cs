using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;
using StateFunctii.Models;

namespace StateFunctii.Controllers
{
    public class CrudGrupeAnController : ApiController
    {
        //Afisare grupe
        [HttpGet]
        public List<Models.Grupa> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select a.id, a.cod_pi,a.nr_grupe, a.nr_subgr , b.An,c.Facultate from Grupe a inner join An b on a.an=b.id inner join Facultate c on a.Facultate=c.id where a.Facultate='"+id+"'";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<Grupa>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new Grupa
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    cod_pi = reader["cod_pi"].ToString(),
                    An = reader["An"].ToString(),
                    nr_grupe = Int32.Parse((reader["nr_grupe"]).ToString()),
                    nr_subgr = Int32.Parse((reader["nr_subgr"]).ToString()),
                    Facultate = reader["Facultate"].ToString(),
                });
            }
            conn.Close();
            return list;
        }

        //Stergere grupa
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
        
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "delete from Grupe where id= '" + id + "'";
            var com = new SqlCommand(query1, conn);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, "Sters");
        }


        //Inserare grupa
        [HttpPost]
        public HttpResponseMessage Insert([FromBody]Grupa1 grupa)
        {
            try
            {
             SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "insert into Grupe(cod_pi,an,nr_grupe,nr_subgr,Facultate) values (@pi,@an,@gr,@subgr,@fac) ";
            var com = new SqlCommand(query, conn);
            com.Parameters.AddWithValue("@pi", grupa.cod_pi);
            com.Parameters.AddWithValue("@an", grupa.An);
            com.Parameters.AddWithValue("@gr", grupa.nr_grupe);
            com.Parameters.AddWithValue("@subgr", grupa.nr_subgr);
            com.Parameters.AddWithValue("@fac", grupa.Facultate);
            com.ExecuteNonQuery();
            conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK,grupa);
            }
            catch (SqlException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpPut]
        public HttpResponseMessage Update(int id, [FromBody]Grupa1 grupa)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query = "update Grupe set cod_pi=@cod, an=@an, nr_grupe=@nr_grupe,nr_subgr=@nr_subgr where id='" + id + "'";
                //string query = "update CadreDidactice set nume=@nume, prenume=@prenume, Departament=@dep, Pozitia=@poz , Titlu=@tit, Titular=@titular where id='" + id + "'";
                var com = new SqlCommand(query, conn);
                Grupa1 grupa1 = ObtineGrupa(id);
                if (grupa1.cod_pi == grupa.cod_pi && grupa1.An == grupa.An && grupa1.nr_grupe == grupa.nr_grupe && grupa1.nr_subgr == grupa.nr_subgr)
                //if (object.Equals(cadru1,cadru))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Nu sunt campuri de actualizat");
                }
                else
                {
                    com.Parameters.AddWithValue("@cod", grupa.cod_pi);
                    com.Parameters.AddWithValue("@an", grupa.An);
                    com.Parameters.AddWithValue("@nr_grupe", grupa.nr_grupe);
                    com.Parameters.AddWithValue("@nr_subgr", grupa.nr_subgr);
                    com.ExecuteNonQuery();
                    conn.Close();
                    return Request.CreateResponse(HttpStatusCode.OK, grupa);
                }
            }catch(SqlException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public Grupa1 ObtineGrupa(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "select * from Grupe where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            SqlDataReader reader = com.ExecuteReader();
            Grupa1 grupa = null;
            while (reader.Read())
            {
                grupa = new Grupa1
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    cod_pi = reader["cod_pi"].ToString(),
                    An = Int32.Parse((reader["an"]).ToString()),
                    nr_grupe = Int32.Parse((reader["nr_grupe"]).ToString()),
                    nr_subgr = Int32.Parse((reader["nr_subgr"]).ToString()),
                    Facultate = Int32.Parse((reader["Facultate"]).ToString()),
                };
            }
            conn.Close();
            return grupa;
        }

    }
}
