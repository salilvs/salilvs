#pragma checksum "G:\projects\Bookit_Final\Bookit_Final - Copy\bookitwebapp\Views\Home\Products.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "44d00aa3703e6ada3354efc2b79c86d62bab794b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Products), @"mvc.1.0.view", @"/Views/Home/Products.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "G:\projects\Bookit_Final\Bookit_Final - Copy\bookitwebapp\Views\_ViewImports.cshtml"
using bookitwebapp;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "G:\projects\Bookit_Final\Bookit_Final - Copy\bookitwebapp\Views\_ViewImports.cshtml"
using bookitwebapp.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"44d00aa3703e6ada3354efc2b79c86d62bab794b", @"/Views/Home/Products.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"90c667a08a738ef9c73eb9dda6ccf58d22deb21d", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Products : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("productform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/js/page/vendor/vendorproductmanagement.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "G:\projects\Bookit_Final\Bookit_Final - Copy\bookitwebapp\Views\Home\Products.cshtml"
  
    ViewData["Title"] = "Products";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"col-12\">\r\n    <h1>PRODUCT MANAGEMENT</h1>\r\n    <div class=\"top-right-button-container\">\r\n");
            WriteLiteral(@"    </div>
    <div class=""separator mb-5""></div>
</div>

<div class=""col-12 mb-4 data-table-rows data-tables-hide-filter"">
    <table id=""tbl_productlist"" class=""data-table responsive nowrap"">
        <thead>
            <tr>
                <th>Sl.no</th>
                <th></th>
                <th>Product Name</th>
                <th>Product Quantity</th>
                <th>Product Price</th>
               
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

<div id=""Product-Modal"" class=""modal fade"" role=""dialog"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""modal-title"">Product Details Form</h5>
                <button id=""btnClose"" type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""mo");
            WriteLiteral("dal-body\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "44d00aa3703e6ada3354efc2b79c86d62bab794b5985", async() => {
                WriteLiteral(@"


                    <div class=""row"">
                        <div class=""col-6"">
                            <label>Product Photo</label>
                            <div id=""profile-container"" class=""profile-container"">
                                <img id=""image1"" src=""../assets/img/bookit/no-image-found-360x250.png"" class=""viewphoto img-responsive"" />
                            </div>
                            <input id=""photo1"" type=""file"" class=""hidephoto"" name=""photo1"" placeholder=""Photo"" data-parsley-filemaxmegabytes=""0.5"" data-parsley-trigger=""change"" data-parsley-filemimetypes=""image/jpg,image/jpeg,image/png"" required>
                            <br />
                            <input id=""txtphoto1"" type=""hidden"" hidden>
                                    </div>
                    </div>
                    <div class=""row"">

                        <div class=""form-group col-4"">
                            <label for=""txtname"">Product Name</label>
                   ");
                WriteLiteral(@"         <input type=""text"" class=""form-control thresold-i"" id=""txtname"" maxlength=""500"" required>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""form-group col-12"">
                            <label for=""txtdescription"">Product Description</label>
                            <textarea type=""text"" class=""form-control thresold-i"" id=""txtdescription"" maxlength=""1500"" required></textarea>
                        </div>
                    </div>
                    <div class=""row"">
                        
                        <div class=""form-group col-4"">
                            <label for=""txtunitwt"">Per Unit Weight</label>
                            <input type=""text"" class=""form-control thresold-i"" id=""txtunitwt"" maxlength=""500"" required>
                        </div>
                        
                    </div>
                    <div class=""row"">
                        <div class=""for");
                WriteLiteral(@"m-group col-4"">
                            <label for=""txtproductqty"">Product Quantity</label>
                            <input type=""text"" class=""form-control"" id=""txtproductqty"" required>
                        </div>
                        <div class=""form-group col-4"">
                            <label for=""txtproductprice"">Product Unit Price</label>
                            <input type=""text"" class=""form-control thresold-i"" id=""txtproductprice"" required>
                        </div>
                        <div class=""form-group col-4"">
                            <label for=""txtofferprice"">Offer Price</label>
                            <input type=""text"" class=""form-control thresold-i"" id=""txtofferprice"" maxlength=""500"">
                        </div>
                    </div>
                  
                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
            <div class=""modal-footer"">
                <button id=""btnReset"" type=""button"" class=""btn btn-danger"" data-dismiss=""modal"">Close</button>
                <button id=""btnUpdate"" type=""button"" class=""btn btn-warning"">Update changes</button>
                <button id=""btnSave"" type=""button"" class=""btn btn-primary"">Save changes</button>
            </div>
        </div>
    </div>
</div>
");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "44d00aa3703e6ada3354efc2b79c86d62bab794b11129", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
