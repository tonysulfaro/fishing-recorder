using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(3)]
    public class _3_AddDateForCatch : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("FishRecord")
                .AddColumn("Date").AsDateTime().Nullable();
        }
    }
}
