using Microsoft.EntityFrameworkCore.Migrations;

namespace DataManager.Migrations
{
    public partial class inti17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Files_FileId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_FileId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Persons");

            migrationBuilder.AddColumn<long>(
                name: "PersonId",
                table: "Files",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Files_PersonId",
                table: "Files",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Persons_PersonId",
                table: "Files",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Persons_PersonId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_PersonId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "Files");

            migrationBuilder.AddColumn<long>(
                name: "FileId",
                table: "Persons",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Persons_FileId",
                table: "Persons",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Files_FileId",
                table: "Persons",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "FileId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
