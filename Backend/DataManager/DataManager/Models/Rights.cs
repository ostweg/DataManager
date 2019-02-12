using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataManager.Models
{
    public class Rights
    {
        public long RightsId { get; set; }
        public string RightsStatus { get; set; }

        public ICollection<Person> Persons { get; set; }
        
    }
}