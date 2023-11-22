namespace invoice.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addingTaxAndDiscount : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.InvoiceDetails", "Tax", c => c.Int(nullable: false));
            AddColumn("dbo.InvoiceDetails", "Discount", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.InvoiceDetails", "Discount");
            DropColumn("dbo.InvoiceDetails", "Tax");
        }
    }
}
