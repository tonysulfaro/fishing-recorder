using FluentMigrator;

namespace FishingRecorder.DbMigrations.Migrations
{
    public class _1_AddUsersTable: AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("Users")
                .WithColumn("UserID").AsInt32().PrimaryKey().Identity()
                .WithColumn("Email").AsString()
                .WithColumn("Hash").AsString()
                .WithColumn("Salt").AsString()
                .WithColumn("RefreshToken").AsString();
        }
    }
}