import React, { Fragment } from 'react'
import Header from './Header'
import Box from '@mui/material/Box';
import { Toaster } from 'react-hot-toast';

const Layout = (props) => {
  return (
      <Fragment>
          <header>
              <Header />
              <Toaster/>
          </header>
          <Box component="main" sx={{ margin:'100px auto', width:'80vw'}}>
              {props.children}
          </Box>
          <footer>
              
          </footer>
    </Fragment>
  )
}

export default Layout
