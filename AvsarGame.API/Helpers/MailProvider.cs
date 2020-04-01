using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace AvsarGame.API.Helpers {
    public class MailProvider : SingletonBase<MailProvider> {
        private string host { get; set; } = "srvm08.trwww.com";
        private int port { get; set; } = 465;
        private string From { get; set; } = "AnatolianGame";
        private string UserAuth { get; set; } = "info@anatoliagame.com";
        private string Password { get; set; } = "Gm6A4Pyz";

        public void Sent() {
            try {
                SmtpClient client = new SmtpClient();
                client.Connect(host, port, true);
                client.Authenticate(UserAuth, Password);
                var getMail = MailTemplate();
                client.Send(getMail);
                client.Disconnect(true);
                client.Dispose();
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        //public MimeMessage PaymnetMailTemplate() {
        //    return null;
        //}

        public MimeMessage MailTemplate() {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress(From,
                    UserAuth);
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress("User",
                    "esat.avsr@gmail.com");
            message.To.Add(to);

            message.Subject = "This is email subject";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<h1>{esat}</h1>";
            bodyBuilder.TextBody = "Hello World!";

            bodyBuilder.HtmlBody = bodyBuilder.HtmlBody.Replace("{esat}","salak");

            message.Body = bodyBuilder.ToMessageBody();

            return message;
        }
    }
}