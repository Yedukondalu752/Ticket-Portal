using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

namespace ItEmployee
{
    public partial class _Default : Page
    {
        public static string sCon = ConfigurationManager.ConnectionStrings["TicketDB"].ConnectionString;
        static List<dynamic> MyObjects = new List<dynamic>();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static List<dynamic> Usercreation(string User_name, string Password, string phone_no, string email, string dob, string gender)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_INS_USER_CREATION", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_USER_NAME", User_name);
            cmd.Parameters.AddWithValue("@IP_PASSWORD", Password);
            cmd.Parameters.AddWithValue("@IP_PHONE_NO", phone_no);
            cmd.Parameters.AddWithValue("@IP_EMAIL", email);
            cmd.Parameters.AddWithValue("@IP_DOB", dob);
            cmd.Parameters.AddWithValue("@IP_GENDER_ID", gender);
            con.Open();
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            SqlDataReader dr = cmd.ExecuteReader();
            List<dynamic> mylist = new List<dynamic>();
            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                mylist.Add(dict);
            }
            return mylist;
        }
    }
}