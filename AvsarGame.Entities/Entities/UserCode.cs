﻿using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserCode : EntityBase<Guid> {
        public string UserId { get; set; }
        public Guid CampaignId { get; set; }
    }
}