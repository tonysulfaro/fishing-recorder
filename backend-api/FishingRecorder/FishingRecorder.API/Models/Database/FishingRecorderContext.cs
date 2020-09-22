using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FishingRecorder.API.Models.Database
{
    public partial class FishingRecorderContext : DbContext
    {
        public FishingRecorderContext()
        {
        }

        public FishingRecorderContext(DbContextOptions<FishingRecorderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FishRecord> FishRecord { get; set; }
        public virtual DbSet<FishType> FishType { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<VersionInfo> VersionInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("User ID=sample_user;Password=test;Host=64.227.86.20;Port=5432;Database=FishingRecorder;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FishRecord>(entity =>
            {
                entity.Property(e => e.FishRecordId).HasColumnName("FishRecordID");

                entity.Property(e => e.FishTypeId).HasColumnName("FishTypeID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.FishType)
                    .WithMany(p => p.FishRecord)
                    .HasForeignKey(d => d.FishTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FishRecord_FishTypeID_FishType_FishTypeID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.FishRecord)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FishRecord_UserID_User_UserID");
            });

            modelBuilder.Entity<FishType>(entity =>
            {
                entity.Property(e => e.FishTypeId).HasColumnName("FishTypeID");

                entity.Property(e => e.Type).IsRequired();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Auth0Id)
                    .IsRequired()
                    .HasColumnName("Auth0ID");
            });

            modelBuilder.Entity<VersionInfo>(entity =>
            {
                entity.HasNoKey();

                entity.HasIndex(e => e.Version)
                    .HasName("UC_Version")
                    .IsUnique();

                entity.Property(e => e.Description).HasMaxLength(1024);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
