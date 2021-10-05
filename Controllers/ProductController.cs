using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bookitwebapp.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace bookitwebapp.Controllers
{
    public class ProductController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;
        public static string User = "";
        private IWebHostEnvironment _env;
        public static string Login_Type = "";
        int pp_Id;
        public ProductController(IConfiguration config, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            User = _session.GetString("User_LoginId");
            Login_Type = _session.GetString("Login_Type");
            _env = env;
           // VendorProductModel(_config.GetConnectionString("DefaultConnection"), _httpContextAccessor, _config, _env);
        }

        [HttpPost]
        public IActionResult LoadVendorProductdet()
        {
            ProductModel load = new ProductModel(_config.GetConnectionString("DefaultConnection"), _httpContextAccessor, _env, _config);
            var model = load.LoadProducts();
            return new ObjectResult(model);
        }

        [HttpPost]
        public IActionResult Products()
        {
            ProductModel load = new ProductModel(_config.GetConnectionString("DefaultConnection"), _httpContextAccessor, _env, _config);
            var model = load.LoadProducts();
            return new ObjectResult(model);
        }


    }
}