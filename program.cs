WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
WebApplication app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

List<Assignment> assignments = new List<Assignment>();

app.MapPost("/api/assignmentspost", AddAssignment);
app.MapGet("/api/assignmentsget", GetAssignments);

app.Run();

IResult AddAssignment(HttpRequest request)
{
    string text = request.Form["subject"].ToString();
    string text2 = request.Form["assignment"].ToString();
    string date = request.Form["eventDate"].ToString();

    if (!string.IsNullOrEmpty(text) && !string.IsNullOrEmpty(text2) && !string.IsNullOrEmpty(date))
    {
        assignments.Add(new Assignment(text, text2, date));
    }

    return Results.Redirect("/assignment_board.html");
}

IResult GetAssignments()
{
    return Results.Json(assignments);
}

class Assignment
{
    public string Text { get; set; }
    public string Details { get; set; }
    public string Date { get; set; }
    public Assignment(string text, string details, string date)
    {
        Text = text;
        Details = details;
        Date = date;
    }
}