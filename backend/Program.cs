using System.Text.Json;
using Live.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options=> options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHttpClient();

builder.Services.AddCors(options=>{
    options.AddDefaultPolicy(builder=>{
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

//builder.WebHost.UseUrls("http//0.0.0.0:5013");
builder.Services.AddHostedService<OnStartupHostedService>();

var app = builder.Build();


// var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
// lifetime.ApplicationStarted.Register(()=>{

//     using var scope = app.Services.CreateScope();
//     var httpClientFactory = scope.ServiceProvider.GetRequiredService<IHttpClientFactory>();
//     var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
//     var client = httpClientFactory.CreateClient();
//     Console.WriteLine($"client is ");
// });

 

// using (var scope = app.Services.CreateScope())
// {
//     var httpClientFactory = scope.ServiceProvider.GetRequiredService<IHttpClientFactory>();
//     var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
//     int limit =30;                  
//     while(limit  <300) {
//         var client = httpClientFactory.CreateClient();
//         var response = await client.GetAsync($"https://dummyjson.com/products");
//         response.EnsureSuccessStatusCode();
//         var json = await response.Content.ReadAsStringAsync();
        
//         var productsResponse = JsonSerializer.Deserialize<ApiResponseModel>(json, new JsonSerializerOptions{
//             PropertyNameCaseInsensitive = true
//         });
//         Console.WriteLine("----qwe");

//         Console.WriteLine(JsonSerializer.Serialize(productsResponse));
        

//         // dbContext.Products.AddRange(products!);
        
//         // await dbContext.SaveChangesAsync();
        
//         limit+=30;
//         break;
//     }


// }

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.Run();
 