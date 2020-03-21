﻿using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserNotification : EntityBase<Guid> {
        public Guid UserId { get; set; }
        public string Description { get; set; }
    }
}