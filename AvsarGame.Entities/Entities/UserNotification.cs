using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserNotification : EntityBase<int> {
        public string UserId { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public NotificationType NotificationType { get; set; }
        public int NotificationAddversimentId { get; set; }
        public int NotificationAddversimentType { get; set; }
        public override DateTime? CreatedDate  { get; set; } = DateTime.Now;
    }
}