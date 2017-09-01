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
    public class DetaliiPlanInvController : ApiController
    {
        //Afisare setalii planuri invatamant
        [HttpGet]
        public List<PIDetalii> Get(int id)
        {

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            conn.Open();
            string query1 = "select a.id, a.formainv, a.an, a.semestru, a.tipdiscip, a.limbapred, a.formapred, a.numarore, a.tipunitst, a.ordine, a.catedra, a.TipDiscipina, a.CSLP, a.FormaStudiu, b.cod, c.cod AS CodDis, d.Nume, e.Nume AS Limba from PIDetali a inner join PlanInv b on a.cod= b.cod inner join PIDisciplina c on a.cod_disc = c.cod inner join CicluStudii d on a.CicluStudii = d.id inner join LimbaPredare e on a.LimbaPredare = e.id where a.cod in (Select b.cod from PlanInv where b.Facultate ='" + id + "')";
            SqlCommand com = new SqlCommand(query1, conn);
            var list = new List<PIDetalii>();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new PIDetalii
                {
                    id = Int32.Parse((reader["id"]).ToString()),
                    cod = reader["cod"].ToString(),
                    formainv = reader["formainv"].ToString(),
                    an = Int32.Parse((reader["an"]).ToString()),
                    semestru = Int32.Parse((reader["semestru"]).ToString()),
                    tipdiscip = reader["tipdiscip"].ToString(),
                    cod_disc = reader["CodDis"].ToString(),
                    limbapred = reader["limbapred"].ToString(),
                    formapred = reader["formapred"].ToString(),
                    numarore = Int32.Parse((reader["numarore"]).ToString()),
                    tipunitst = reader["tipunitst"].ToString(),
                    ordine = Int32.Parse((reader["ordine"]).ToString()),
                    catedra = reader["catedra"].ToString(),
                    CicluStudii = reader["Nume"].ToString(),
                    TipDisciplina = reader["TipDiscipina"].ToString(),
                    LimbaPredare = reader["Limba"].ToString(),
                    CSLP = reader["CSLP"].ToString(),
                    FormaStudiu = reader["FormaStudiu"].ToString(),
                });
            }
            conn.Close();
            return list;
        }
    }
}
