using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using System.Data.SqlClient;
using StateFunctii.Models;

namespace StateFunctii.Controllers
{
    public class CadreDidactice2Controller : ApiController
    {
        //Afisare cadre
        [HttpGet]
        public List<CadruDidactic> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            //string query1 = "select * from CadreDidactice where Departament='" + id + "'";
            string query1= " select a.id,a.nume,a.prenume,a.Titular,b.Departament,c.PreScurt,d.Nume from CadreDidactice a inner join Departament b  on a.Departament = b.id inner join Pozitia c on a.Pozitia = c.id inner join Titlu d on a.Titlu = d.id where a.Departament='" + id + "'";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<CadruDidactic>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new CadruDidactic
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    nume = reader["nume"].ToString(),
                    prenume = reader["prenume"].ToString(),
                    Departament = reader["Departament"].ToString(),
                    Pozitia = reader["PreScurt"].ToString(),
                    Titlu = reader["Nume"].ToString(),
                    Titular = Int32.Parse((reader["titular"]).ToString()),
                });
            }
            conn.Close();
            return list;
        }
        //Stergere cadru
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query1 = "delete from CadreDidactice where id= '" + id + "'";
                var com = new SqlCommand(query1, conn);
                com.ExecuteNonQuery();
                conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, "Sters");
            }catch(SqlException exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.OK, exception);
            }
        }


        //Modificare cadru
        [HttpPut]
        public HttpResponseMessage Update(int id, [FromBody]CadreDidactice cadru)
         {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query = "update CadreDidactice set nume=@nume, prenume=@prenume, Pozitia=@poz , Titlu=@tit where id='" + id + "'";
                var com = new SqlCommand(query, conn);
                CadreDidactice cadru1 = ObtineCadru(id);
                if (cadru1.nume == cadru.nume && cadru1.prenume == cadru.prenume && cadru1.Pozitia == cadru.Pozitia && cadru1.Titlu == cadru.Titlu)
                //if (object.Equals(cadru1,cadru))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Nu sunt campuri de actualizat");
                }
                else
                {
                    com.Parameters.AddWithValue("@nume", cadru.nume);
                    com.Parameters.AddWithValue("@prenume", cadru.prenume);
                    com.Parameters.AddWithValue("@poz", cadru.Pozitia);
                    com.Parameters.AddWithValue("@tit", cadru.Titlu);
                    com.ExecuteNonQuery();
                    conn.Close();
                    return Request.CreateResponse(HttpStatusCode.OK, cadru);
                }
            }
            catch(SqlException exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
         }

        public CadreDidactice ObtineCadru(int id)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query = "select * from CadreDidactice where id='" + id + "'";
            var com = new SqlCommand(query, conn);
            SqlDataReader reader = com.ExecuteReader();
            CadreDidactice cadru = null;
            while (reader.Read())
            {
                cadru = new CadreDidactice
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    nume = reader["nume"].ToString(),
                    prenume = reader["prenume"].ToString(),
                    Departament = Int32.Parse((reader["Departament"]).ToString()),
                    Pozitia = Int32.Parse((reader["Pozitia"]).ToString()),
                    Titlu = Int32.Parse((reader["Titlu"]).ToString()),
                    Titular = Int32.Parse((reader["titular"]).ToString())
                };

            }
            conn.Close();
            return cadru;
        }

        //Adaugare cadru
        [HttpPost]
        public HttpResponseMessage Insert([FromBody]CadreDidactice cadru)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query = "insert into CadreDidactice(nume,prenume,Departament,Pozitia,Titlu,Titular) values (@nume,@prenume,@dep,@poz,@tit,@titular)";
                var com = new SqlCommand(query, conn);
                com.Parameters.AddWithValue("@nume", cadru.nume);
                com.Parameters.AddWithValue("@prenume", cadru.prenume);
                com.Parameters.AddWithValue("@dep", cadru.Departament);
                com.Parameters.AddWithValue("@poz", cadru.Pozitia);
                com.Parameters.AddWithValue("@tit", cadru.Titlu);
                com.Parameters.AddWithValue("@titular", cadru.Titular);

                com.ExecuteNonQuery();
                conn.Close();
            }
           catch(SqlException exception)
            { 
             
                   return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exception);
            }
             

            return Request.CreateResponse(HttpStatusCode.OK, cadru);


        }
        }
    }
