var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
var items = Enumerable.Range(1, 1000)
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
    var response = items.Skip((page - 1) * pageSize).Take(pageSize).ToArray();

    return response;
})
.WithName("Items");

app.Run();