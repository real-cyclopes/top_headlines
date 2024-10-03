# Simple Recommend Service

Rest API Server for Recommend service

## Dependencies

- Language :
  - [Typescript](https://www.typescriptlang.org/)
  - [Javascript](https://developer.mozilla.org/id/docs/Web/JavaScript)
- Pacakges :
  - [Express](https://expressjs.com/)
  - [Nodemon](https://www.npmjs.com/package/nodemon)

## Endpoint to get recommends

- api/v1/recommends [http://localhost:1337/api/v1/recommends]

```
  {
    data: [
      {
        search_term: string,
        headlines: [
          {
            headline: string,
            share_of_voice: number // sum of share of voice
            average: // average of share of voice 
            dates: {
              "date1": number // sum of share of voice for the date,
              "date2":
                  ...
            }       
          },
          ...
        ]
      },
      ...
    ]
  }
```

## Manual Installation

### Requirements

Change .env.example to .env.
Install mongodb in your local machine, and set proper env
You can skip this setup with Docker
### Install

`yarn`

### Run in development mode

`yarn dev`