var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
var forecast = Enumerable.Range(1, 1000)
               .Select(index => $"Items {index}")
               .ToArray();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/items", (int page, int pageSize) =>
{
    var response = forecast.Skip((page - 1) * pageSize).Take(pageSize).ToArray();

    return response;
})
.WithName("Items");

app.Run();