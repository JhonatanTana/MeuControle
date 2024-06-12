﻿using System.Linq.Expressions;

namespace MeuControleAPI.Repositories.Interface {
    public interface IRepository<T> {

        Task<IEnumerable<T>> GetAllAsync();
        Task<IQueryable<T>> GetAllQueryableAsync();
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
        T Create(T entity);
        T Update(T entity);
        T Delete(T entity);
    }
}