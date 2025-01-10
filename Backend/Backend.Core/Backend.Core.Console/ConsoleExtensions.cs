namespace Backend.Core.Console
{
    internal static class ConsoleExtensions
    {
        public enum CommandLineArgs
        {
            UpdateDb,
            FetchUpdate,
            Help
        }

        public static CommandLineArgs? ParseArgs(string[] args)
        {
            if (args.Length == 0)
            {
                return null;
            }
            var arg = args[0];
            return arg.ToLower() switch
            {
                "--update-db" => CommandLineArgs.UpdateDb,
                "--fetch" => CommandLineArgs.FetchUpdate,
                "--help" or "-h" => CommandLineArgs.Help,
                _ => null
            };
        }
    }


}