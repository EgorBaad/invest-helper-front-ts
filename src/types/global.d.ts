// import "@emotion/react";

// declare module "@emotion/react" {
//   export interface Theme {
//     palette: {
//       primary: {
//         main: string,
//         light: string,
//         dark: string,
//         contrastText: string,
//       };
//     };
//   }
// }

declare interface IMoneyValue {
  currency: string;
  value: number;
}

declare interface IBond {
  figi: string;
  ticker: string;
  lot: number;
  currency: string;
  country: string;
  name: string;
  nominal: IMoneyValue;
  qualOnly: boolean;
}
