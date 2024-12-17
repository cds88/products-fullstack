using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;


public class OnStartupHostedService : IHostedService
{
    private readonly ILogger<OnStartupHostedService> _logger;
    private Timer? _timer;

    public OnStartupHostedService(ILogger<OnStartupHostedService> logger)
    {
        _logger = logger;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        // This will run each time the application is started.
        // When running `dotnet watch run`, this means every time you save a file and it re-compiles,
        // the application restarts and this code runs again.
        
        _logger.LogInformation("OnStartupHostedServicqweqwee started at: {time}", DateTimeOffset.Now);
        
        // If you need some recurring action, you could set up a timer here.
        // For simplicity, we're just logging once on startup.
        
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        // Clean-up logic when the app is stopping
        _logger.LogInformation("OnStartupHostedService is stopping at: {time}", DateTimeOffset.Now);
        
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }
}
