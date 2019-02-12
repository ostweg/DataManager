using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace DataManager.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Rights> Rights { get; set; }
        public DbSet<User> Users { get; set; }
    }
}