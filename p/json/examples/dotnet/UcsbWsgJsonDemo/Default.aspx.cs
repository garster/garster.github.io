using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.UI;

namespace UcsbWsgJsonDemo
{
  #region Classes

  // Person Class
  public class Person
  {
    public string Name { get; set; }

    public int Age { get; set; }

    public bool Active { get; set; }

    public Address Address { get; set; }

    public List<string> FavoriteDeserts { get; set; }

    public string Generator { get; set; }
  }

  // Address Class
  public class Address
  {
    public string Street { get; set; }

    public string City { get; set; }

    public string State { get; set; }
  }

  #endregion Classes

  #region Web Stuff

  public partial class Default : Page
  {
    private static string Json()
    {
      // Create an Address Object and populate.
      var myAddress = new Address()
      {
        //Street = "123 State St",
        City = "Santa Barbara",
        State = "CA"
      };

      // Create an Person object and populate.
      var myPerson = new Person()
      {
        Name = "Leroy",
        Age = 25,
        Active = true,
        Address = myAddress,
        FavoriteDeserts = new List<string>()
        { 
          "Mint Ice Cream",
          "Cheesecake",
          "Lemon Cake",
          "Shortbread Cookies"
        }
      };

      myPerson.Generator = "ASP.NET " + Environment.Version.ToString();

      // JSON it!
      return JsonConvert.SerializeObject(myPerson);
    }

    #region BehindTheScenes

    protected void Page_Load(object sender, EventArgs e)
    {
      Response.Clear();
      Response.ContentType = "application/json; charset=utf-8";
      Response.Write(Json());
      Response.End();
    }

    #endregion BehindTheScenes
  }

  #endregion Web Stuff
}