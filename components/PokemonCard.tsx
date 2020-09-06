import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { PokemonItem } from "../generated/graphql";
import Link from "./Link";

const useStyles = makeStyles({
  root: {
    maxWidth: 420,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundSize: 'contain',
  },
  pokemonName: {
    textTransform: 'capitalize',
  },
});

type Props = {
  pokemon: PokemonItem;
};

export default function PokemonCard(props: Props) {
  const { pokemon } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pokemon.image as string}
          title={pokemon.name as string}
        />
        <CardContent>
          <Typography
            className={classes.pokemonName}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {pokemon.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          component={Link as React.ElementType}
          href="/ssr/pokemon/with-hydration/[name]"
          as={`/ssr/pokemon/with-hydration/${pokemon.name}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
