using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace LanaResto.ApiController
{
    public class BaseController : ControllerBase
    {
        private readonly IMemoryCache _cache;

        public BaseController(IMemoryCache cache)
        {
            _cache = cache;
        }

        protected bool GetCache<TItem>(object keyObj, out TItem value)
        {
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(keyObj);
            return _cache.TryGetValue(json, out value);
        }

        protected void SetCache<T>(object keyObj, T data, TimeSpan timeSpan = default(TimeSpan))
        {
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(keyObj);
            if (timeSpan == default(TimeSpan))
                timeSpan = TimeSpan.FromDays(1);
            _cache.Set(json, data, timeSpan);
        }
    }
}
