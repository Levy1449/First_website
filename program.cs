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
    string subject = request.Form["subject"].ToString();
    string details = request.Form["assignment"].ToString();
    string date = request.Form["eventDate"].ToString();

    if (!string.IsNullOrEmpty(subject) && !string.IsNullOrEmpty(details) && !string.IsNullOrEmpty(date))
    {
        assignments.Add(new Assignment(subject, details, date));
    }

    return Results.Redirect("/assignment_board.html");
}

IResult GetAssignments()
{
    return Results.Json(assignments);
}

class Assignment
{
    public string subject { get; set; }
    public string Details { get; set; }
    public string Date { get; set; }
    public Assignment(string subject, string details, string date)
    {
        subject = subject;
        Details = details;
        Date = date;
    }
}