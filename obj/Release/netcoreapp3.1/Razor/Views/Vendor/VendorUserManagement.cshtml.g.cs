#pragma checksum "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Vendor\VendorUserManagement.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bfdfb20ab1c35b0aa8019d590e85e72bf19fe314"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Vendor_VendorUserManagement), @"mvc.1.0.view", @"/Views/Vendor/VendorUserManagement.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bfdfb20ab1c35b0aa8019d590e85e72bf19fe314", @"/Views/Vendor/VendorUserManagement.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"90c667a08a738ef9c73eb9dda6ccf58d22deb21d", @"/Views/_ViewImports.cshtml")]
    public class Views_Vendor_VendorUserManagement : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("vendoruserform"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/js/page/admin/dashboard/vendorUser.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "D:\Mano\Bookit_FinalV3\Bookit_Final\bookitwebapp\Views\Vendor\VendorUserManagement.cshtml"
  
    ViewData["Title"] = "VendorUserManagement";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"

    <div class=""col-12"">
        <h1>VendorUserManagement</h1>
        <div class=""top-right-button-container"">
            <button type=""button"" class=""btn btn-primary btn-lg top-right-button mr-1"" data-toggle=""modal"" data-target=""#Vendor-User-Modal"">Request New </button>
        </div>
        <div class=""separator mb-5""></div>
    </div>

    <div class=""col-12 mb-4 data-table-rows data-tables-hide-filter"">
        <table class=""table table-striped"" id=""tbl_vendoruserlist"">
            <thead>
                <tr>
                    <th>Sl.no</th>
                    <th></th>
                    <th>Name of User</th>
                    <th>Emailid</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </div>
    <div id=""Vendor-User-Modal"" class=""modal fade"" role=""dialog"">
        <div class=""modal-dialog modal-lg"" role=""document"">
            <div class=""modal-content"">
                <div");
            WriteLiteral(@" class=""modal-header"">
                    <h5 class=""modal-title"">Vendor User Management</h5>
                    <button id=""btnuserClose"" type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
                </div>

                <div class=""modal-body"">
                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bfdfb20ab1c35b0aa8019d590e85e72bf19fe3146617", async() => {
                WriteLiteral(@"

                        <div class=""row"">
                            <div class=""form-group col-4"">
                                <label for=""txtvendorusername"">Name of Vendor User</label>
                                <input type=""text"" id=""txtvendorusername"" name=""txtvendorusername"" class=""form-control thresold-i"" maxlength=""250"" required />
                            </div>
                            <div class=""form-group col-4"">
                                <label for=""txtemail"">Email</label>
                                <input type=""text"" class=""form-control thresold-i"" id=""txtemail"" maxlength=""100"" data-parsley-type=""email"" required>
                            </div>
                            <div class=""form-group col-4"">
                                <label for=""txtphone"">Phone</label>
                                <div class=""input-group mb-3"">
                                    <div class=""input-group-prepend"">
                                        <span clas");
                WriteLiteral(@"s=""input-group-text"" id=""txtphonecode"">+91</span>
                                    </div>
                                    <input type=""text"" class=""form-control thresold-i mob_no"" data-mask=""9999-999-999"" id=""txtphone"" data-parsley-type=""digits"" maxlength=""10"" required>
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""form-group col-4"">
                                <label for=""txtvendoruserpassword"">Vendor User password</label>
                                <input class=""form-control""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3236, "\"", 3250, 0);
                EndWriteAttribute();
                WriteLiteral(@" type=""password"" id=""txtpassword"" required />
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""form-group col-3"">
                                <div class=""checkbox checkbox-primary d-inline"">
                                    <input type=""checkbox"" name=""chkapproveaccess"" id=""chkapproveaccess"" value=""Yes"">
                                    <label for=""chkapproveaccess"">Approve Appoinments </label>
                                </div>
                            </div>
                            <div class=""form-group col-3"">
                                <div>
                                    <input type=""checkbox"" name=""chkrescheduleaccess"" id=""chkrescheduleaccess"" value=""Yes"">
                                    <label for=""chkrescheduleaccess"">Reschedule </label>
                                </div>
                            </div>
                            <div class=""for");
                WriteLiteral(@"m-group col-2"">
                                <div>
                                    <input type=""checkbox"" name=""chkholdaccess"" id=""chkholdaccess"" value=""Yes"">
                                    <label for=""chkholdaccess"">Hold </label>
                                </div>
                            </div>
                            <div class=""form-group col-2"">
                                <div>
                                    <input type=""checkbox"" name=""chkcancelaccess"" id=""chkcancelaccess"" value=""Yes"">
                                    <label for=""chkcancelaccess"">Cancel</label>
                                </div>
                            </div>
                            <div class=""form-group col-2"">
                                <div>
                                    <input type=""checkbox"" name=""chkcompleteaccess"" id=""chkcompleteaccess"" value=""Yes"">
                                    <label for=""chkcompleteaccess"">Complete</label>
                       ");
                WriteLiteral(@"         </div>
                            </div>
                        </div>
                        <div class=""row"">
                                <div class=""form-group col-7"">
                                    <label for=""ddlvendorbranch"">Select Branch</label>
                                    <select id=""ddlvendorbranch"" class=""form-control"" multiple=""multiple"" required>
                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bfdfb20ab1c35b0aa8019d590e85e72bf19fe31411446", async() => {
                    WriteLiteral(" Select Branch");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>

                            </div>

                        <div class=""row"">
                            <div class=""form-group col-12"">
                                <div id=""dvvendorbranch""></div>
");
                WriteLiteral(@"                            </div>
                        </div>

                        <div class=""row"">
                            <div class=""form-group col-12"">
                                <div id=""dvemployee""></div>

                            </div>
                        </div>



                    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
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
                WriteLiteral("\r\n        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bfdfb20ab1c35b0aa8019d590e85e72bf19fe31415199", async() => {
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
            }
            );
            WriteLiteral("\r\n");
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
