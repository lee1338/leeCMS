export interface Product {
  name: string,
  price: number,
  values: string[]
}

export const products = [
  {
    "name": "Standard",
    "price": 10,
    "values": [
      "Full access",
      "200.000 token limit"
    ]
  }, {
    "name": "Extended",
    "price": 50,
    "values": [
      "Full access",
      "1.000.000 token limit"
    ]
  }
];
