namespace Temple.Service.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Members",
                c => new
                    {
                        MemberId = c.String(nullable: false, maxLength: 10),
                        FirstName = c.String(maxLength: 50),
                        LastName = c.String(maxLength: 50),
                        AdressLine1 = c.String(maxLength: 50),
                        AddressLine2 = c.String(maxLength: 50),
                        City = c.String(maxLength: 20),
                        State = c.String(maxLength: 2),
                        Zip = c.String(maxLength: 5),
                    })
                .PrimaryKey(t => t.MemberId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Members");
        }
    }
}
