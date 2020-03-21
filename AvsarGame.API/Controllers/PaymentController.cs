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
    [Route("api/Payment")]
    public class PaymentController : APIControllerBase {
        private readonly IUserPaymentRequest _userPaymentRequest;
        private readonly IMapper _mapper;

        public PaymentController(IUserPaymentRequest userPaymentRequest, IMapper mapper) {
            _userPaymentRequest = userPaymentRequest;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Save")]
        public Response<HttpStatusCode> Save([FromBody] UserPaymentRequestModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                _userPaymentRequest.Add(_mapper.Map<UserPaymentRequest>(model));
            } catch (Exception e) {
                Log log = new Log();
                log.Path = "api/Payment/Save";
                log.Message = e.Message;
                log.UserId = model.UserId;
                Logger.Instance.Insert(log);

                response.Value = HttpStatusCode.BadRequest;
                response.IsSuccess = false;
                return response;
            }

            response.Value = HttpStatusCode.OK;
            response.IsSuccess = true;
            return response;
        }
    }
}