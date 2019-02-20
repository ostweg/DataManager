using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataManager.Migrations
{
    public partial class inti20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "Files");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Files",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Files");

            migrationBuilder.AddColumn<string>(
                name: "FileSize",
                table: "Files",
                nullable: true);
        }
    }
}
