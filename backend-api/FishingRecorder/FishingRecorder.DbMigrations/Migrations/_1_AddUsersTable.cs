using FluentMigrator;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(1)]
    public class _1_AddUsersTable: AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("User")
                .WithColumn("UserID").AsInt32().PrimaryKey().Identity()
                .WithColumn("Auth0ID").AsString();
        }
    }
}