using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;

namespace AvsarGame.API.Helpers {
    public class AutoMapperHelper : Profile {
        public AutoMapperHelper() {
            CreateMap<Games, GameModel>();
            CreateMap<Category, CategoryModel>();

            CreateMap<ApplicationUser, UserPaymentManagementModel>()
                    .ForMember(x => x.UserId, opt => opt.MapFrom(src => src.Id));

            CreateMap<UserPaymentRequestModel, UserPaymentRequest>();
            CreateMap<UserPaymentRequest, UserPaymentRequestModel>();

            CreateMap<UserPaymentManagementModel, ApplicationUser>();

            CreateMap<UserNotificationModel, UserNotification>();

            CreateMap<UserNotification, UserNotificationModel>();

            CreateMap<UserOrderDetail, UserOrderDetailModel>();

            CreateMap<ApplicationUser, RegisterModel>();

            CreateMap<KnightCyberRing, KnightCyberRingAddversimentModel>();
            CreateMap<KnightCyberRingAddversimentModel, KnightCyberRing>();

            
            CreateMap<KnightItem, KnightItemAddversimentModel>();
            CreateMap<KnightItemAddversimentModel, KnightItem>();

            CreateMap<ApplicationUser, UserSummaryModel>()
                    .ForMember(x => x.UserId, opt => opt.MapFrom(src => src.Id));
            
            CreateMap<KnightCyberRing, AddversimentDetailModel>();
            CreateMap<KnightItem, AddversimentDetailModel>();

        }
    }
}