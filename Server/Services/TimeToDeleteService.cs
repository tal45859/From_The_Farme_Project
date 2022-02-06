using FromTheFarmer.Data;
using FromTheFarmer.Data.Entities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class TimeToDeleteService : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory scopeFactory;
        private int executionCount = 0;
        private readonly ILogger<TimeToDeleteService> _logger;
        private Timer _timer = null!;

        public TimeToDeleteService(ILogger<TimeToDeleteService> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            this.scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromDays(1));//פעם ביום

            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            var count = Interlocked.Increment(ref executionCount);
            using (var scope = scopeFactory.CreateScope())
            {
                var mdb = scope.ServiceProvider.GetRequiredService<FromTheFarmerDBContext>();
                List<Post> Lpost = mdb.Post.Where(p => p.CreatedAt <= DateTime.Now.AddDays(-21)).ToList();
                List<Product> Lproduct = new List<Product>();
                for (int i=0;i<Lpost.Count;i++)
                {
                    Lproduct.Add(mdb.Product.Where(p => p.Id == Lpost[i].ProductId).FirstOrDefault());
                }
                for (int i = 0; i < Lproduct.Count; i++)
                {
                    mdb.Product.Remove(Lproduct[i]);
                    int c = mdb.SaveChanges();
                    if (c == 0)
                    {
                        _logger.LogInformation("לא נמחק");
                    }
                }
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
