using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.Email;

public class EmailSender : IEmailSender
{
    private readonly IConfiguration _config;

    public EmailSender(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string userEmail, string emailSubject, string msg)
    {
        var client = new SendGridClient(_config["SendGrid:Key"]);
        var message = new SendGridMessage
        {
            From = new EmailAddress("noreply@gmail.com", _config["SendGrid:User"]),
            Subject = emailSubject,
            PlainTextContent = msg,
            HtmlContent = msg
        };
        message.AddTo(new EmailAddress(userEmail));
        message.SetClickTracking(false, false);
        
        await client.SendEmailAsync(message);
    }
}