using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(2)]
    public class _2_AddFish: AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("FishType")
                .WithColumn("FishTypeID").AsInt32().PrimaryKey().Identity()
                .WithColumn("Type").AsString();

            Create.Table("FishRecord")
                .WithColumn("FishRecordID").AsInt32().PrimaryKey().Identity()
                .WithColumn("UserID").AsInt32().ForeignKey("User", "UserID")
                .WithColumn("FishTypeID").AsInt32().ForeignKey("FishType", "FishTypeID")
                .WithColumn("Lat").AsDouble()
                .WithColumn("Lon").AsDouble();
        }
    }
}
