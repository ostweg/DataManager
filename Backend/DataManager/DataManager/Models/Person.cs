using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataManager.Models
{
    public class Person
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Rights {get;set;}
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token {get;set;}

    }
}