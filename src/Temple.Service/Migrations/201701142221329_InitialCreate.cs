namespace Temple.Service.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
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
                "dbo.Members",
                c => new
                    {
                        MemberId = c.String(nullable: false, maxLength: 10),
                        Email = c.String(maxLength: 100),
                        FirstName = c.String(maxLength: 50),
                        LastName = c.String(maxLength: 50),
                        AddressLine1 = c.String(maxLength: 50),
                        AddressLine2 = c.String(maxLength: 50),
                        City = c.String(maxLength: 20),
                        State = c.String(maxLength: 2),
                        Zip = c.String(maxLength: 5),
                        FamilySize = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MemberId);
            
            CreateTable(
                "dbo.PerformedServices",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ExpectedDateOfOffering = c.DateTime(nullable: false, storeType: "date"),
                        MemberId = c.String(maxLength: 10),
                        AmountDonated = c.Decimal(nullable: false, precision: 14, scale: 2),
                        SuggestedAmountForService = c.Decimal(nullable: false, precision: 14, scale: 2),
                        PerformedForFirstName = c.String(maxLength: 50),
                        PerformedForLastName = c.String(maxLength: 50),
                        ServiceType = c.String(maxLength: 20),
                        ServiceName = c.String(maxLength: 500),
                        Festival = c.String(maxLength: 100),
                        Priest = c.String(),
                        CreationDate = c.DateTime(nullable: false),
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PerformedServices", "MemberId", "dbo.Members");
            DropIndex("dbo.PerformedServices", new[] { "MemberId" });
            DropTable("dbo.Services");
            DropTable("dbo.PerformedServices");
            DropTable("dbo.Members");
            DropTable("dbo.Festivals");
        }
    }
}
