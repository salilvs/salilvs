#pragma checksum "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Home\Settings.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9944ab4a5e17b6665c5e548649308ea05b1d5cb0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Settings), @"mvc.1.0.view", @"/Views/Home/Settings.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9944ab4a5e17b6665c5e548649308ea05b1d5cb0", @"/Views/Home/Settings.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"90c667a08a738ef9c73eb9dda6ccf58d22deb21d", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Settings : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("timezonecurrentform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("settingLogoform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("appversionform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("appLinksform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/js/page/admin/settings.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 2 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Home\Settings.cshtml"
  
    ViewData["Title"] = "Settings";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"    <div class=""col-12"">
        <ul class=""nav nav-tabs"" id=""myTab"" role=""tablist"">
            <li class=""nav-item"">
                <a class=""nav-link active text-uppercase"" id=""Time-Currency-tab"" data-toggle=""tab"" href=""#Time-Currency"" role=""tab"" aria-controls=""Time-Currency"" aria-selected=""true"">Region & Logo</a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link text-uppercase"" id=""Mobile-App-Settings-tab"" data-toggle=""tab"" href=""#Mobile-App-Settings"" role=""tab"" aria-controls=""Mobile-App-Settings"" aria-selected=""false"">Mobile App Settings</a>
            </li>
        </ul>
        <div class=""tab-content"" id=""myTabContent"">
            <div class=""tab-pane fade show active"" id=""Time-Currency"" role=""tabpanel"" aria-labelledby=""Time&Currency-tab"">
                <div class=""row"">
                    <div class=""col-sm-12"">
                        <div class=""card"">
                            <div class=""card-header"">
                                <h5>");
            WriteLiteral("Time Zone and Currency</h5>\r\n                            </div>\r\n                            <div class=\"card-body\">\r\n                                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9944ab4a5e17b6665c5e548649308ea05b1d5cb06997", async() => {
                WriteLiteral(@"
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label for=""txttimezone"">Time Zone</label>
                                            <input type=""text"" class=""form-control thresold-i"" id=""txttimezone"" maxlength=""250"" required />
                                        </div>
                                        <div class=""form-group col-6"">
                                            <label for=""txtcurrency"">Currency</label>
                                            <input type=""text"" class=""form-control thresold-i"" id=""txtcurrency"" maxlength=""250"" required />
                                        </div>
                                    </div>
                                    <div>
                                        <button id=""btnTime_CurrencyReset"" type=""button"" class=""btn btn-danger"" data-dismiss=""modal"">Reset</button>
                                  ");
                WriteLiteral("      <button id=\"btnTime_CurrencySave\" type=\"button\" class=\"btn btn-primary\">Save</button>\r\n                                    </div>\r\n                                ");
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
                        </div>
                    </div>
                </div>
                <div class=""row"">
                    <div class=""col-sm-12"">
                        <div class=""card"">
                            <div class=""card-header"">
                                <h5>Logos</h5>
                            </div>
                            <div class=""card-body"">
                                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9944ab4a5e17b6665c5e548649308ea05b1d5cb010257", async() => {
                WriteLiteral(@"
                                    <div class=""row"">
                                        <div class=""form-group col-sm-12 col-md-6 col-lg-3"">
                                            <label>For Window Size Image</label>
                                            <input id=""settingWindowimage"" type=""file"" data-max-file-size=""5M"" data-default-file="""" data-allowed-file-extensions=""jpeg jpg png"">
                                        </div>
                                        <div class=""form-group col-sm-12 col-md-6 col-lg-3"">
                                            <label>For Mobile Size Image</label><br />
                                            <input id=""settingMobileimage"" type=""file"" data-max-file-size=""5M"" data-allowed-file-extensions=""jpeg jpg png"">
                                        </div>
                                    </div>
                                    <div>
                                        <button id=""btnsettingLogofReset"" type=""button"" cla");
                WriteLiteral("ss=\"btn btn-danger\">Reset</button>\r\n                                        <button id=\"btnsettingLogofSave\" type=\"button\" class=\"btn btn-primary\">Save</button>\r\n                                    </div>\r\n                                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
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
                        </div>
                    </div>
                </div>
            </div>

            <div class=""tab-pane fade"" id=""Mobile-App-Settings"" role=""tabpanel"" aria-labelledby=""Mobile-App-Settings-tab"">
                <div class=""row"">
                    <div class=""col-sm-12"">
                        <div class=""card"">
                            <div class=""card-header"">
                                <h5>App Versions</h5>
                            </div>
                            <div class=""card-body"">
                                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9944ab4a5e17b6665c5e548649308ea05b1d5cb013746", async() => {
                WriteLiteral(@"
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label>Andriod Customer APK Version</label>
                                            <input id=""txtAppcustomerApkversion"" type=""text"" class=""form-control"">
                                        </div>
                                        <div class=""form-group col-6"">
                                            <label>Andriod Employee APK Version</label><br />
                                            <input id=""txtAppemployeeApkversion"" type=""text"" class=""form-control"">
                                        </div>
                                    </div>
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label>IOS Customer Version</label>
                                            <input id=""txtA");
                WriteLiteral(@"ppcustomerIosversion"" type=""text"" class=""form-control"">
                                        </div>
                                        <div class=""form-group col-6"">
                                            <label>IOS Employee Version</label><br />
                                            <input id=""txtAppemployeeIosversion"" type=""text"" class=""form-control"">
                                        </div>
                                    </div>
                                    <div>
                                        <button id=""btnappversionReset"" type=""button"" class=""btn btn-danger"">Reset</button>
                                        <button id=""btnappversionSave"" type=""button"" class=""btn btn-primary"">Save</button>
                                    </div>
                                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
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
                        </div>
                    </div>
                    <div class=""col-sm-12"">
                        <div class=""card"">
                            <div class=""card-header"">
                                <h5>App Links</h5>
                            </div>
                            <div class=""card-body"">
                                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9944ab4a5e17b6665c5e548649308ea05b1d5cb017626", async() => {
                WriteLiteral(@"
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label>Link Label 1</label>
                                            <input id=""txtlinklabel1"" type=""text"" class=""form-control"">
                                        </div>
                                        <div class=""form-group col-6"">
                                            <label>Link Url 1</label><br />
                                            <input id=""txtlinkUrl1"" type=""text"" class=""form-control"">
                                        </div>
                                    </div>
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label>Link Label 2</label>
                                            <input id=""txtlinklabel2"" type=""text"" class=""form-control"">
                    ");
                WriteLiteral(@"                    </div>
                                        <div class=""form-group col-6"">
                                            <label>Link Url 2</label><br />
                                            <input id=""txtlinkUrl2"" type=""text"" class=""form-control"">
                                        </div>
                                    </div>
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label>Link Label 3</label>
                                            <input id=""txtlinklabel3"" type=""text"" class=""form-control"">
                                        </div>
                                        <div class=""form-group col-6"">
                                            <label>Link Url 3</label><br />
                                            <input id=""txtlinkUrl3"" type=""text"" class=""form-control"">
                                        </div>");
                WriteLiteral(@"
                                    </div>
                                    <div class=""row"">
                                        <div class=""form-group col-6"">
                                            <label>Link Label 4</label>
                                            <input id=""txtlinklabel4"" type=""text"" class=""form-control"">
                                        </div>
                                        <div class=""form-group col-6"">
                                            <label>Link Url 4</label><br />
                                            <input id=""txtlinkUrl4"" type=""text"" class=""form-control"">
                                        </div>
                                    </div>
                                    <div>
                                        <button id=""btnappReset"" type=""button"" class=""btn btn-danger"">Reset</button>
                                        <button id=""btnappSave"" type=""button"" class=""btn btn-primary"">Save</button>
    ");
                WriteLiteral("                                </div>\r\n                                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9944ab4a5e17b6665c5e548649308ea05b1d5cb022755", async() => {
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
