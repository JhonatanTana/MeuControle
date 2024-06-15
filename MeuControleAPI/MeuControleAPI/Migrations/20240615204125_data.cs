using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeuControleAPI.Migrations {
    /// <inheritdoc />
    public partial class data : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "Data",
                table: "Pedido",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Data",
                table: "Pedido",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }
    }
}
