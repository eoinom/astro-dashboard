import { useStore } from '@nanostores/react';
import React, { useMemo } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Product } from '../types/Product';
import { hiddenCategories } from '../state';
import randomColor from 'randomcolor';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '30px',
};

type Props = {
  products: Product[];
};

type View = 'stock' | 'rating';

const groupByCategory = (products: Product[]) => {
  return products.reduce((acc, curr) => {
    const existingCategory = acc[curr.category];

    acc[curr.category] = existingCategory
      ? existingCategory.concat(curr)
      : [curr];
    return acc;
  }, {} as Record<string, Product[]>);
};

const CategoryChart = ({ products }: Props) => {
  const [view, setView] = React.useState<View>('stock');
  const disabledCategories = useStore(hiddenCategories);

  const data = useMemo(() => {
    const visibleCategories = products
      .map((product) => product.category)
      .filter((product) => !disabledCategories.includes(product))
      .filter((val, i, arr) => arr.indexOf(val) === i);

    const groupedByCategory = groupByCategory(products);

    return visibleCategories.map((category) => {
      const productsInCategory = groupedByCategory[category];
      const avg =
        productsInCategory.reduce((acc, curr) => acc + curr.rating, 0) /
        products.length;

      return {
        name: category,
        stock: productsInCategory.reduce((acc, curr) => acc + curr.stock, 0),
        rating: Math.round(avg * 100) / 100,
        fill: randomColor({ seed: category, luminosity: 'dark' }),
      };
    });
  }, [products, disabledCategories]);

  return (
    <div style={{ width: '100%', height: 400, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="80%"
          barSize={15}
          data={data}
        >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey={view}
          />

          <Legend
            iconSize={20}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <ToggleButtonGroup
        style={{ position: 'absolute', top: 0 }}
        color="primary"
        value={view}
        exclusive
        onChange={(_, val) => val && setView(val)}
      >
        <ToggleButton value="stock">Stock</ToggleButton>
        <ToggleButton value="rating">Rating</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default CategoryChart;