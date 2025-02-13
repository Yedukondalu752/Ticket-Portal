using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using System.Web.UI;

namespace ItEmployee
{
    public partial class SiteMaster : MasterPage
    {
        public static string sCon = ConfigurationManager.ConnectionStrings["TicketDB"].ConnectionString;
        static List<dynamic> MyObjects = new List<dynamic>();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static List<dynamic> Getdocuments(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_TICKET_DOCS", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_USER_ID", User_id);

            con.Open();
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            // SqlDataReader dr = cmd.ExecuteReader();
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