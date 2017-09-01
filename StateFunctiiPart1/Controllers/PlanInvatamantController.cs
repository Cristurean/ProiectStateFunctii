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
    public class PlanInvatamantController : ApiController
    {
        [HttpGet]
        public List<PlanInvatamant> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select a.unitpos,a.cod,a.sectiune,a.unitform,a.secom,a.nume,a.Scurt,b.Facultate from PlanInv a inner join Facultate b on a.Facultate=b.id where a.Facultate='" + id + "'";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<PlanInvatamant>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new PlanInvatamant
                {
                    unitpos = reader["unitpos"].ToString(),
                    cod = reader["cod"].ToString(),
                    sectiune = reader["sectiune"].ToString(),
                    unitform = reader["unitform"].ToString(),
                    secom = reader["secom"].ToString(),
                    nume = reader["nume"].ToString(),
                    Facultate = reader["Facultate"].ToString(),
                    Scurt = reader["Scurt"].ToString(),
                });
            }
            conn.Close();
            return list;
        }

    }
}
