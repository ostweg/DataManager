using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataManager.Models
{
    public class Admin : Person
    {
        public string BackupEmail { get; set; }
    }
}