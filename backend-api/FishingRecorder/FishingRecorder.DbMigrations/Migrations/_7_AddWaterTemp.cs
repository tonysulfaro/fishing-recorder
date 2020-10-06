using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(7)]
    public class _7_AddWaterTemp: AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("FishRecord")
                .AddColumn("WaterTemp").AsInt32().Nullable();
        }
    }
}
