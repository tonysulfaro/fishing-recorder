dotnet build -c Release

dotnet fm migrate -p postgres -c "User ID=sample_user;Password=test;Host=64.227.86.20;Port=5432;Database=FishingRecorder;" -a ".\bin\Release\netcoreapp3.1\FishingRecorder.DbMigrations.dll"