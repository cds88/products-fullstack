using System.Linq;
using System.Threading.Tasks;

namespace Backend.Core.Dbaccess
{
    public interface IAbstractRepository<T> where T : class
    {
        /// <summary>
        /// Returns an <see cref="IQueryable{T}"/> of all T entities.
        /// </summary>
        IQueryable<T> GetAll();

        /// <summary>
        /// Returns a single entity with the provided <paramref name="id"/>.
        /// </summary>
        Task<T?> GetByIdAsync(int id);

        /// <summary>
        /// Adds a new entity to the context.
        /// </summary>
        Task AddAsync(T entity);

        /// <summary>
        /// Updates an existing entity in the context.
        /// </summary>
        void Update(T entity);

        /// <summary>
        /// Removes an entity from the context.
        /// </summary>
        void Delete(T entity);

        /// <summary>
        /// Persists changes to the database.
        /// </summary>
        Task SaveAsync();
    }
}
