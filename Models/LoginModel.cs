using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;



namespace bookitwebapp.Models
{
    public class LoginModel
    {
        public string _connectionString { get; set; }
        private readonly IHttpContextAccessor _httpContextAccessor; private IDataProtector _protector;
        private IWebHostEnvironment _env;
        private ISession _session => _httpContextAccessor.HttpContext.Session;
        private readonly IConfiguration _config;

        public LoginModel(string connectionString, IHttpContextAccessor httpContextAccessor, IDataProtector protector, IWebHostEnvironment env)
        {
            _connectionString = connectionString;
            _httpContextAccessor = httpContextAccessor;
            _protector = protector;
            _env = env;
          
        }
        public class return_Details
        {
            public string Type { get; set; }
            public string Title { get; set; }
            public string Message { get; set; }
            public string Url { get; set; }
        }
        internal List<return_Details> LoginAccess(string username, string password, string rememberme)
        {
            try
            {
                var user_id = "";
                List<return_Details> _details = new List<return_Details>();
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                string procedure = "sp_authentication";
                string[] parameter = { "@username", "@password" };
                string[] values = { username, password };                                     
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    if (_selectdata._dataTable.Rows[0]["Type"].ToString().ToUpper() == ("Success").ToUpper())
                    {
                        user_id = _selectdata._dataTable.Rows[0]["User_LoginId"].ToString();
              
                        _session.SetString("User_Name", _selectdata._dataTable.Rows[0]["User_Name"].ToString());
                        _session.SetString("User_Role", _selectdata._dataTable.Rows[0]["User_Role"].ToString());
                        _session.SetString("User_LoginId", _selectdata._dataTable.Rows[0]["User_LoginId"].ToString());



                        _details.Add(new return_Details
                        {
                            Message = "Access Granted",
                            Title = "Successfully",
                            Type = "Success",
                            Url = "home/Products"
                        });







                    }
                    else
                    {
                        _details.Add(new return_Details
                        {
                            Message = _selectdata._dataTable.Rows[0]["Message"].ToString(),
                            Title = _selectdata._dataTable.Rows[0]["Title"].ToString(),
                            Type = _selectdata._dataTable.Rows[0]["Type"].ToString(),
                            Url = _selectdata._dataTable.Rows[0]["Url"].ToString()
                        });
                    }
                }
                return _details;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

//        internal List<return_Details> CreateloginCredentials(string emailid)
//        {
//            try
//            {
//                string email,pass;
//                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
               
//                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
//                CommonModel _get = new CommonModel(_connectionString, _httpContextAccessor, _config, _env);
//                List<return_Details> _returndetails = new List<return_Details>();
               
//                _selectdata.SelectData("select Login_Username_1,Login_Password from tbl_login where Login_Username_1 = '" + emailid + "'");
//                if (_selectdata._dataTable.Rows.Count > 0)
//                {
//                     email= _selectdata._dataTable.Rows[0][0].ToString();
//                    pass = _selectdata._dataTable.Rows[0][1].ToString();
//#pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed. Consider applying the 'await' operator to the result of the call.
//                    _get.SendCredentialsEmail(email, pass);
//#pragma warning restore CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed. Consider applying the 'await' operator to the result of the call.
//                        _returndetails.Add(new return_Details
//                        {
//                            Message = "Successfully Send Password",
//                            Title = "Success",
//                            Type = "Success",
//                        });
//                        return _returndetails;
//                    }
//                    else
//                    {
                      
//                            _returndetails.Add(new return_Details
//                            {
//                                Message = "Email id is not Valid",
//                                Title = "Alert",
//                                Type = "Warning",
//                            });
//                            return _returndetails;
//                        //}
//                    }
               
               
//            }
//            catch (Exception ex)
//            {
//                throw (ex);
//            }
//        }



        internal List<return_Details> updatePassword(string username, string password)
        {
            try
            {
                List<return_Details> _returndetails = new List<return_Details>();
                ConnectionModel _insertdata = new ConnectionModel(_connectionString);

              

                _insertdata.InsertData("Update tbl_login Set Login_Password = '" + password + "', Login_Password_Changed = 'Changed' where  Login_Username_1 = '" + username + "' or Login_Username_2 = '" + username + "'");
                _returndetails.Add(new return_Details
                {
                    Message = "Successfully Updated the Password",
                    Title = "Successfully Saved",
                    Type = "Success",
                    Url = "/Vendor/Dashboard",
                });
                return _returndetails;

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
