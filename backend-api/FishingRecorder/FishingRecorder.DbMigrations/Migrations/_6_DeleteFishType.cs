using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Text;

namespace FishingRecorder.DbMigrations.Migrations
{
    [Migration(6)]
    public class _6_DeleteFishType: Migration
    {
        public override void Up()
        {
            Delete.Table("FishType");
        }

        public override void Down()
        {
            throw new NotImplementedException();
        }
    }
}
