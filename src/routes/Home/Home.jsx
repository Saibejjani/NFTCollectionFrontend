import { Grid, Box } from "@mui/material";

import CardComponent from '../../components/card.component/Card';

const Home = () => {
  const collections = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        {
          collections && collections.map((collection) => (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardComponent />
            </Grid>
          ))
        }

      </Grid>
    </Box>
  );
}

export default Home