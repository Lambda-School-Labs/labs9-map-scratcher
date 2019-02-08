import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Button } from 'semantic-ui-react'

const VisitsChart = ({user}) => {
  const distribution = {
    wishlist: 0,
    transited: 0,
    visited: 0,
    lived: 0
  }
  user.visits.map(visit => {
    if (visit.level === 1) { distribution.wishlist++ }
    if (visit.level === 2) { distribution.transited++ }
    if (visit.level === 3) { distribution.visited++ }
    if (visit.level === 4) { distribution.lived++ }
    return null
  })
  const data = [
    {name: 'wishlist', value: distribution.wishlist}, 
    {name: 'transited', value: distribution.transited},
    {name: 'visited', value: distribution.visited}, 
    {name: 'lived', value: distribution.lived}
  ];
  const COLORS = ['#6b0d4b', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;                    

  const renderLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const item = data[index];
  
    return (
      <text 
        x={x} 
        y={y} 
        fill={percent > 0 ? 'black' : 'none'} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central" 
        key={`label-${item.value}`}
      >
        {item.name}: {(percent*100).toFixed(0)}%
      </text>
    )
  };
  return (
    <div className='visits-chart'>
    {user.visits.length > 0 ?
      (
        <PieChart width={600} height={500}>
          <Pie
            dataKey='value'
            data={data} 
            labelLine={true}
            label={renderLabel}
            outerRadius={120} 
            fill='#8884d8'
          >
            {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
          </Pie>
        </PieChart>
      ) : (
        <div>You don't have any visits yet!
        <Button
          fluid
          onClick={() => this.props.history.push('/travels')}
        >Explore Your Map</Button>
        </div>
      )
    } 
    </div>
  )
}

export default VisitsChart