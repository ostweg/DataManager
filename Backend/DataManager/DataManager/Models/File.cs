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
        public int LastModified {get;set;}
        public DateTime LastModifiedDate {get;set;}
        public string WebKitRelativePath {get;set;}
        public int Size {get;set;}
        public Person Person {get;set;}

    }
}