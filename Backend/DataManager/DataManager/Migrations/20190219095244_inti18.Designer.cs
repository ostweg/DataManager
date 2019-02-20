﻿// <auto-generated />
using System;
using DataManager.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataManager.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190219095244_inti18")]
    partial class inti18
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("DataManager.Models.File", b =>
                {
                    b.Property<long>("FileId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FileName");

                    b.Property<string>("FileSize");

                    b.HasKey("FileId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("DataManager.Models.Person", b =>
                {
                    b.Property<long>("PersonId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<long?>("FileId");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("OrganisationName");

                    b.Property<string>("Password");

                    b.Property<string>("Rights");

                    b.Property<string>("Token");

                    b.Property<string>("Username");

                    b.HasKey("PersonId");

                    b.HasIndex("FileId");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("DataManager.Models.Person", b =>
                {
                    b.HasOne("DataManager.Models.File", "File")
                        .WithMany()
                        .HasForeignKey("FileId");
                });
#pragma warning restore 612, 618
        }
    }
}