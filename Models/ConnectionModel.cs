using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace bookitwebapp.Models
{
    public class ConnectionModel
    {
        public string ConnectionString { get; set; }
        SqlConnection _Mainconnection = new SqlConnection();
        SqlConnection _Logconnection = new SqlConnection();
        SqlDataAdapter _DataAdapter; SqlCommand _Command;
        public DataTable _dataTable = new DataTable();

        /// <summary>
        /// ESTABLISHING CONNECTION
        /// </summary>
        /// 


        public ConnectionModel(string connectionString)
        {

            this.ConnectionString = connectionString;

            //_Mainconnection.ConnectionString = (ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }

        public ConnectionModel()
        {
            SqlConnection con = GetConnection();
            _Mainconnection.ConnectionString = ConnectionString;
        }

        /// <summary>
        /// CREATING FOR RETRIEVING DATA FROM DATABASE
        /// </summary>
        /// <param name="command"></param>
        public void SelectData(string command)
        {
            //using (MysqlConnection conn = GetConnection())
            //{
            _Mainconnection.ConnectionString = ConnectionString;
            try
            {
                _Mainconnection.Open();
                _DataAdapter = new SqlDataAdapter(command, _Mainconnection);
                _DataAdapter.Fill(_dataTable);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                _Mainconnection.Close();
            }
            //}
        }
        public void SelectDataFromProcedure(string procedure, string[] parameter, string[] values)
        {
            //using (MysqlConnection conn = GetConnection())
            //{
            _Mainconnection.ConnectionString = ConnectionString;
            try
            {
                string sql = procedure;
                using (SqlCommand sqlCmd = new SqlCommand(sql, _Mainconnection))
                {
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    for (int i = 0; i < parameter.Length; i++)
                    {
                        sqlCmd.Parameters.AddWithValue(parameter[i], values[i]);
                    }
                    _Mainconnection.Open();
                    using (SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCmd))
                    {
                        sqlAdapter.Fill(_dataTable);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                _Mainconnection.Close();
            }
            //}
        }
        /// <summary>
        /// CREATING FOR INSERTING DATA TO DATABASE
        /// </summary>
        /// <param name="command"></param>
        public void InsertData(string command)
        {

            //using (MysqlConnection conn = GetConnection())
            //{
            _Mainconnection.ConnectionString = ConnectionString;
            try
            {
                _Mainconnection.Open();
                _Command = new SqlCommand(command, _Mainconnection);
                _Command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                _Mainconnection.Close();
            }
            //}
        }
    }
}
