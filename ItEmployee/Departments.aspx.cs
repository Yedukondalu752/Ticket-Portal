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
    public partial class Departments : System.Web.UI.Page
    {
        public static string sCon = ConfigurationManager.ConnectionStrings["TicketDB"].ConnectionString;
        static List<dynamic> MyObjects = new List<dynamic>();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
    }
}