namespace invoice.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editEmployee : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Employes", "Code", c => c.String());
            AddColumn("dbo.Employes", "Phone", c => c.String());
            AddColumn("dbo.Employes", "Birthdate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Employes", "Birthdate");
            DropColumn("dbo.Employes", "Phone");
            DropColumn("dbo.Employes", "Code");
        }
    }
}
