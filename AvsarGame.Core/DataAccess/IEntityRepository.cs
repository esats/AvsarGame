﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AvsarGame.Core.Entities;

namespace AvsarGame.Core.DataAccess
{
    public interface IEntityRepository<T> where T : class, IEntity, new()
    {
        T GetT(Expression<Func<T, bool>> filter = null);
        Task<T> GetTAsync(Expression<Func<T, bool>> filter = null);
        List<T> GetList(Expression<Func<T, bool>> filter = null);
        Task<List<T>> GetListAsync(Expression<Func<T, bool>> filter = null);
        T Add(T entity);
        Task<T> AddAsync(T entity);
        T Update(T entity);
        Task<T> UpdateAsync(T entity);
        void Delete(T entity);
        Task DeleteAsync(T entity);
    }
}
