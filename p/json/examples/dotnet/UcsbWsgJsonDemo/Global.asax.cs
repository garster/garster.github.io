using System;
using System.Web;

namespace UcsbWsgJsonDemo
{
  public class Global : HttpApplication
  {
    private void Application_Start(object sender, EventArgs e)
    {
      // Code that runs on application startup
    }

    private void Application_End(object sender, EventArgs e)
    {
      //  Code that runs on application shutdown
    }

    private void Application_Error(object sender, EventArgs e)
    {
      // Code that runs when an unhandled error occurs
    }
  }
}
