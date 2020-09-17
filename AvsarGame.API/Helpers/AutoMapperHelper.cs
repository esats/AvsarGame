using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Models;
using AvsarGame.Core.ProcedureModels;
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

            CreateMap<CommentModel, Comment>();
            CreateMap<Comment, CommentModel>();

            
            CreateMap<CommentModel, SubComment>();
            CreateMap<SubComment, CommentModel>();

            CreateMap<Comment, CommentModel>()
                    .ForMember(x => x.CommentId, opt => opt.MapFrom(src => src.Id));
            
            CreateMap<SubComment, CommentModel>()
                    .ForMember(x => x.SubCommentId, opt => opt.MapFrom(src => src.Id));
            
            CreateMap<AddversimentDetailModel, Metin2Item>();
            CreateMap<Metin2Item, AddversimentDetailModel>();

            CreateMap<PaymentLogModel, PaymentLog>();
            CreateMap<PaymentLog, PaymentLogModel>();
        }
    }
}