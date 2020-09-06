import cx from "clsx";
import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Pokemon, PokemonDocument, PokemonItem } from "../generated/graphql";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '12px',
    transition: '0.3s',
    overflow: 'initial',
    background: '#ffffff',
    position: 'relative',
    width: '90%',
    maxWidth: '480px',
  },
  content: {
    paddingTop: '50px',
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0,
    },
  },
  cardHeader: {
    borderRadius: '16px',
    display: 'block',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    width: '88%',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'capitalize',
  },
  cardHeaderWhite: {
    color: 'white',
  },
  cardShadow: {
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
    transition: '0.3s',
    ['&:hover']: {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  statTitle: {
    textTransform: 'uppercase',
  },
}));

type Props = {
  pokemon: Pokemon;
};

export const PokemonDetailCard = (props: Props) => {
  const classes = useStyles();
  const { pokemon } = props;

  return (
    <Card className={cx(classes.card)}>
      <CardHeader
        className={classes.cardHeader}
        title={pokemon.name}
        classes={{
          title: classes.cardHeaderWhite,
          subheader: classes.cardHeaderWhite,
        }}
      />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell classes={{ root: classes.tableHeader }} colSpan={2}>
                Base Stats
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemon.stats &&
              pokemon.stats.map((statItem, index) => (
                <TableRow key={index}>
                  <TableCell
                    classes={{ root: classes.statTitle }}
                    component="th"
                    scope="row"
                  >
                    {statItem?.stat?.name}
                  </TableCell>
                  <TableCell align="right">{statItem?.base_stat}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PokemonDetailCard;
