using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataManager.Migrations
{
    public partial class inti18 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FileId",
                table: "Persons",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    FileId = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    FileSize = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.FileId);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Files_FileId",
                table: "Persons");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Persons_FileId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Persons");
        }
    }
}
