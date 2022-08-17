namespace invoice.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Invoices", "Employe_Id", "dbo.Employes");
            DropIndex("dbo.Invoices", new[] { "Employe_Id" });
            RenameColumn(table: "dbo.Invoices", name: "Employe_Id", newName: "EmployeId");
            AlterColumn("dbo.Invoices", "EmployeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Invoices", "EmployeId");
            AddForeignKey("dbo.Invoices", "EmployeId", "dbo.Employes", "Id", cascadeDelete: true);
            DropColumn("dbo.Invoices", "EmployeeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Invoices", "EmployeeId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Invoices", "EmployeId", "dbo.Employes");
            DropIndex("dbo.Invoices", new[] { "EmployeId" });
            AlterColumn("dbo.Invoices", "EmployeId", c => c.Int());
            RenameColumn(table: "dbo.Invoices", name: "EmployeId", newName: "Employe_Id");
            CreateIndex("dbo.Invoices", "Employe_Id");
            AddForeignKey("dbo.Invoices", "Employe_Id", "dbo.Employes", "Id");
        }
    }
}
