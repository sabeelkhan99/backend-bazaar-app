import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import ReviewForm from '../components/ReviewForm';
import { useParams } from 'react-router';
import { Fragment, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import Review from '../components/Review';
import { fetchProductById, createReviewForProductId } from '../lib/apis';
import toast from 'react-hot-toast';

const ShowProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const loadProduct = () => {
        fetchProductById(productId)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        loadProduct();
    }, []);

    const createReview = async (rating, review) => {
        createReviewForProductId(productId, { rating, review })
            .then((res) => {
                loadProduct();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            })
    }

    console.log(product);

    return (
        <Fragment>
            {!product && <p>Loading Product Details</p>}
            {product && <Box sx={{ mt: 15, maxWidth: '80%', mx: 'auto' }}>
                <Grid container spacing={10}>
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    $ {product.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" variant="contained" component={Link} to={`/products/${productId}`}>Add to Cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
                        <Typography variant="h5">Add a review</Typography>
                        <ReviewForm createReview={createReview} />
                        {
                            product.reviews.map((item) => {
                                return <Review key={item._id} rating={item.rating} review={item.review} author={ item.author} />
                            })
                        }
                    </Grid>
                </Grid>
            </Box >}
        </Fragment>
    )
}

export default ShowProduct