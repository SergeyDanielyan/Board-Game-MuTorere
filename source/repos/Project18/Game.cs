namespace Project18
{
    public class Game
    {
        public Guid Id { get; private set; }
        public int[] Values { get; set; }

        public Game(Guid id)
        {
            Id = id;
            Values = new int[] { 0, 1, 1, 1, 1, 2, 2, 2, 2 };
        }
    }
}
