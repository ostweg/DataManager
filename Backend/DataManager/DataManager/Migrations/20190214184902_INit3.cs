using Microsoft.EntityFrameworkCore.Migrations;

namespace DataManager.Migrations
{
    public partial class INit3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Passowrd",
                table: "Persons",
                newName: "Password");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Persons",
                newName: "Passowrd");
        }
    }
}
