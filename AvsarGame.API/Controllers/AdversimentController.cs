using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Adversiment")]
    [ApiController]
    public class AdversimentController : APIControllerBase {
        private readonly IKnightCyberRing _KnightCyberRing;
        private readonly IKnightItem _knightItem;
        private readonly IMapper _mapper;

        public AdversimentController(IKnightCyberRing knightCyberRing, IMapper mapper, IKnightItem knightItem) {
            _KnightCyberRing = knightCyberRing;
            _mapper = mapper;
            _knightItem = knightItem;
        }

        [HttpPost]
        [Route("AddKnightCyberRing")]
        public int AddKnightCyberRing([FromBody] KnightCyberRingAddversimentModel model) {
            try {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                return _KnightCyberRing.Add(_mapper.Map<KnightCyberRing>(model)).Id;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("AddKnightItem")]
        public int AddKnightItem([FromBody] KnightItemAddversimentModel model) {
            try {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                return _knightItem.Add(_mapper.Map<KnightItem>(model)).Id;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}