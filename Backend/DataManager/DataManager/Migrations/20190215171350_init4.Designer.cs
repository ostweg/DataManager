﻿// <auto-generated />
using DataManager.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataManager.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190215171350_init4")]
    partial class init4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("DataManager.Models.Person", b =>
                {
                    b.Property<int>("PersonId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("Rights");

                    b.Property<string>("Token");

                    b.Property<string>("Username");

                    b.HasKey("PersonId");

                    b.ToTable("Persons");
                });
#pragma warning restore 612, 618
        }
    }
}