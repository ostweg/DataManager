using Microsoft.EntityFrameworkCore.Migrations;

namespace DataManager.Migrations
{
    public partial class init19 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Persons_PersonId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_PersonId",
                table: "Files");

            migrationBuilder.AlterColumn<string>(
                name: "PersonId",
                table: "Files",
                nullable: true,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PersonId1",
                table: "Files",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Files_PersonId1",
                table: "Files",
                column: "PersonId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Persons_PersonId1",
                table: "Files",
                column: "PersonId1",
                principalTable: "Persons",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Persons_PersonId1",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_PersonId1",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "PersonId1",
                table: "Files");

            migrationBuilder.AlterColumn<long>(
                name: "PersonId",
                table: "Files",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

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
    }
}
