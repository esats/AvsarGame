using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Category")]
    [Produces("application/json")]
    //[AllowAnonymous]
    public class CategoryController : APIControllerBase {
        private readonly ICategory _category;

        public CategoryController(ICategory category) {
            _category = category;
        }

        [HttpPost]
        [Route("Save")]
        public ActionResult Save([FromBody] CategoryModel model) {
            try {
                Category entity = new Category() {
                        ImageUrl = model.ImageUrl,
                        Description = model.Description,
                        Name = model.Name,
                        //CreatedBy = base yapısından giriş yapan kullanıcıyı al ve ona göre createdbyı getir. mastan base sistemini alabiliriz.
                        //CreatedDate =
                };
                _category.Add(entity);
            } catch (Exception e) {
                return StatusCode(404);
            }

            return StatusCode(200);
        }

        [HttpGet]
        [Route("GetOne/{id}")]
        public async Task<Response<CategoryModel>> GetOne(Guid id) {
            Response<CategoryModel> bookResponse = new Response<CategoryModel>();
            Category entity = await _category.GetTAsync(x => x.Id == id && x.IsActive == true);

            return bookResponse;
        }
    }
}