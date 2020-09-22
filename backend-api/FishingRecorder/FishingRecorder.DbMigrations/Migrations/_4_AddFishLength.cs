using FluentMigrator;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(4)]
    public class _4_AddFishLength : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("FishRecord")
                .AddColumn("LengthInches").AsInt32().Nullable();
        }
    }
}
