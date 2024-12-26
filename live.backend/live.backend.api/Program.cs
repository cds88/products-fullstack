using Live.Backend.Controllers;
using Microsoft.AspNetCore.OData;
using Live.Backend.Utils.Http;
using Live.Backend.Dbaccess;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddConfiguredDbContext();


builder.Services.AddHttpClient();

builder.Services.AddControllers().AddOData(opt => opt.Select().Filter().OrderBy().Expand().SetMaxTop(100).Count().EnableQueryFeatures().AddRouteComponents("odata", EdmModelBuilder.GetEdmModel())).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

builder.Services.AddScoped<Fetcher>();
builder.Services.AddScoped<FetchedResultsHandler>();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});



builder.WebHost.UseUrls("http://0.0.0.0:5013");

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
