#pragma checksum "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b704a635418fc323ff824a913ffd5599414b644a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__VendorDashboardLayout), @"mvc.1.0.view", @"/Views/Shared/_VendorDashboardLayout.cshtml")]
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
#line 1 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\_ViewImports.cshtml"
using bookitwebapp;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\_ViewImports.cshtml"
using bookitwebapp.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
using Microsoft.AspNetCore.Http;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b704a635418fc323ff824a913ffd5599414b644a", @"/Views/Shared/_VendorDashboardLayout.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"90c667a08a738ef9c73eb9dda6ccf58d22deb21d", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__VendorDashboardLayout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<bookitwebapp.Models.VendorDashboardModels>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/vendor/css/bootstrap.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/vendor/css/style.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/vendor/js/main.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/vendor/js/Chart.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/vendor/js/jquery-clockpicker.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/js/vendor/datatables.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b704a635418fc323ff824a913ffd5599414b644a6278", async() => {
                WriteLiteral("\r\n\r\n    <meta charset=\"utf-8\">\r\n    <title>Bookit</title>\r\n    <meta name=\"description\"");
                BeginWriteAttribute("content", " content=\"", 264, "\"", 274, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta name=\"author\" content=\"Bookit\">\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "b704a635418fc323ff824a913ffd5599414b644a6927", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "b704a635418fc323ff824a913ffd5599414b644a8106", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
    <link rel=""stylesheet"" href=""https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/3.1.3/css/bootstrap-datetimepicker.min.css  "">
    <link rel=""stylesheet"" href=""https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"">
    <link rel=""preconnect"" href=""https://fonts.gstatic.com"">
    <link href=""https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"" rel=""stylesheet"">
    <link href=""https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"" rel=""stylesheet"">



");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b704a635418fc323ff824a913ffd5599414b644a10555", async() => {
                WriteLiteral(@"
    <header>
        <!-- Fixed navbar -->
        <nav class=""navbar navbar-expand-md navbar-dark pl-70 pr-70"">
            <a class=""navbar-brand"" href=""#"">
                <img src=""/vendor/images/logo.png"" class=""img-fluid"" />
            </a>
            <button class=""navbar-toggler"" type=""button"" data-toggle=""collapse"" data-target=""#navbarCollapse"" aria-controls=""navbarCollapse"" aria-expanded=""false"" aria-label=""Toggle navigation"">
                <span class=""navbar-toggler-icon""></span>
            </button>
            <div class=""collapse navbar-collapse"" id=""navbarCollapse"">
                <ul class=""navbar-nav ml-auto"">
                    <li class=""nav-item vendor-logo""");
                BeginWriteAttribute("style", " style=\"", 1792, "\"", 1864, 4);
                WriteAttributeValue("", 1800, "background:", 1800, 11, true);
                WriteAttributeValue(" ", 1811, "url(", 1812, 5, true);
#nullable restore
#line 37 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
WriteAttributeValue("", 1816, Model.VendorDefaultBranch.Vendor_Branch_Photo, 1816, 46, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 1862, ");", 1862, 2, true);
                EndWriteAttribute();
                WriteLiteral(@">
                    </li>
                    <li class=""nav-item"">
                        <a class=""nav-link"" href=""#"">
                            <img src=""/vendor/images/notification.svg"" class=""img-fluid"" />
                        </a>
                    </li>
                    <li class=""nav-item active"">
                        <a class=""nav-link"" href=""#"">
                            <img src=""/vendor/images/gear.svg"" class=""img-fluid"" />
                        </a>
                    </li>

                </ul>
                <div class=""dropdown show"">

");
#nullable restore
#line 53 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
                     if (null != HttpContextAccessor.HttpContext.Session.GetString("User_Photo") && HttpContextAccessor.HttpContext.Session.GetString("User_Photo") != "")
                    {

#line default
#line hidden
#nullable disable
                WriteLiteral("                        <span class=\"avatar\"");
                BeginWriteAttribute("style", " style=\"", 2701, "\"", 2801, 5);
                WriteAttributeValue("", 2709, "background:", 2709, 11, true);
                WriteAttributeValue(" ", 2720, "url(", 2721, 5, true);
#nullable restore
#line 55 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
WriteAttributeValue("", 2725, HttpContextAccessor.HttpContext.Session.GetString("User_Photo"), 2725, 64, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 2789, ")", 2789, 1, true);
                WriteAttributeValue(" ", 2790, "no-repeat;", 2791, 11, true);
                EndWriteAttribute();
                WriteLiteral("></span>\r\n");
#nullable restore
#line 56 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
                    }
                    else
                    {

#line default
#line hidden
#nullable disable
                WriteLiteral("                        <span class=\"avatar\" style=\"background: url(/vendor/images/avatar.jpg) no-repeat;\"></span>\r\n");
#nullable restore
#line 60 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
                    }

#line default
#line hidden
#nullable disable
                WriteLiteral("                    <a class=\"btn dropdown-toggle\" href=\"#\" role=\"button\" id=\"dropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                        ");
#nullable restore
#line 62 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
                   Write(HttpContextAccessor.HttpContext.Session.GetString("User_Name"));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                        <span>");
#nullable restore
#line 63 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
                         Write(HttpContextAccessor.HttpContext.Session.GetString("User_Role"));

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </a>\r\n                    <div class=\"dropdown-menu  dropdown-menu-right\" aria-labelledby=\"dropdownMenuLink\">\r\n");
#nullable restore
#line 66 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
                         if (Model.vendorBranch_Lists.Count > 0)
                        {
                            foreach (var item in Model.vendorBranch_Lists)
                            {


#line default
#line hidden
#nullable disable
                WriteLiteral("                                <a class=\"dropdown-item\"");
                BeginWriteAttribute("href", " href=\"", 3767, "\"", 3829, 2);
                WriteAttributeValue("", 3774, "/VendorDashboard/Index/?branchId=", 3774, 33, true);
#nullable restore
#line 71 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
WriteAttributeValue("", 3807, item.Vendor_Branch_Id, 3807, 22, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    <div class=\"drop-logos\"");
                BeginWriteAttribute("style", " style=\"", 3892, "\"", 3952, 4);
                WriteAttributeValue("", 3900, "background:", 3900, 11, true);
                WriteAttributeValue(" ", 3911, "url(", 3912, 5, true);
#nullable restore
#line 72 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
WriteAttributeValue("", 3916, item.Vendor_Branch_Photo, 3916, 25, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 3941, ")no-repeat;", 3941, 11, true);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                </a>\r\n");
#nullable restore
#line 75 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"

                            }
                        }

#line default
#line hidden
#nullable disable
                WriteLiteral(@"
                        <div class=""dropdown-divider""></div>
                        <a class=""dropdown-item"" href=""#"">Settings & Privacy</a>
                        <a class=""dropdown-item"" href=""#"">Help</a>
                        <a class=""dropdown-item"" href=""#"">Language</a>
                        <div class=""dropdown-divider""></div>
                        <a class=""dropdown-item"" href=""/Home/Logout""><b>Sign out</b></a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div class=""container-fluid pl-70 pr-70"">

            ");
#nullable restore
#line 93 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
       Write(RenderBody());

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n\r\n        </div>\r\n    </main>\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b704a635418fc323ff824a913ffd5599414b644a18586", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b704a635418fc323ff824a913ffd5599414b644a19686", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b704a635418fc323ff824a913ffd5599414b644a20786", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b704a635418fc323ff824a913ffd5599414b644a21886", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.1/js/bootstrap-datepicker.min.js\"></script>\r\n    \r\n");
                WriteLiteral("\r\n\r\n    ");
#nullable restore
#line 113 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Shared\_VendorDashboardLayout.cshtml"
Write(RenderSection("Scripts", required: false));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public IHttpContextAccessor HttpContextAccessor { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<bookitwebapp.Models.VendorDashboardModels> Html { get; private set; }
    }
}
#pragma warning restore 1591
