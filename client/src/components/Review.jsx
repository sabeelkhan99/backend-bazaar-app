import { Typography, Rating, Box } from '@mui/material'

const Review = ({ rating, review, author }) => {
    return (
        <Box sx={{ mt: '1rem', display: "flex", flexDirection: 'column', alignItems: "left", gap: 1, padding: '0.8rem', border: '1px solid #ccc', maxWidth: '400px', borderRadius: '8px' }}>
            <Rating name="read-only" value={rating} readOnly />
            <Typography variant="body1">Review: {review}</Typography>
            {author && <Typography variant="body1">Created By: {author.username}</Typography>}
        </Box>
    )
}

export default Review;