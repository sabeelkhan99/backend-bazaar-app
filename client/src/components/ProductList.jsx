import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Product from './Product';

const ProductList = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                    props.products.map((product) => {
                        return (
                            <Grid key={product._id} size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                                <Product
                                    id={product._id}
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                    image={product.image}
                                />
                            </Grid>)
                    })
                }

            </Grid>
        </Box>
    );
}

export default ProductList;

