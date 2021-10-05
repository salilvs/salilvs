using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bookitwebapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.DataProtection;


namespace bookitwebapp.Controllers
{
    public class LoginController : Controller
    {
        // GET: /<controller>/
        private IDataProtector _protector;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session; 
        public static string Login_User = ""; public static string role = "";
        private IWebHostEnvironment _env;
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger, IConfiguration config, IHttpContextAccessor httpContextAccessor, IDataProtectionProvider provider, IWebHostEnvironment env)
        {
            _config = config;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _protector = provider.CreateProtector("Book_It_Web_App");
            role = _session.GetString("User_Role");
            Login_User = _session.GetString("User_LoginId");
           
        }
        [HttpPost]
        public JsonResult GetLoginAccess(string username, string password, string rememberme)
        {
            try
            {
                LoginModel logged = new LoginModel(_config.GetConnectionString("DefaultConnection"), _httpContextAccessor, _protector, _env);
                var model = logged.LoginAccess(username, password, rememberme);
                 
                return Json(model);
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception", ex); 
                throw(ex);
            }
        }

        [HttpPost]
        public JsonResult UpdatePassword(string username, string password)
        {
            try
            {
                LoginModel logged = new LoginModel(_config.GetConnectionString("DefaultConnection"), _httpContextAccessor, _protector, _env);
                var model = logged.updatePassword(username, password);
                return Json(model);
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception", ex);
                throw (ex);
            }
        }


              public JsonResult Logout()
        {
            try
            {
                _session.Clear();
                return Json("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception", ex); 
                throw(ex);
            }
        }
    }
}
