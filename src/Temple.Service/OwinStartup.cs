using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http.Formatting;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using IdentityServer3.AccessTokenValidation;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Newtonsoft.Json;
using Owin;
using WindsorWebApiDependency;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;

namespace Temple.Service
{
    public class OwinStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            var config = new HttpConfiguration();
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            config.DependencyResolver = new WindsorDependencyResolver(TempleServiceRunnable.Container);
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            app.UseWebApi(config);
            
            app.Use(async (context, next) =>
            {
                if (!context.Request.Path.Value.Contains(".")
                    && !context.Request.Path.Value.Contains("api"))
                {
                    context.Request.Path = new PathString("/index.html");
                }
                await next();
            });

            app.UseFileServer(new FileServerOptions
            {
                FileSystem = new EmbeddedResourceFileSystem(GetType().Assembly, "Temple.Service.Build"),
                EnableDirectoryBrowsing = false,
                EnableDefaultFiles = true,
                RequestPath = new PathString("")
            });
            var requiredScopes = ConfigurationManager.AppSettings["RequiredScopes"];
            var scopes = requiredScopes.Contains(",")
                ? requiredScopes.Split(new[] {','}).ToList()
                : new List<string> {requiredScopes};
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = ConfigurationManager.AppSettings["IdentityUrl"],
                RequiredScopes = scopes
            });

            

        }
    }
}
