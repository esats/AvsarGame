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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/paymentlog")]
    [AllowAnonymous]
    public class PaymentLogController : APIControllerBase {
        private readonly IPaymentLog _paymentLog;
        private readonly IMapper _mapper;

        public PaymentLogController(IPaymentLog paymentLog, IMapper mapper) {
            _paymentLog = paymentLog;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Save")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public Response<HttpStatusCode> Save([FromBody] PaymentLogModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                //güvenlik açığı durumunda incoming requestlerde ip controlü yapılabilir.
                _paymentLog.Add(_mapper.Map<PaymentLog>(model));
            } catch (Exception e) {
                Log log = new Log();
                log.Path = "api/paymentlog/Save";
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

        [HttpGet]
        [Route("GetLogByOrderId")]
        [AllowAnonymous]
        [ApiExplorerSettings(IgnoreApi = true)]
        public PaymentLogModel GetLogByOrderId(string OrderId) {
            try {
               return _mapper.Map<PaymentLogModel>(_paymentLog.GetT(x => x.OrderId == OrderId));
            } catch (Exception e) {
                throw new Exception(e.Message);
            }

        }
    }
}
