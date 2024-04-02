using Microsoft.AspNetCore.Mvc;

namespace Project18.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreateGameController : Controller
    {
        [HttpPost]
        public string CreateGameId()
        {
            Guid id = Guid.NewGuid();
            Program.Games.Add(new Game(id));
            //_gamesService.Create(id);
            return id.ToString();
        }
    }
}
