using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Metaform.API.Data;
using Metaform.API.Helpers;
using Metaform.API.Repositories.RepositoryBase;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Metaform.API.Repositories
{
    public class DataRepository
    {
        private readonly IMongoDatabase _database;
        private IMongoCollection<DataPlainModel> _collection;

        public DataRepository(IMongoDbSettings settings, string databaseName)
        {
            _database = new MongoClient(settings.ConnectionString).GetDatabase(databaseName);
        }

        public async Task<DataPlainModel> GetEntityById(string collection, string id)
        {
            _collection = _database.GetCollection<DataPlainModel>(collection);

            var filter = Builders<DataPlainModel>.Filter.Eq(doc => doc.Id, id);
            var filterResult = await _collection.FindAsync(filter);
            var entity = await filterResult.SingleOrDefaultAsync();

            return entity;
        }

        public async Task<IEnumerable<DataPlainModel>> GetDataAsync(string collectionName)
        {
            _collection = _database.GetCollection<DataPlainModel>(collectionName);
            var dataList = _collection.AsQueryable();
            return await Task.FromResult(dataList);
        }

        public async Task<DataPlainModel> InsertOneAsync(string collectionName, [FromBody] DataPlainModel document)
        {
            _collection = _database.GetCollection<DataPlainModel>(collectionName);
            await Task.Run(() => _collection.InsertOneAsync(document));
            return await Task.FromResult(document);
        }

        public async Task UpdateEntity(string collectionName, [FromBody] DataPlainModel document)
        {
            _collection = _database.GetCollection<DataPlainModel>(collectionName);
            var filter = Builders<DataPlainModel>.Filter.Eq(doc => doc.Id, document.Id);
            await _collection.FindOneAndReplaceAsync(filter, document);
        }

        public async Task DeleteDataById(string collectionName, string id)
        {
            _collection = _database.GetCollection<DataPlainModel>(collectionName);
            await Task.Run(() =>
            {
                var filter = Builders<DataPlainModel>.Filter.Eq(doc => doc.Id, id);
                _collection.FindOneAndDeleteAsync(filter);
            });
        }
    }
}