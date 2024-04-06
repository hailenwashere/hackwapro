import Fridge from '../components/Fridge';
import Header from '../components/Header';

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
