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
    public class LoginController : ApiController
    {
        [Route("api/Views/Login/SignIn1")]
        [HttpPost]
        public HttpResponseMessage SignIn1([FromBody] Models.User user)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query = "select Scurt from Facultate where Scurt='" + user.Scurt + "'";
                string query1 = "select id from Facultate where Scurt='" + user.Scurt + "'";
                var com1 = new SqlCommand(query, conn);
                var com2 = new SqlCommand(query1, conn);
                string name = com1.ExecuteScalar().ToString().Replace(" ", "");
                int id = (int)com2.ExecuteScalar();
                conn.Close();
                if (name.Equals(null))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Utilizator inexistent");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, id);
                   
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);

            }
        }
        [Route("api/Views/Login/SignIn2")]
        [HttpPost]
        public HttpResponseMessage SignIn2([FromBody] Models.User user)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query = "select Scurt from Universitate where Scurt='" + user.Scurt + "'";
                string query1 = "select id from Universitate where Scurt='" + user.Scurt + "'";
                var com1 = new SqlCommand(query, conn);
                var com2 = new SqlCommand(query1, conn);
                string name = com1.ExecuteScalar().ToString().Replace(" ", "");
                int id = (int)com2.ExecuteScalar();
                conn.Close();
                if (name.Equals(null))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Utilizator inexistent");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, id);

                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);

            }
        }
        [Route("api/Views/Login/SignIn3")]
        [HttpPost]
        public HttpResponseMessage SignIn3([FromBody] Models.User user)
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                conn.Open();
                string query = "select Scurt from Departament where Scurt='" + user.Scurt + "'";
                string query1 = "select id from Departament where Scurt='" + user.Scurt + "'";
                var com1 = new SqlCommand(query, conn);
                var com2 = new SqlCommand(query1, conn);
                string name = com1.ExecuteScalar().ToString().Replace(" ", "");
                int id = (int)com2.ExecuteScalar();
                conn.Close();
                if (name.Equals(null))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Utilizator inexistent");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, id);

                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);

            }
        }
    }
}
