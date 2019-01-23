import React from 'react'
import { Card } from 'semantic-ui-react'
import './legend.less'

const Legend = () => (
  <Card className="legend_main">
    <Card.Content>
      <div className='legend_div'>
      <div className='legend_pinkBox'></div>
      <Card.Content>Wishlist</Card.Content>
      </div>
      <div className='legend_div'>
      <div className='legend_yellowBox'></div>
      <Card.Content>Transited</Card.Content>
      </div>
      <div className='legend_div'>
      <div className='legend_greenBox'></div>
      <Card.Content>Visited</Card.Content>
      </div>
      <div className='legend_div'>
      <div className='legend_blueBox'></div>
      <Card.Content>Lived</Card.Content>
      </div>
    </Card.Content>
  </Card>
)

export default Legend;
