using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Core;

namespace AvsarGame.API.Models {
    public class UserNotificationModel {
        public string UserId { get; set; }
        public string Message { get; set; }
        public int NotificationAddversimentId { get; set; }
        public int NotificationAddversimentType { get; set; }
        public DateTime CreatedDate { get; set; }
        public NotificationType NotificationType { get; set; }
    }
}