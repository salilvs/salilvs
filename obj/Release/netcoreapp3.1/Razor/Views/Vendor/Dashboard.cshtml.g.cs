#pragma checksum "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Vendor\Dashboard.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d5a7207575be8c0b6d6f83769560f96f6e54c213"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Vendor_Dashboard), @"mvc.1.0.view", @"/Views/Vendor/Dashboard.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d5a7207575be8c0b6d6f83769560f96f6e54c213", @"/Views/Vendor/Dashboard.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"90c667a08a738ef9c73eb9dda6ccf58d22deb21d", @"/Views/_ViewImports.cshtml")]
    public class Views_Vendor_Dashboard : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets//js/page/admin/dashboard.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Vendor\Dashboard.cshtml"
  
    ViewData["Title"] = "Dashboard";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("<div class=\"col-12\">\r\n    <h1>");
#nullable restore
#line 6 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Vendor\Dashboard.cshtml"
   Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</h1>
    <div class=""separator mb-5""></div>
</div>
<div class=""col-lg-12 col-xl-6"">
    <div class=""icon-cards-row"">
        <div class=""glide dashboard-numbers"">
            <div class=""glide__track"" data-glide-el=""track"">
                <ul class=""glide__slides"">
                    <li class=""glide__slide"">
                        <a href=""/Vendor/VendorBookingList"" class=""card"">
                            <div class=""card-body text-center"">
                                <i class=""iconsminds-clock""></i>
                                <p class=""card-text mb-0"">Total Bookings</p>
                                <p id=""txttotalbooking"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                    <li class=""glide__slide"">
                        <a href=""/Vendor/VendorBookingConfirmed"" class=""card"">
                            <div class=""card-body text-center"">
                                <i class=""ic");
            WriteLiteral(@"onsminds-basket-coins""></i>
                                <p class=""card-text mb-0"">Booking Confirmed</p>
                                <p id=""txtbookingconfirmed"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                    <li class=""glide__slide"">
                        <a href=""/Vendor/vendorBookingApproved"" class=""card"">
                            <div class=""card-body text-center"">
                                <i class=""iconsminds-arrow-refresh""></i>
                                <p class=""card-text mb-0"">Booking Approved</p>
                                <p id=""txtbookingapproved"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                    <li class=""glide__slide"">
                        <a href=""/Vendor/vendorBookingCompleted"" class=""card"">
                            <div class=""card-body text-center"">
        ");
            WriteLiteral(@"                        <i class=""iconsminds-mail-read""></i>
                                <p class=""card-text mb-0"">Booking Completed</p>
                                <p id=""txtbookingcompleted"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                    <li class=""glide__slide"">
                        <a href=""/Vendor/vendorBookingCancelled"" class=""card"">
                            <div class=""card-body text-center"">
                                <i class=""iconsminds-mail-read""></i>
                                <p class=""card-text mb-0"">Cancelled Bookings</p>
                                <p id=""txtbookingcancelled"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                    <li class=""glide__slide"">
                        <a href=""#"" class=""card"">
                            <div class=""card-body text-center"">
    ");
            WriteLiteral(@"                            <i class=""iconsminds-mail-read""></i>
                                <p class=""card-text mb-0"">Missed Bookings</p>
                                <p id=""txtbookingmissed"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                    <li class=""glide__slide"">
                        <a href=""#"" class=""card"">
                            <div class=""card-body text-center"">
                                <i class=""iconsminds-mail-read""></i>
                                <p class=""card-text mb-0"">Total Packages</p>
                                <p id=""txtpackages"" class=""lead text-center"">0</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
");
            WriteLiteral(@"</div>
<div class=""col-xl-6 col-lg-12 mb-4"">
    <div class=""card"">
        <div class=""position-absolute card-top-buttons""><button class=""btn btn-header-light icon-button""><i class=""simple-icon-refresh""></i></button></div>
        <div class=""card-body"">
            <h5 class=""card-title"">Recent Appointments</h5>
            <div class=""scroll dashboard-list-with-thumbs"">
                <div id=""recentBookings"">

                </div>
            </div>
        </div>
    </div>
</div>
");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "d5a7207575be8c0b6d6f83769560f96f6e54c2138815", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
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