namespace Live.Backend.Utils.Extensions
{
    public static class DictionaryExtensions
    {
        public static void UnionWith<TKey, TValue>(
            this IDictionary<TKey, TValue> target,
            IDictionary<TKey, TValue> source)
        {
            foreach (var (key, value) in source)
            {
                target[key] = value;  
            }
        }
    }

}