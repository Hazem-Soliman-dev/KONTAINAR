import React, { useContext } from 'react';
import * as PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { CustomizerContext } from '../../context/CustomizerContext.jsx';


const AppCard = ({ children }) => {
  const { isCardShadow } = useContext(CustomizerContext);

  return (
    <Card
      sx={{ display: 'flex', p: 0 }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

AppCard.propTypes = {
  children: PropTypes.node,
};

export default AppCard;
