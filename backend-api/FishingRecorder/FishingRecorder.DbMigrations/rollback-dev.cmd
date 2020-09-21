dotnet build -c Release

dotnet fm rollback -p postgres -c "User ID=postgres;Password=Perkynips23;Host=64.227.86.20;Port=5432;Database=FishingRecorder;" -a ".\bin\Release\netcoreapp3.1\FishingRecorder.DbMigrations.dll"