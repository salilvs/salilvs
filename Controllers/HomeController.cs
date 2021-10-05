using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using bookitwebapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace bookitwebapp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;
        public string role = ""; public string userid = ""; public string logintype = "";
        public HomeController(ILogger<HomeController> logger, IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            role = _session.GetString("User_Role");
            userid = _session.GetString("User_LoginId");
            logintype = _session.GetString("Login_Type");
        }
        public IActionResult Login()
        {
            return View();
        }
       
        public IActionResult Products()
        {
            if ((userid != "") && (userid != null) && (role != "") && (role != null))
            {
                
                    return View();
               
            }
            else
            {
                return Redirect("/Home/Login");
            }
        }


        public IActionResult ProductAdd()
        {
            if ((userid != "") && (userid != null) && (role != "") && (role != null))
            {

                return View();

            }
            else
            {
                return Redirect("/Home/Login");
            }
        }

    }
}
