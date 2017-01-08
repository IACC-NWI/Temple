using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Topshelf;

namespace Temple.Service
{
    class Program
    {
        static void Main(string[] args)
        {
            HostFactory.Run(x =>
            {
                x.UseLog4Net("logging.config");
                x.Service<TempleServiceRunnable>(s =>
                {
                    s.ConstructUsing(name => new TempleServiceRunnable());
                    s.WhenStarted(t => t.Start());
                    s.WhenStopped(t => t.Stop());
                });
                x.SetDisplayName("Temple Service");
                x.RunAsLocalService();
            });
            
        }
    }
}
