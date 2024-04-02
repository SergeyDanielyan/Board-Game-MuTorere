using Microsoft.AspNetCore.Mvc;

namespace Project18.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayGameController : Controller
    {
        private Game GetGameById(string id)
        {
            foreach (Game game in Program.Games)
            {
                if (game.Id.ToString() == id)
                {
                    return game;
                }
            }
            return new Game(Guid.Parse(id));
        }

        [HttpGet("{id}")]
        public int[] GetValues(string id)
        {
            Game game = GetGameById(id);
            return game.Values;
        }

        [HttpPatch("{id}")]
        public void PostValues(string id, int[] values)
        {
            for (int i = 0; i < Program.Games.Count; ++i)
            {
                if (Program.Games[i].Id.ToString() == id)
                {
                    Array.Copy(values, Program.Games[i].Values, 9);
                    //values.CopyTo(Program.Games[i].Values);
                }
            }
        }
    }
}
