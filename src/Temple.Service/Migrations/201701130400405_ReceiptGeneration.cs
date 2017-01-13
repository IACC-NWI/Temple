namespace Temple.Service.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ReceiptGeneration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Festivals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PerformedServices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        MemberId = c.String(maxLength: 10),
                        AmountDonated = c.Decimal(nullable: false, precision: 14, scale: 2),
                        SuggestedAmountForService = c.Decimal(nullable: false, precision: 14, scale: 2),
                        PerformedForFirstName = c.String(maxLength: 50),
                        PerformedForLastName = c.String(maxLength: 50),
                        ServiceType = c.String(maxLength: 20),
                        ServiceName = c.String(maxLength: 500),
                        Festival = c.String(maxLength: 100),
                        Priest = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Members", t => t.MemberId)
                .Index(t => t.MemberId);
            
            CreateTable(
                "dbo.Services",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 500),
                        TypeOfService = c.String(maxLength: 20),
                        SuggestedDonation = c.Decimal(nullable: false, precision: 14, scale: 2),
                        Description = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Members", "Email", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PerformedServices", "MemberId", "dbo.Members");
            DropIndex("dbo.PerformedServices", new[] { "MemberId" });
            DropColumn("dbo.Members", "Email");
            DropTable("dbo.Services");
            DropTable("dbo.PerformedServices");
            DropTable("dbo.Festivals");
        }
    }
}
