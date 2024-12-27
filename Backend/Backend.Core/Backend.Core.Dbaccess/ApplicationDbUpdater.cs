using Microsoft.EntityFrameworkCore;   
using Microsoft.Extensions.Logging;

namespace Backend.Core.Dbaccess
{
    public class ApplicationDbUpdater
    {
        private readonly ILogger<ApplicationDbUpdater> _logger;
        private readonly ApplicationDbContext _dbContext;

        public ApplicationDbUpdater(
            ApplicationDbContext dbContext,
            ILogger<ApplicationDbUpdater> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task UpdateDatabaseAsync()
        {
            try
            {
                _logger.LogInformation("Starting database migration...");
                await _dbContext.Database.MigrateAsync();
                _logger.LogInformation("Database migration completed successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while running database migrations.");
                throw;  
            }
        }
    }
}
