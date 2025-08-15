using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartTaskManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class configUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "UserTasks");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_UserId",
                table: "UserTasks",
                newName: "IX_UserTasks_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTasks",
                table: "UserTasks",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTasks",
                table: "UserTasks");

            migrationBuilder.RenameTable(
                name: "UserTasks",
                newName: "Tasks");

            migrationBuilder.RenameIndex(
                name: "IX_UserTasks_UserId",
                table: "Tasks",
                newName: "IX_Tasks_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                column: "Id");
        }
    }
}
