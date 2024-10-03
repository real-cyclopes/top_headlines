import * as csv from "async-csv";
import * as fs from "fs/promises";

export const readCSV = async () => {
  const csvData = await fs.readFile("src/data/data.csv", "utf-8");
  const data = await csv.parse(csvData);
  return data;
};

export const getHeadlines = async () => {
  // read csv
  const data: Array<Array<string>> = (await readCSV()) as Array<Array<string>>;

  // use javascript object advantage that can use like as a map in other languages to get the best 12 headlines

  const state: any = {};

  /**
   * state is an object that has the below shape.
   *
   * {
   *    search_term: {
   *       headline1: {
   *         share_of_voice: number // sum of share_of_voice for the headline,
   *         average: number // average of share_of_voice for multi dates,
   *         dates: {
   *           "2022-08-05": number // sum of share of voice for all companies that used the search_term,
   *           "20222-08-06":
   *              ...
   *         }
   *       },
   *       headline2: {
   *
   *       }
   *    }
   * }
   */

  for (let i = 1; i < data.length; i++) {
    let headlines = data[i][0].split(/[·|-]/); // get headlines from an ad

    // const company_domain = data[i][1];
    // const company_name = data[i][2];

    const search_term = data[i][3];
    const share_of_voice = data[i][4];
    const date = data[i][5];

    if (state[search_term] === undefined) {
      // initialize if it is the first to find the search term.
      state[search_term] = {};
    }

    for (let headline of headlines) {
      headline = headline.trim();
      if (state[search_term][headline] === undefined) {
        // initialize if it is the first time to find the headline
        state[search_term][headline] = {
          headline,
          average: 0,
          share_of_voice: 0,
          dates: {},
        };
      }
      state[search_term][headline].dates[date] =
        state[search_term][headline].dates[date] === undefined // initialize if it is the first time to find the date for the headline on a search term, or sum
          ? +share_of_voice
          : state[search_term][headline].dates[date] + +share_of_voice;

      state[search_term][headline].share_of_voice += +share_of_voice; // sum share of voices for the headline

      state[search_term][headline].average =
        state[search_term][headline].share_of_voice /
        Object.keys(state[search_term][headline].dates).length; // get average of share of voices for the headline for multiple days
    }
  }
  const result = Object.keys(state).map((search_term) => {
    // make object to array so we can sort headlines by average of share of voices

    const searchTermHeadlines = Object.keys(state[search_term]).map(
      (headline) => state[search_term][headline]
    );

    // sort by average

    searchTermHeadlines.sort((a, b) => {
      return b.average - a.average;
    });

    // returns only the best 12 headlines with search term
    return {
      search_term,
      headlines: searchTermHeadlines.slice(0, 12),
    };
  });

  return result;
};
