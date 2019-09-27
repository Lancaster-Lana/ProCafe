
namespace ChatServer.Hubs
{
    public interface IGroupClient
    {
        void MessageToGroup(string groupName, string name, string message);
    }
}
