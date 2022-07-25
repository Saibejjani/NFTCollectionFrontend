import { CssBaseline, Grid, Box } from "@mui/material";

import CardComponent from '../../components/card.component/Card';

const Home = () => {
  const collections = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box sx={{
      display: 'flex',
      justifyContent:'center',
      mx:10,
      my:2,
      position:'absolute',
      height: '100vh',
    }}>
      <CssBaseline />
      <Box maxWidth='xl' >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={3}
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
    </Box>
  );
}

export default Home