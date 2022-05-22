#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Services/Metaform/Metaform.API/Metaform.API.csproj", "Services/Metaform/Metaform.API/"]
COPY ["BuildingBlocks/Common.Logging/Common.Logging.csproj", "BuildingBlocks/Common.Logging/"]
RUN dotnet restore "Services/Metaform/Metaform.API/Metaform.API.csproj"
COPY . .
WORKDIR "/src/Services/Metaform/Metaform.API"
RUN dotnet build "Metaform.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Metaform.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Metaform.API.dll"]