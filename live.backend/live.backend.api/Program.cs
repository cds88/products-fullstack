
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.OData;
using Live.Backend.Utils;
using Live.Backend.Services;
using Live.Backend.Dbaccess;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")).UseSnakeCaseNamingConvention());
builder.Services.AddHttpClient();
builder.Services.AddScoped<Fetcher>(sp =>
{
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
    return new Fetcher(httpClientFactory);
});
builder.Services.AddControllers().AddOData(opt => opt.Select().Filter().OrderBy().Expand().SetMaxTop(100).Count().EnableQueryFeatures().AddRouteComponents("odata", EdmModelBuilder.GetEdmModel())).AddJsonOptions(options=>{
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});



builder.WebHost.UseUrls("http://0.0.0.0:5013");
//builder.Services.AddHostedService<StartupRemoteAPIService>();

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHsts();

app.UseHttpsRedirection();

app.UseCors();

app.MapControllers();

app.Run();
