import { useMutation, useQuery, gql } from '@apollo/client';
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { startOfToday } from 'date-fns';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import InviteUser from './InviteUser';
import ExpeditionTracking from './ExpeditionTracking/ExpeditionTracking';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

export const MY_SENT_INVITES_QUERY = gql`
  query MyInvites {
    me {
      id
      sentExpeditionInvites {
        id
        to {
          id
        }
        expedition {
          id
        }
      }
    }
  }
`;

const EXPEDITION_QUERY = gql`
  query Expedition($id: ID!) {
    expedition(id: $id) {
      id
      title
      date
      author {
        id
      }
      participants {
        id
        displayName
      }
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SignUpForExpedition($expeditionId: ID!) {
    signUpForExpedition(expeditionId: $expeditionId) {
      id
    }
  }
`;

const SIGN_OFF_MUTATION = gql`
  mutation SignOffFromExpedition($expeditionId: ID!) {
    signOffFromExpedition(expeditionId: $expeditionId) {
      id
    }
  }
`;

const ExpeditionPage = () => {
  const classes = useStyles();
  const { id } = useParams();

  const {
    data: expeditionData,
    loading: expeditionLoading,
    error: expeditionError,
  } = useQuery(EXPEDITION_QUERY, {
    variables: { id },
  });

  const { data: meData, loading: meLoading, error: meError } = useQuery(
    MY_SENT_INVITES_QUERY
  );

  const [signUpForExpedition, { error: signUpError }] = useMutation(
    SIGN_UP_MUTATION,
    {
      refetchQueries: [{ query: EXPEDITION_QUERY, variables: { id } }],
      onError: () => {},
    }
  );

  const [signOffFromExpedition, { error: signOffError }] = useMutation(
    SIGN_OFF_MUTATION,
    {
      refetchQueries: [{ query: EXPEDITION_QUERY, variables: { id } }],
      onError: () => {},
    }
  );

  if (expeditionLoading || meLoading) return <Loading />;
  if (expeditionError || meError || signUpError || signOffError)
    return (
      <Error
        error={expeditionError || meError || signUpError || signOffError}
      />
    );

  const { expedition } = expeditionData;
  const { me } = meData;

  const currentUserIsParticipant = expedition.participants
    .map((p) => p.id)
    .includes(me.id);

  const expeditionDayOrLater = new Date(expedition.date) > startOfToday();
  const expeditionIsUpcoming = new Date(expedition.date) > new Date();

  const handleExpeditionSignUp = () => {
    signUpForExpedition({ variables: { expeditionId: expedition.id } });
  };

  const handleExpeditionSingOff = () => {
    signOffFromExpedition({ variables: { expeditionId: expedition.id } });
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={3} className={classes.root}>
        <Grid item>
          <Typography variant="h5">{expedition.title}</Typography>
        </Grid>
        {expeditionDayOrLater && (
          <Grid item>
            <ExpeditionTracking expeditionId={expedition.id} />
          </Grid>
        )}
        {expeditionIsUpcoming && (
          <Grid item>
            {currentUserIsParticipant ? (
              <Button variant="contained" onClick={handleExpeditionSingOff}>
                Zrezygnuj
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleExpeditionSignUp}
              >
                Weź udział
              </Button>
            )}
          </Grid>
        )}
        {expeditionIsUpcoming && (
          <Grid item>
            <InviteUser me={me} expedition={expedition} />
          </Grid>
        )}
        <Grid item>
          <Typography variant="h6" style={{ marginBottom: 10 }}>
            Uczestnicy
          </Typography>
          <List component={Paper}>
            {expedition.participants.map((p) => (
              <ListItem key={p.id}>
                <ListItemText
                  primary={p.displayName}
                  secondary={p.id === expedition.author.id ? 'Organizator' : ''}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpeditionPage;
