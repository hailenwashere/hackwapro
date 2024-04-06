import Fridge from '../components/Fridge';
import Header from '../components/Header';
import React, {useEffect, useState} from "react";

const dummyData = [
  {
    category_name: 'Meat',
    category_data: [
      {
        ingredient_name: 'Chicken',
        total_quantity: 3,
        min_expiry: '01/24/2024',
        ingredient_array: [
          {
            owner: 'Yifan',
            quantity: 2,
            expiration: '01/24/2024',
          },
          {
            owner: 'Ellen',
            quantity: 2,
            expiration: '01/30/2024',
          },
        ],
      },
      {
        ingredient_name: 'Beef',
        total_quantity: 1,
        min_expiry: '04/09/2024',
        ingredient_array: [
          {
            owner: 'Jacky',
            quantity: 4,
            expiration: '04/09/2024',
          },
        ],
      },
    ],
  },
  {
    category_name: 'Vegatables',
    category_data: [
      {
        ingredient_name: 'Brocoli',
        total_quantity: 2,
        min_expiry: '01/24/2024',
        ingredient_array: [
          {
            owner: 'Warrick',
            quantity: 2,
            expiration: '01/24/2024',
          },
          {
            owner: 'Ellen',
            quantity: 2,
            expiration: '02/03/2024',
          },
        ],
      },
    ],
  },
];


export default function HomePage() {
  let data = dummyData;

  useEffect(() => {
    const code = localStorage.getItem('code');
    const res = JSON.parse(localStorage.getItem('data'));
    console.log(code)
    console.log(res)
    // if (res) {
    //     data = res;
    // }
  },[]);


  return (
    <div>
      <Header />
      <p>home page</p>
      {data.map((fridge) => (
        <Fridge props={fridge} />
      ))}
    </div>
  );
}
