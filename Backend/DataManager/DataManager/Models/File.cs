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
        public string FileName { get; set; }
        public string FileSize {get;set;}
        public Person Person {get;set;}

    }
}