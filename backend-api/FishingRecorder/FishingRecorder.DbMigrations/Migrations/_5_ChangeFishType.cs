using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(5)]
    public class _5_ChangeFishType: Migration
    {
        public override void Up()
        {
            Delete.Column("FishTypeID").FromTable("FishRecord");

            Alter.Table("FishRecord")
                .AddColumn("FishType").AsString().Nullable();
        }

        public override void Down()
        {
            throw new NotImplementedException();
        }
    }
}
