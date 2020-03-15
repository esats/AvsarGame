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
            CreateMap<Games,GameModel>();
            CreateMap<Category, CategoryModel>();
        }
    }
}