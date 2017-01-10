namespace Temple.Service.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Members", "AddressLine1", c => c.String(maxLength: 50));
            DropColumn("dbo.Members", "AdressLine1");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Members", "AdressLine1", c => c.String(maxLength: 50));
            DropColumn("dbo.Members", "AddressLine1");
        }
    }
}
