using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Solidinfo.DisplayBoard.Web.Startup))]
namespace Solidinfo.DisplayBoard.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
