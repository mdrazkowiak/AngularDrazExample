using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

public static class SessionExtensions
{
    public static void Set(this ISession session, string key, object value)
    {
        byte[] serializedValue = System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(value));
        session.Set(key, serializedValue);
    }

    public static T Get<T>(this ISession session, string key)
    {
        byte[] serializedValue = session.Get(key);
        string value = (serializedValue == null ? null : System.Text.Encoding.UTF8.GetString(serializedValue));

        return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
    }
}