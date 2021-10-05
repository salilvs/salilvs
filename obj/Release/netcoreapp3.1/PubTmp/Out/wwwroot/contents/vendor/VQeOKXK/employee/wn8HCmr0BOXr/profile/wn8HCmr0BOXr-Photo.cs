using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Bookit_Web_App.Models
{
    public class AppointmentManagementModel
    {
        public string _connectionString { get; set; }
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IDataProtector _protector;
        private ISession _session => _httpContextAccessor.HttpContext.Session;
        IWebHostEnvironment _env;
        private readonly IConfiguration _config;
        public AppointmentManagementModel(string connectionString, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env, IConfiguration config)
        {
            _connectionString = connectionString;
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _config = config;
        }
        public class Appointment_Details
        {
            public string Appointment_id { get; set; }
            public string Appointment_Date { get; set; }
            public string Appointment_Customer_Uniqueid { get; set; }

            public string Customer_Name { get; set; }

            public string Vendor_Name { get; set; }
            public string Vendor_Employee_Name { get; set; }

            public string Created_Date { get; set; }
            public string Package_Name { get; set; }
            public string Package_Rate { get; set; }
            public string Commission_Type { get; set; }
            public string Commission { get; set; }
            public string Commission_Amt { get; set; }
            public string Payment_Total { get; set; }
            public string payment_grandtotal { get; set; }
            public string Payment_Type { get; set; }
            public string amount { get; set; }
            public string gst { get; set; }

            public string cu_Date { get; set; }

            public string Appointment_Status { get; set; }

            public string Reschedule_Appointment_Booked_Id { get; set; }
            public string Reschedule_Appointment_From_Time { get; set; }
            public string Reschedule_Appointment_To_Time { get; set; }

            public string Appointment_From_date { get; set; }

            public string Appointment_To_date { get; set; }
            public string from_date { get; set; }
            public string to_date { get; set; }
            public string totamount_company { get; set; }

            public string process_Id { get; set; }
            public string vendor_Id { get; set; }
            public string monthly { get; set; }
            public string daily { get; set; }


        }
        internal List<Appointment_Details> pendingAppointmentdetails()
        {
            try
            {
                List<Appointment_Details> _details = new List<Appointment_Details>(); CommonModel _get = new CommonModel(_connectionString, _httpContextAccessor, _config, _env);
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                _selectdata.SelectData("select c.Customer_Name, a.Appointment_Id, a.Appointment_Date, tv.Vendor_Name, ve.Vendor_Employee_Vendor_Id, ve.Vendor_Employee_Name, p.Package_Name, p.Package_Rate, " +
                                       " a.Appointment_Created_Date as Appointment_Date from tbl_appointments a inner join tbl_vendoremployee ve on ve.Vendor_Employee_Uniqueid = a.Appointment_Employee_Uniqueid " +
                                       " inner join tbl_vendor tv on tv.Vendor_uniqueid = ve.Vendor_Employee_Vendor_Id inner join tbl_customers c on c.Customer_uniqueid = Appointment_Customer_Uniqueid " +
                                       " inner join tbl_vendorpackages p on p.Package_Uniqueid = a.Appointment_Package_Uniqueid where a.Appointment_Status = 'Pending' " +
                                       " union " +
                                       " select c.Customer_Name, a.Appointment_Id, ar.Reschedule_Appointment_Date, tv.Vendor_Name, ve.Vendor_Employee_Vendor_Id, ve.Vendor_Employee_Name, p.Package_Name, p.Package_Rate, ar.Reschedule_Appointment_Date as Appointment_Date " +
                                       " from tbl_appointments a inner join tbl_appointmentsreschedule ar  on ar.Reschedule_Appointment_Booked_Id = a.Appointment_Id " +
                                       " inner join tbl_vendoremployee ve on ve.Vendor_Employee_Uniqueid = a.Appointment_Employee_Uniqueid inner join tbl_vendor tv on tv.Vendor_uniqueid = ve.Vendor_Employee_Vendor_Id " +
                                       " inner join tbl_customers c on c.Customer_uniqueid = Appointment_Customer_Uniqueid " +
                                       " inner join tbl_vendorpackages p on p.Package_Uniqueid = a.Appointment_Package_Uniqueid " +
                                       " where ar.Reschedule_Appointment_Status = 'Pending' and a.Appointment_Status = 'Rescheduled')");
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    for (int i = 0; i < _selectdata._dataTable.Rows.Count; i++)
                    {
                        _details.Add(new Appointment_Details
                        {
                            Customer_Name = _selectdata._dataTable.Rows[i]["Customer_Name"].ToString(),
                            //subscriptions_Type = _selectdata._dataTable.Rows[i]["subscriptions_Type"].ToString(),
                            //vendorname = _selectdata._dataTable.Rows[i]["vendorname"].ToString(),
                            //subscriptions_Plan = _selectdata._dataTable.Rows[i]["subscriptions_Plan"].ToString(),
                            //subscriptions_Status = _selectdata._dataTable.Rows[i]["subscriptions_Status"].ToString(),
                            //subscriptions_Due_Date = _selectdata._dataTable.Rows[i]["subscriptions_Due_Date"].ToString(),
                            //subscriptions_Of = _selectdata._dataTable.Rows[i]["subscriptions_Of"].ToString(),
                            //subscriptions_Created_By = _userdata._dataTable.Rows[0]["Created_Person_Name"].ToString(),
                            //subscriptions_Created_Date = _selectdata._dataTable.Rows[i]["subscriptions_Created_Date"].ToString(),
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
    }
}
