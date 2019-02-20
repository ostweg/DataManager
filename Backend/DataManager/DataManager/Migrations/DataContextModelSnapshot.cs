﻿// <auto-generated />
using System;
using DataManager.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataManager.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<int>("LastModified");

                    b.Property<DateTime>("LastModifiedDate");

                    b.Property<long?>("PersonId");

                    b.Property<int>("Size");

                    b.Property<string>("WebKitRelativePath");

                    b.HasKey("FileId");

                    b.HasIndex("PersonId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("DataManager.Models.Person", b =>
                {
                    b.Property<long>("PersonId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("OrganisationName");

                    b.Property<string>("Password");

                    b.Property<string>("Rights");

                    b.Property<string>("Token");

                    b.Property<string>("Username");

                    b.HasKey("PersonId");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("DataManager.Models.File", b =>
                {
                    b.HasOne("DataManager.Models.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId");
                });
#pragma warning restore 612, 618
        }
    }
}
