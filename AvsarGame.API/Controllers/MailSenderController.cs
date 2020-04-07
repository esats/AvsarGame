using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Helpers;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace AvsarGame.API.Controllers {
    [Route("api/MailSender")]
    [Produces("application/json")]
    public class MailSenderController : APIControllerBase {
        private string host { get; set; } = "srvm08.trwww.com";
        private int port { get; set; } = 465;
        private string From { get; set; } = "AnatolianGame";
        private string UserAuth { get; set; } = "info@anatoliagame.com";
        private string Password { get; set; } = "Gm6A4Pyz";

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IGame _game;

        public MailSenderController(UserManager<ApplicationUser> userManager, IMapper mapper, IGame game) {
            _userManager = userManager;
            _mapper = mapper;
            _game = game;
        }

        public MailSenderController() {
            
        }

        [HttpPost]
        [Route("SendOrderMail")]
        public async Task SendOrderMail([FromBody] List<UserOrderDetailModel> orders) {
            var user = await _userManager.FindByIdAsync(this.GetUser());
            MailTemplateModel mailTemplateModel = new MailTemplateModel();
            mailTemplateModel.Orders = orders;
            mailTemplateModel.UserModel = _mapper.Map<UserPaymentManagementModel>(user);
            await SendAsync(mailTemplateModel);
        }
       
        public async Task SendAsync(MailTemplateModel templateModel) {
            try {
                SmtpClient client = new SmtpClient();
                client.Connect(host, port, true);
                client.Authenticate(UserAuth, Password);
                var getMail = OrderMailTemplate(templateModel);
                await client.SendAsync(getMail);
                await client.DisconnectAsync(true);
                client.Dispose();
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        public MimeMessage OrderMailTemplate(MailTemplateModel templateModel) {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress(From,
                    UserAuth);
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress("User",
                    templateModel.UserModel.Email);
            message.To.Add(to);
            message.Subject = "Tebrikler.." + " " + templateModel.UserModel.Name.ToUpper();

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = System.IO.File.ReadAllText(Directory.GetCurrentDirectory() + @"\wwwroot\MailTemplate\order.html");
            bodyBuilder.HtmlBody = bodyBuilder.HtmlBody.Replace("{TotalAmount}", templateModel.Orders.Sum(x => x.BillingPrice * x.BillingAmount).ToString());
            bodyBuilder.HtmlBody = bodyBuilder.HtmlBody.Replace("{date}", DateTime.Now.ToString());
            bodyBuilder.HtmlBody = bodyBuilder.HtmlBody.Replace("{htmlRows}", TableRows(templateModel.Orders));
            message.Body = bodyBuilder.ToMessageBody();

            return message;
        }

        public string TableRows(List<UserOrderDetailModel> items) {
            var rows = "";
            foreach (var item in items) {
               var row = "<tr>" +
                      "<td width=\"15%\" align=\"center\">" +
                      "<h3 style=\"line-height: 26px;mso-line-height-rule: exactly; font-family: tahoma, verdana, segoe, sans-serif;font-size: 17px; font-style: normal; font-weight: normal;color: #333333;\">"
                      + _game.GetT(x => x.Id == item.GameId).Name + "</h3>" +
                      "</td>" +
                      "<td width=\"15%\" align=\"center\">" +
                      "<h3 style=\"line-height: 26px;mso-line-height-rule: exactly; font-family: tahoma, verdana, segoe, sans-serif;font-size: 17px; font-style: normal; font-weight: normal;color: #333333;\">"
                      + item.CharacterName + "</h3>" +
                      "</td>" +
                      "<td width=\"15%\" align=\"center\">" +
                      "<h3 style=\"line-height: 26px;mso-line-height-rule: exactly; font-family: tahoma, verdana, segoe, sans-serif;font-size: 17px; font-style: normal; font-weight: normal;color: #333333;\">"
                      + item.BillingAmount + "</h3>" +
                      "</td>" +
                      "<td width=\"15%\" align=\"center\">" +
                      "<h3 style=\"line-height: 26px;mso-line-height-rule: exactly; font-family: tahoma, verdana, segoe, sans-serif;font-size: 17px; font-style: normal; font-weight: normal;color: #333333;\">"
                      + item.BillingPrice + "</h3>" +
                      "</td>" +
                      "<td width=\"15%\" align=\"center\">" +
                      "<h3 style=\"line-height: 26px;mso-line-height-rule: exactly; font-family: tahoma, verdana, segoe, sans-serif;font-size: 17px; font-style: normal; font-weight: normal;color: #333333;\">"
                      + item.BillingPrice * item.BillingAmount + "</h3>" +
                      "</td>" +
                      "</tr>";
               rows = row + rows;
            }

            return rows;
        }

        public async Task SendForgotPasswordMail(string email, string action, string url) {
            try {
                SmtpClient client = new SmtpClient();
                client.Connect(host, port, true);
                client.Authenticate(UserAuth, Password);
                var getMail = ForgotPasswordMailTemplate(email,action,url);
                await client.SendAsync(getMail);
                await client.DisconnectAsync(true);
                client.Dispose();
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        public MimeMessage ForgotPasswordMailTemplate(string email, string action, string url) {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress(From,
                    UserAuth);
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress("User",
                    email);
            message.To.Add(to);
            message.Subject = "Şifre Sıfırlama isteği";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = url;
            message.Body = bodyBuilder.ToMessageBody();

            return message;
        }
    }
}