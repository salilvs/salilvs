using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bookitwebapp.Models
{
    public class ProductModel
    {
        public string _connectionString { get; set; }
        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;
        IWebHostEnvironment _env;
        private readonly IConfiguration _config;
        public ProductModel(string connectionString, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env, IConfiguration config)
        {
            _connectionString = connectionString;
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _config = config;
        }
        public class Product_Details
        {
            public int Id { get; set; }
            public string ItemCode { get; set; }
            public string ProductName { get; set; }
            public string ProductDescription { get; set; }
            public int ProductUnitofMeasurement { get; set; }
            public string PerUnitWeight { get; set; }
            public int PerUnitWeightUOM { get; set; }
            public int ProductQty { get; set; }
            public double ProductPrice { get; set; }
            public int ProductCategoryId { get; set; }
            public int ProductSubCategoryId { get; set; }
            public string ProductStatus { get; set; }
            public string ProductDefaultImageUrl { get; set; }
            public string Vendor_Id { get; set; }
            public double xx { get; set; }
            public double yy { get; set; }
            public double offerpr { get; set; }
            public string ProductAvilable { get; set; }

            public string ProductCategoryName { get; set; }
            public string ProductSubCategoryName { get; set; }
            public string UnitOfMeasurement { get; set; }

        }
        public class return_Details
        {
            public string Type { get; set; }
            public string Title { get; set; }
            public string Message { get; set; }
        }

        internal object LoadProducts()
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                //  var procedure = "sp_LoadProduct11";
                //// var procedure = "sp_LoadProduct";
                //  string[] parameter = { "@PageNumber",
                //                          "@PageSize"};
                //  string[] values = { "1", "200" };

                var procedure = "sp_Product";
                // var procedure = "sp_LoadProduct";
                string[] parameter = { };
                string[] values = {  };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object loadproductData(int Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadBookitProductData";
                string[] parameter = { "@productCatId" };
                string[] values = { Id.ToString() };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }



        internal object LoadProducts_Category(int p_Cat_Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                //var procedure = "sp_LoadProductCategory1";
                var procedure = "sp_LoadBookitProduct_Category";
                string[] parameter = { "@Cat_Id" };
                string[] values = { p_Cat_Id.ToString() };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object loadproductdetails_cat_subcat(int p_Cat_Id, int p_subcatId)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                //var procedure = "sp_LoadProductCategorysubCat1";
               var procedure = "sp_LoadBookitProduct_CategorySubCat";
                string[] parameter = { "@Cat_Id", "@SubCat_Id" };
                string[] values = { p_Cat_Id.ToString(), p_subcatId.ToString() };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }


        internal object LoadVendorProducts(string Vendor_Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                //var procedure = "sp_LoadVendorProduct1";
                var procedure = "sp_LoadVendorProduct";
                string[] parameter = { "@Vendor_Id" };
                string[] values = { Vendor_Id };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object LoadVendorProductdet(string Vendor_Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadVendorProductdet1";
                string[] parameter = { "@Vendor_Id" };
                string[] values = { Vendor_Id };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                   // return _selectdata._dataTable.Rows[0][0];
                }

                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object LoadVendorProductdet_category(string Vendor_Id, int ProductCategoryId)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadVendorProductdetcategory1";
                string[] parameter = { "@Vendor_Id",
                                       "@ProductCategoryId",
                                        "@ProductSubCategoryId",
                                        "@ProductStatus",
                                        //"@ProductAvilable",
                                       "@typ"
                                     };
                string[] values = { Vendor_Id ,
                                    ProductCategoryId.ToString(),
                                    "",
                                    "",
                                    //"",
                                    "Category"
                                  };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object LoadVendorProductdet_Subcategory(string Vendor_Id, int ProductCategoryId, int ProductSubCategoryId)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadVendorProductdetcategory1";
                string[] parameter = { "@Vendor_Id",
                                       "@ProductCategoryId",
                                       "@ProductSubCategoryId",
                                       "@ProductStatus",
                                       //"@ProductAvilable",
                                       "@typ"
                                     };
                string[] values = { Vendor_Id ,
                                    ProductCategoryId.ToString(),
                                    ProductSubCategoryId.ToString(),
                                    "",
                                    //"",
                                    "SubCategory"
                                  };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object LoadVendorProductdet_Status(string Vendor_Id, string ProductStatus)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadVendorProductdetcategory1";
                string[] parameter = { "@Vendor_Id",
                                      "@ProductCategoryId",
                                       "@ProductSubCategoryId",
                                       "@ProductStatus",
                                       //"@ProductAvilable",
                                       "@typ"
                                     };
                string[] values = { Vendor_Id ,
                                    "",
                                    "",
                                    ProductStatus,
                                    //"",
                                    "Status"
                                  };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object LoadVendorProductdet_Avilablity(string Vendor_Id, string ProductAvilable)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadVendorProductdetcategory";
                string[] parameter = { "@Vendor_Id",
                                      "@ProductCategoryId",
                                       "@ProductSubCategoryId",
                                       "@ProductStatus",
                                       //"@ProductAvilable",
                                       "@typ"
                                     };
                string[] values = { Vendor_Id ,
                                    "",
                                    "",
                                    "",
                                    //ProductAvilable,
                                    "Avilable"
                                  };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object loadPrdUOM()
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductUOM";
                string[] parameter = { };
                string[] values = { };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object loadPrdUnit()
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductUOM";
                string[] parameter = { };
                string[] values = { };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object loadPrdUnit1()
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductUOM";
                string[] parameter = { };
                string[] values = { };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        //internal object loadProductCategory()
        //{
        //    try
        //    {
        //        ConnectionModel _selectdata = new ConnectionModel(_connectionString);
        //        var procedure = "sp_LoadProductCategory";
        //        string[] parameter = { };
        //        string[] values = { };
        //        _selectdata.SelectDataFromProcedure(procedure, parameter, values);
        //        if (_selectdata._dataTable.Rows.Count > 0)
        //        {
        //            return _selectdata._dataTable.Rows[0]["JsonResult"];
        //        }
        //        else
        //        {
        //            return "";
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }
        //}


        internal object loadProductCategory(string Vendor_Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductCategory";
                string[] parameter = { "@id" };
                string[] values = { Vendor_Id };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object loadProductCategory_Vendor(string Vendor_Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductCategoryVendor";
                string[] parameter = { "@Vendor_Id" };
                string[] values = { Vendor_Id };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }


        //internal object loadProductSubCategory_Vendor(string Vendor_Id,string CatId)
        internal object loadProductSubCategory_Vendor(string CatId)
        {
            try
            {
                if(CatId=="null")
                {
                    CatId = "";

                }
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductSubCategoryVendor";
                string[] parameter = { "@Vendor_Id", "@CatId" };
                string[] values = {"" ,CatId};
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object loadProduct_Vendor(string CatId,string SubCatId)
        {
            try
            {
                if (CatId == "null")
                {
                    CatId = "";
                }
                if (SubCatId == "null")
                {
                    SubCatId = "";
                }
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductCatSubCatVendor";
                string[] parameter = { "@Vendor_Id", "@CatId", "@SubCatId" };
                string[] values = { "", CatId, SubCatId };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object LoadVendorProductCategoryList(string Vendor_Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadVendorProductCategoryList";
                string[] parameter = { "@Vendor_Id" };
                string[] values = { Vendor_Id };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object loadProductCategory11()
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductCategory";
                string[] parameter = { };
                string[] values = { };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        internal object loadProductSubCategory(String Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductSubCategory";
                string[] parameter = {
                                      "@Id"
                                      };

                string[] values = {
                                     Id

                                    };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        //internal object SaveProductDetails(IFormFile ProductDefaultImageUrl, string ProductName, string ProductDescription, int ProductUnitofMeasurement, string PerUnitWeight, int PerUnitWeightUOM, int ProductQty, double ProductPrice, int ProductCategoryId, int ProductSubCategoryId, string User, string ProductAvilable, string ProductStatus, string offerpr)
        //{
        //    try
        //    {
        //        var webRoot = _env.WebRootPath;
        //        CommonModel _get = new CommonModel(_connectionString, _httpContextAccessor, _config, _env);
        //        string created_date = _get.currentDateTime(); string created_by = User; var filePath = ""; var loginaccess = "No";
        //        var referenceno = _get.RandomString(12);
        //        var referencenostatus = _get.CheckReferenceNoExists(referenceno, "Product");
        //        while (referencenostatus != "Not Exists")
        //        {
        //            referenceno = _get.RandomString(12);
        //            referencenostatus = _get.CheckReferenceNoExists(referenceno, "Product");
        //        }
        //        var PathProfile = System.IO.Path.Combine(webRoot, "contents/admin/" + referenceno + "/product");

        //        if (ProductDefaultImageUrl != null)
        //        {
        //            filePath = _get.SaveImageIntoFolder(PathProfile, referenceno, "", "Product", ProductDefaultImageUrl);
        //        }
        //        if (offerpr == null)
        //        {
        //            offerpr = "0.00";
        //        }
        //        ConnectionModel _insertdata = new ConnectionModel(_connectionString);
        //        // var selectionType = "Insert_Product";
        //        var procedure = "sp_Product";
        //        string[] parameter = {
        //                                "@ItemCode",
        //                                "@ProductName", "@ProductDescription",
        //                                "@ProductUnitofMeasurement",
        //                                "@PerUnitWeight", "@PerUnitWeightUOM",
        //                                "@ProductQty", "@ProductPrice",
        //                                "@ProductCategoryId", "@ProductSubCategoryId",
        //                                "@ProductStatus",
        //                                "@ProductAvilable",
        //                                "@offerpr",
        //                                "@ProductDefaultImageUrl",

        //                                "@Created_Date", "@Created_By",
        //                                "@Modified_Date", "@Modified_By",
        //                                "@typ","@Id",

        //                            };
        //        string[] values = {
        //                                "",
        //                                ProductName, ProductDescription,
        //                                ProductUnitofMeasurement.ToString(), PerUnitWeight,
        //                                PerUnitWeightUOM.ToString(), ProductQty.ToString(),
        //                                ProductPrice.ToString(), ProductCategoryId.ToString(),
        //                                ProductSubCategoryId.ToString(),ProductStatus,
        //                                ProductAvilable,
        //                                offerpr,
        //                                filePath,
        //                                created_date, created_by,
        //                                "","","Save",""


        //                          };
        //        _insertdata.SelectDataFromProcedure(procedure, parameter, values);
        //        if (_insertdata._dataTable.Rows.Count > 0)
        //        {
        //            return _insertdata._dataTable.Rows[0]["JsonResult"];
        //        }
        //        else
        //        {
        //            return "";
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw (ex);
        //    }
        //}

        internal object SaveVendorProductDetails(string Vendor_Id)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_CustomerApi_ECommerce_PopulateProduct1";
                string[] parameter = {
                                       "@pVendorid"

                                    };
                string[] values = {
                                        Vendor_Id


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        internal object SaveVendorProductDetailsCat(string Vendor_Id, string Product_CatId)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                if (null == Product_CatId || Product_CatId == "" || Product_CatId == "undefined") { return ""; }
                //string[] splitInput = Product_CatId.Split(',');
                //var Product_Category_Uniquieid = splitInput.Where(t => !string.IsNullOrWhiteSpace(t)).Distinct().ToList();
                //for (int i = 0; i < Product_Category_Uniquieid.Count; i++)
                //{

                //var procedure = "sp_CustomerApi_ECommerce_PopulateProductCat";
                //string[] parameter = {
                //                   "@pVendorid",
                //                   "@Product_CatId"
                //                };
                //string[] values = {
                //                    Vendor_Id,
                //                    Product_Category_Uniquieid[i]
                //              };
                // _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                // }


                var procedure = "sp_CustomerApi_ECommerce_PopulateProductCat";
                string[] parameter = {
                                       "@pVendorid",
                                       "@Product_CatId"
                                    };
                string[] values = {
                                        Vendor_Id,
                                        Product_CatId
                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }

        internal object SaveVendorProductDetailsSubCat(string Vendor_Id, string Product_CatId, string Product_SubCatId)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                if (null == Product_CatId || Product_CatId == "" || Product_CatId == "undefined") { return ""; }
                //string[] splitInput = Product_CatId.Split(',');
                //var Product_Category_Uniquieid = splitInput.Where(t => !string.IsNullOrWhiteSpace(t)).Distinct().ToList();
                //for (int i = 0; i < Product_Category_Uniquieid.Count; i++)
                //{

                //var procedure = "sp_CustomerApi_ECommerce_PopulateProductCat";
                //string[] parameter = {
                //                   "@pVendorid",
                //                   "@Product_CatId"
                //                };
                //string[] values = {
                //                    Vendor_Id,
                //                    Product_Category_Uniquieid[i]
                //              };
                // _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                // }


                var procedure = "sp_CustomerApi_ECommerce_PopulateProductSubCat";
                string[] parameter = {
                                       "@pVendorid",
                                       "@Product_CatId",
                                       "@Product_SubCatId"
                                    };
                string[] values = {
                                        Vendor_Id,
                                        Product_CatId,
                                        Product_SubCatId
                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }

        internal object SaveVendorProductDetailsItem(string Vendor_Id, string Product_CatId, string Product_SubCatId,string Product_Items)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                if (null == Product_CatId || Product_CatId == "" || Product_CatId == "undefined") { return ""; }
                var procedure = "sp_CustomerApi_ECommerce_PopulateProductItem";
                string[] parameter = {
                                       "@pVendorid",
                                       "@Product_CatId",
                                       "@Product_SubCatId",
                                       "@Item"
                                    };
                string[] values = {
                                        Vendor_Id,
                                        Product_CatId,
                                        Product_SubCatId,
                                        Product_Items
                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        internal object SaveVendorOfferpricetDetails(string Vendor_Id)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_CustomerApi_ECommerce_Offerprice";
                string[] parameter = {
                                       "@pVendorid"

                                    };
                string[] values = {
                                        Vendor_Id


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        internal object SaveProductOfferPrice(string Item_code, double xx, double yy, double offerpr)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_productOfferprice";
                string[] parameter = {
                                       "@Item_code",
                                       "@xx",
                                       "@yy",
                                       "@offerpr",
                                       "@typ"


                                    };
                string[] values = {
                                        Item_code,
                                        xx.ToString(),
                                        yy.ToString(),
                                        offerpr.ToString(),
                                        "Save"


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        internal object SaveVendorProductOfferPrice(string Item_code, double xx, double yy, double offpr, string Vendor_Id)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_productvendorOfferprice";
                string[] parameter = {
                                        "@Vendor_Id",
                                       "@Item_code",
                                       "@xx",
                                       "@yy",
                                       "@offerpr",
                                       "@typ"



                                    };
                string[] values = {
                                        Vendor_Id,
                                        Item_code,
                                        xx.ToString(),
                                        yy.ToString(),
                                        offpr.ToString(),
                                        "Save"


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        internal object loadProductOffer(string ItemCode)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_loadproductOfferprice";
                string[] parameter = {
                                       "@Item_code",
                                       "@typ",
                                       "@vendor_Id"


                                    };
                string[] values = {
                                        ItemCode,
                                        "Load",
                                        ""


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        internal object loadProductOffer1(string ItemCode, string Vendor_Id)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_loadproductOfferprice";
                string[] parameter = {
                                       "@Item_code",
                                       "@typ",
                                       "@vendor_Id"


                                    };
                string[] values = {
                                        ItemCode,
                                        "VLoad",
                                       Vendor_Id


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
        //internal object UpdateProductDetails(IFormFile ProductDefaultImageUrl, string ProductName, string ProductDescription, int ProductUnitofMeasurement, string PerUnitWeight, int PerUnitWeightUOM, int ProductQty, double ProductPrice, int ProductCategoryId, int ProductSubCategoryId, string User/*, int Id*/, string ProductAvilable, string ProductStatus, string offerpr, string ItemCode)
        //{
        //    try
        //    {
        //        var webRoot = _env.WebRootPath;
        //        CommonModel _get = new CommonModel(_connectionString, _httpContextAccessor, _config, _env);
        //        string created_date = _get.currentDateTime(); string created_by = User; var filePath = ""; var loginaccess = "No";
        //        var referenceno = _get.RandomString(12);
        //        var referencenostatus = _get.CheckReferenceNoExists(referenceno, "Product");
        //        while (referencenostatus != "Not Exists")
        //        {
        //            referenceno = _get.RandomString(12);
        //            referencenostatus = _get.CheckReferenceNoExists(referenceno, "Product");
        //        }
        //        var PathProfile = System.IO.Path.Combine(webRoot, "contents/admin/" + referenceno + "/product");

        //        if (ProductDefaultImageUrl != null)
        //        {
        //            filePath = _get.SaveImageIntoFolder(PathProfile, referenceno, "", "Product", ProductDefaultImageUrl);
        //        }
        //        else
        //        {
        //            filePath = "null";


        //        }

        //        ConnectionModel _insertdata = new ConnectionModel(_connectionString);
        //        // var selectionType = "Insert_Product";
        //        var procedure = "sp_Product";
        //        string[] parameter = {
        //                                "@ProductName", "@ProductDescription",
        //                                "@ProductUnitofMeasurement",
        //                                "@PerUnitWeight", "@PerUnitWeightUOM",
        //                                "@ProductQty", "@ProductPrice",
        //                                "@ProductCategoryId", "@ProductSubCategoryId",
        //                                "@ProductStatus",
        //                                "@ProductAvilable",
        //                                "@offerpr",
        //                                "@ProductDefaultImageUrl",
        //                                "@Created_Date", "@Created_By",
        //                                "@Modified_Date", "@Modified_By",
        //                                "@typ","@Id","@ItemCode"

        //                            };
        //        string[] values = {
        //                                ProductName, ProductDescription,
        //                                ProductUnitofMeasurement.ToString(), PerUnitWeight,
        //                                PerUnitWeightUOM.ToString(), ProductQty.ToString(),
        //                                ProductPrice.ToString(), ProductCategoryId.ToString(),
        //                                ProductSubCategoryId.ToString(),ProductStatus,
        //                                ProductAvilable,
        //                                offerpr,
        //                                filePath,
        //                                created_date, created_by,
        //                                "","","Update","",ItemCode


        //                          };
        //        _insertdata.SelectDataFromProcedure(procedure, parameter, values);
        //        if (_insertdata._dataTable.Rows.Count > 0)
        //        {
        //            return _insertdata._dataTable.Rows[0]["JsonResult"];
        //        }
        //        else
        //        {
        //            return "";
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw (ex);
        //    }
        //}
        //internal object UpdateVendorProductDetails(IFormFile ProductDefaultImageUrl, string ProductName, string ProductDescription, string ProductUnitofMeasurement, string PerUnitWeight, string PerUnitWeightUOM, int ProductQty, double ProductPrice, /*int Id,*/ string offerpr, string ItemCode, string Vendor_Id, string ProductStatus, string ProductAvilable,string VendorProductRefCode)
        //{
        //    try
        //    {
        //        CommonModel _get = new CommonModel(_connectionString, _httpContextAccessor, _config, _env);
        //        string created_date = _get.currentDateTime(); string created_by = Vendor_Id; var filePath = "";
        //        ConnectionModel _insertdata = new ConnectionModel(_connectionString);
        //        if (offerpr == null)
        //        {
        //            offerpr = "0.00";
        //        }
        //        if (ProductAvilable == null)
        //        {
        //            ProductAvilable = "Avilable";
        //        }
        //        var webRoot = _env.WebRootPath;
        //        var referenceno = _get.RandomString(12);
        //        var referencenostatus = _get.CheckReferenceNoExists(referenceno, "Product");
        //        while (referencenostatus != "Not Exists")
        //        {
        //            referenceno = _get.RandomString(12);
        //            referencenostatus = _get.CheckReferenceNoExists(referenceno, "Product");
        //        }
        //        var PathProfile = System.IO.Path.Combine(webRoot, "contents/admin/" + referenceno + "/product");
        //        if (ProductDefaultImageUrl != null)
        //        {
        //            filePath = _get.SaveImageIntoFolder(PathProfile, referenceno, "", "Product", ProductDefaultImageUrl);
        //        }
        //        // var selectionType = "Insert_Product";

        //        if(VendorProductRefCode==null)
        //        {
        //            VendorProductRefCode = "";
        //        }
        //        var procedure = "sp_ProductVendor";
        //        string[] parameter = {
        //                                "@ProductName","@ProductDesc",
        //                                "@ProductUnitofMeasurement",
        //                                "@ProductUwt",
        //                                "@PerUnitWeightUOM",
        //                                "@ProductQty", "@ProductPrice",
        //                                "@offerpr",
        //                                //"@Modified_Date", "@Modified_By",
        //                                "@ItemCode","@Vendor_Id",
        //                                "@ProductStatus",
        //                                "@ProductAvilable",
        //                                "@VendorProductRefCode"
        //                                 //"@ProductDefaultImageUrl",
        //                            };
        //        string[] values = {
        //                                ProductName,ProductDescription,
        //                                ProductUnitofMeasurement,
        //                                PerUnitWeight,
        //                                PerUnitWeightUOM,
        //                                ProductQty.ToString(),
        //                                ProductPrice.ToString(),
        //                                offerpr.ToString(),
        //                                //created_date, created_by,
        //                                ItemCode,Vendor_Id,
        //                                ProductStatus,
        //                                ProductAvilable,
        //                                VendorProductRefCode
        //                                //filePath
        //                          };
        //        _insertdata.SelectDataFromProcedure(procedure, parameter, values);
        //        if (_insertdata._dataTable.Rows.Count > 0)
        //        {
        //            return _insertdata._dataTable.Rows[0]["JsonResult"];
        //        }
        //        else
        //        {
        //            return "";
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw (ex);
        //    }
        //}

        //internal object UpdateVendor_ProductDetails(int ProductQty, double ProductPrice, /*int Id,*/ string offerpr, string ItemCode, string Vendor_Id, string ProductStatus)
        //{
        //    try
        //    {
        //        CommonModel _get = new CommonModel(_connectionString, _httpContextAccessor, _config, _env);
        //        string created_date = _get.currentDateTime(); string created_by = Vendor_Id;
        //        ConnectionModel _insertdata = new ConnectionModel(_connectionString);
        //        // var selectionType = "Insert_Product";
        //        var procedure = "sp_ProductVendorUpdate";
        //        string[] parameter = {

        //                                "@ProductQty", "@ProductPrice",
        //                                "@offerpr",
        //                                //"@Modified_Date", "@Modified_By",
        //                                "@ItemCode","@Vendor_Id",
        //                                "@ProductStatus"
        //                            };
        //        string[] values = {
        //                                ProductQty.ToString(),
        //                                ProductPrice.ToString(),
        //                                offerpr,
        //                                //created_date, created_by,
        //                                ItemCode,Vendor_Id,
        //                                ProductStatus
        //                          };
        //        _insertdata.SelectDataFromProcedure(procedure, parameter, values);
        //        if (_insertdata._dataTable.Rows.Count > 0)
        //        {
        //            return _insertdata._dataTable.Rows[0]["JsonResult"];
        //        }
        //        else
        //        {
        //            return "";
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw (ex);
        //    }
        //}
        ////internal object LoadProduct(int Id)
        //{
        //    try
        //    {
        //        ConnectionModel _selectdata = new ConnectionModel(_connectionString);
        //        var procedure = "sp_LoadProductEdit";
        //        string[] parameter = {
        //                              "@Id"
        //                              };

        //        string[] values = {
        //                             Id.ToString()

        //                            };
        //        _selectdata.SelectDataFromProcedure(procedure, parameter, values);
        //        if (_selectdata._dataTable.Rows.Count > 0)
        //        {
        //            return _selectdata._dataTable.Rows[0]["JsonResult"];
        //        }
        //        else
        //        {
        //            return "";
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }
        //}

        internal object LoadProduct(string ItemCode)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_LoadProductEdit";
                string[] parameter = {
                                      "@ItemCode"
                                      };

                string[] values = {
                                     ItemCode

                                    };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object EditVendorProduct(int Id)
        {
            try
            {
                ConnectionModel _selectdata = new ConnectionModel(_connectionString);
                var procedure = "sp_VendorProductEdit";
                string[] parameter = {
                                      "@Id"
                                      };

                string[] values = {
                                     Id.ToString()

                                    };
                _selectdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_selectdata._dataTable.Rows.Count > 0)
                {
                    return _selectdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        internal object DownloadProductDet(string Vendor_Id)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_DownloadProduct";
                string[] parameter = {
                                       "@vendor_Id"


                                    };
                string[] values = {
                                       Vendor_Id


                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }


        internal object DownloadProductDetCat(string Vendor_Id, string prCatId)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_DownloadProductCat";
                string[] parameter = {
                                       "@vendor_Id",
                                       "@prCatId"
                                    };
                string[] values = {
                                       Vendor_Id,
                                       prCatId
                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }

        internal object DownloadProductDetCatSubCat(string Vendor_Id, string prCatId, string prSubCatId)
        {
            try
            {

                ConnectionModel _insertdata = new ConnectionModel(_connectionString);
                // var selectionType = "Insert_Product";
                var procedure = "sp_DownloadProductCatSubcat";
                string[] parameter = {
                                       "@vendor_Id",
                                       "@prCatId",
                                       "@prSubCatId"

                                    };
                string[] values = {
                                       Vendor_Id,
                                       prCatId,
                                       prSubCatId

                                  };
                _insertdata.SelectDataFromProcedure(procedure, parameter, values);
                if (_insertdata._dataTable.Rows.Count > 0)
                {
                    return _insertdata._dataTable.Rows[0]["JsonResult"];
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }



        internal object UploadExcel(string Vendor_Id, string File_name)
        {


            ConnectionModel _insertdata = new ConnectionModel(_connectionString);
            // var selectionType = "Insert_Product";
            var procedure = "[webapp_InserExcelData1]";
            string[] parameter = {
                                       "@vendorid",
                                       "@json"

                                    };
            string[] values = {
                                       Vendor_Id,
                                       File_name

                                  };
            _insertdata.SelectDataFromProcedure(procedure, parameter, values);
            if (_insertdata._dataTable.Rows.Count > 0)
            {
                return _insertdata._dataTable.Rows[0]["JsonResult"];
            }
            else
            {
                return "";
            }
        }




    }
}
