using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataManager.Models
{
    public class File
    {
        public long FileId { get; set; }
        public string FilePath { get; set; }
        public string PersonId { get; set; }
        public Person Person {get;set;}

    }
}