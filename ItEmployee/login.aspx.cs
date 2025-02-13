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
    public partial class login : System.Web.UI.Page
    {

        public static string sCon = ConfigurationManager.ConnectionStrings["TicketDB"].ConnectionString;
        static List<dynamic> MyObjects = new List<dynamic>();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static List<dynamic> Login(string User_name, string Password)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_VALIDATE_USER_NAME", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_USER_NAME", User_name);
            cmd.Parameters.AddWithValue("@IP_PASSWORD", Password);
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

        [WebMethod]
        public static List<dynamic> BindGrid(string User_id,string from_dt,string to_dt,string Status)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_IT_EMP_DATA", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_USER_ID", User_id);
            cmd.Parameters.AddWithValue("@IP_FROM_DT", from_dt);
            cmd.Parameters.AddWithValue("@IP_TO_DT", to_dt);
            cmd.Parameters.AddWithValue("@IP_STATUS", Status);
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


        [WebMethod]
        public static string GetCustomers(string User_id)
        {
            //string query = "SELECT top 5 CustomerID, ContactName, City FROM Customers GO SELECT top 5 EmployeeId,FirstName FROM Employees";
            SqlCommand cmd = new SqlCommand("PR_GET_EMP_MASTER_DATA_NEW");
            return GetData(cmd).ToString();
        }

        private static DataSet GetData(SqlCommand cmd)
        {
            string strConnString = ConfigurationManager.ConnectionStrings["SuvarnaDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(strConnString))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataSet ds = new DataSet())
                    {
                        sda.Fill(ds);
                        return ds;
                    }
                }
            }
        }


      

       



        //
        [WebMethod]
        public static List<dynamic> Usercreation(string User_name, string Password, string phone_no, string email, string dob, string gender,string deptid,string role)
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
            cmd.Parameters.AddWithValue("@IP_DEPARTMENT", deptid);
            cmd.Parameters.AddWithValue("@IP_ROLE", role);
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
        [WebMethod]
        public static List<dynamic> BindEmployeedata(string User_id,string Dept_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_IT_EMP_MASTER_DATA", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_USER_ID", User_id);
            cmd.Parameters.AddWithValue("@IP_DEPT_ID", Dept_id);

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

        [WebMethod]
        public static List<dynamic> BindDocuments1(string User_id)
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

        //'loc_id':'" + loc_id + "','Segment_id':'" + Segment_id + "','Segment_type':'" + Segment_type + "','ddlproblemdesc':'" + ddlproblemdesc + "','support':'" + support + "','esttime':'" + esttime + "','priority':'" + priority + "','status':'" + status + "'


        [WebMethod]
        public static List<dynamic> Saveticket(string loc_id, string Segment_id, string Segment_type, string ddlproblemdesc, string support, string esttime, string priority, string status,string remarks,string flag,string ticketno,string create_by,string dept_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_INSUPD_IT_EMPLOYEE_INFO", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_LOCATION_ID", loc_id);
            cmd.Parameters.AddWithValue("@IP_SERVICE_SEGMENT_ID", Segment_id);
            cmd.Parameters.AddWithValue("@IP_SEGMENT_TYPE_ID", Segment_type);
            cmd.Parameters.AddWithValue("@IP_PROBLEM_DESC", ddlproblemdesc);
            cmd.Parameters.AddWithValue("@IP_SUPPORT_EMP_ID", support);
            cmd.Parameters.AddWithValue("@IP_SUPPORT_PRIORITY", priority);
            cmd.Parameters.AddWithValue("@IP_ESTIMATION_TIME", esttime);
            cmd.Parameters.AddWithValue("@IP_STATUS", status);
            cmd.Parameters.AddWithValue("@IP_REMARKS", remarks);
            cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_TICKET_NO", ticketno);
            cmd.Parameters.AddWithValue("@IP_CREATE_BY", create_by);
            cmd.Parameters.AddWithValue("@IP_DEPT_ID", dept_id);
            
            //create_by
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
        [WebMethod]
        public static List<dynamic> SaveDept(string Department_name, string Department_Desc)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_INSUPS_TICKET_DEPARTMENT", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_DEPT_NAME", Department_name);
            cmd.Parameters.AddWithValue("@IP_DEPT_DESC", Department_Desc);

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

        [WebMethod]
        public static List<dynamic> BindDepts(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_TICKET_DEPTS", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);


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

        [WebMethod]
        public static List<dynamic> BindLocations(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_IT_EMP_LOCATIONS", con);
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

        [WebMethod]
        public static List<dynamic> BindSegments(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_SEGMENT_LIST", con);
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
        [WebMethod]
        public static List<dynamic> BindSementtypelist(string Segment_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_SEGMENT_TYPE_LIST", con);
            //  cmd.Parameters.AddWithValue("@IP_FLAG", flag);
            cmd.Parameters.AddWithValue("@IP_SEGMENT_ID", Segment_id);

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
        [WebMethod]
        public static List<dynamic> BindProblems(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_PROBLEMS_LIST", con);
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
        [WebMethod]
        public static List<dynamic> BindProblempriority(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_PROBLEMSPRIORITH_LIST", con);
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
        [WebMethod]
        public static List<dynamic> BindEsttime(string User_id)
        {
            SqlConnection con = new SqlConnection(sCon);
            SqlCommand cmd = new SqlCommand("PR_GET_ESTIMATION_TIMS_LIST", con);
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