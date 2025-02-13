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
    public partial class TicketDashboard : System.Web.UI.Page
    {

        public static string sCon = ConfigurationManager.ConnectionStrings["TicketDB"].ConnectionString;
        static List<dynamic> MyObjects = new List<dynamic>();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
       
        [WebMethod]
        public static List<dynamic> BindEmployeedata(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_IT_EMP_MASTER_DATA", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_USER_ID", User_id);

            con.Open();
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            //SqlDataReader dr = cmd.ExecuteReader();
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