
## Development Environment
-  .NET Core 2.2 SDK
- Visual Studio Code v1.21.1 (Should also work in VS2017)
- Sql Server Management Studio 2017
 
## Project Setup

The project is configured to create and <a href="https://github.com/mmacneil/ASPNetCoreGraphQL/blob/master/src/backend/GREEN_CARD.Data/GREEN_CARDSeedData.cs">seed the database</a> at runtime if necessary so there shouldn't be any initial setup required. Simply start the debugger from the IDE or run it directly using the CLI dotnet run command from the root of the \GREEN_CARD.Api folder.

After running the project, verify the database was created in your local Sql Server LocalDB instance.

<img src="https://fullstackmark.com/img/posts/17/graphql-GREEN_CARD-demo-sql-server-database.png" />

Alternatively, you can also apply the existing <a href="https://github.com/mmacneil/ASPNetCoreGraphQL/tree/master/src/backend/GREEN_CARD.Data/Migrations">migrations</a> to create the database by running <code>dotnet ef database update</code> from the \GREEN_CARD.Data folder. The seed data will be inserted on first run of the application.

The API is configured to run on port 5000, if this conflicts with some other service on your computer you can change it <a href="https://github.com/mmacneil/ASPNetCoreGraphQL/blob/master/src/backend/GREEN_CARD.Api/Program.cs">here</a>.

## Contact

mark@fullstackmark.com




<a> Green Card, Come get your green card! </a>


